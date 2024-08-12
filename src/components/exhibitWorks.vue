<template>
<div class="container">
    <transition name="el-fade-in-linear">
        <div class="content" v-show="show">
            <div class="cool-text">DISPLAY</div>
            <div class=search-box> <i class="el-icon-search" style="font-size: large; line-height:33px;"></i>
                <el-input class="search-by-name" placeholder="按名称搜索" v-model="searchName" size=small></el-input>
                <Select class="search-by-type" placeholder="按类型搜索">
                    <Option el-option label="文本" value="txt"></Option>
                    <Option label="图片" value="pic"></Option>
                </Select>
            </div>
            <div class="grid-box">
                <div v-for="(item, index) in gridData" :key="index" class="grid-item">
                    <subInfo :fileURL="item" :source="source" />
                </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import subInfo from '@/components/subInfo.vue'
//import getAllURLs from '@/commons/getAllURLs';
import getActiveNFTsURLs from '@/commons/getActiveNFTsURLs';
import axios from 'axios'
export default {
    components: {
        subInfo
    },
    mounted() {
        setTimeout(() => {
                this.show = true;
            }, 100),
            this.getURLs();
    },
    data() {
        return {
            show: false,
            searchName: '',
            searchType: '',
            source: "exhibit",
            allData: [],
            gridData: [],
        };
    },
    watch: {
        searchName(newValue) {
            this.filterData(newValue);
        },
    },
    methods: {
        //（勉强）实现了按名称搜索
        async filterData() {
            console.log('searchName', this.searchName);
            if (this.searchName) {
                try {
                    const responses = await Promise.all(this.allData.map(async item => {
                        try {
                            return await axios.get(item);
                        } catch (error) {
                            console.error(`从 ${item} 获取数据时出错:`, error);
                            return null; 
                        }
                    }));

                    this.gridData = responses.filter(response => {
                        if (!response) return false; // 过滤掉返回 null 的情况
                        const name = response.data.name;
                        return name && name.toLowerCase().includes(this.searchName.toLowerCase());
                    }).map(response => response.config.url);

                    console.log('searchList', this.gridData);
                } catch (error) {
                    console.error('处理 Promise.all 操作时出错:', error);
                    // 处理整个 Promise.all 操作的错误
                }
            } else {
                this.gridData = this.allData;
            }
        },
        async getURLs() {
            try {
                this.allData = await getActiveNFTsURLs();
                this.gridData = this.allData; //allData中存的是全部数据
                console.log('allData', this.allData)
            } catch (e) {
                console.log(e)
            }

        }
    }
}
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
    position: relative;
}

.content {
    width: 100%;
    height: 100%;
    margin-left: 10%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.cool-text {
    position: absolute;
    z-index: 0;
    font-size: 4.5em;
    top: 0;
    left: 75px;
    color: rgba(255, 87, 51, 0.8);
}

.search-box {
    z-index: 10;
    text-align: left;
    color: #9c9c9c;
    padding: 10px 15px;
    width: 500px;
    box-shadow: 2px 4px 15px #171717;
    background-color: rgb(48, 48, 48);
    border-radius: 5px;
    margin: 60px 60px;
    margin-bottom: 0;
    display: flex;
    gap: 15px;
}

.grid-box {
    z-index: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 一行四个，每个项目平均分配空间 */
    gap: 25px;
    margin: 20px 60px;
}
</style>
