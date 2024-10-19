<template>
<div class="container"  :style="{ '--buttonColor': buttonColor,'--wordColor': wordColor,'--background': mainBackgroundColor}">

        <div class="content">
            <nav class="home-navbar">
                <div class="home-navbar-container">
                    <div class="want-to-be-left">
                        <a class="home-navbar-logo">
                            <img src="../assets/logo.png" alt="Logo" class="home-logo-image">
                        </a>
                        <div class="page-titile">
                            <h3></h3>
                        </div>
                    </div>
                    <div class="want-to-be-right">
                        <ul class="home-navbar-menu">
                            <li class="mode-item">
                                <el-switch v-model="modeValue" active-color="#ff5900" inactive-color='#409eff' @change="changeBgc">
                                </el-switch>
                            </li>
                            <li class="guide-item"><a href="#/guidePage">用户指南</a></li>
                            <li class="recharge-item"><a href="#/myGas">燃料管理</a></li>
                            <li class="intro-item"><a href="#/blockBrowse">区块浏览器</a></li>
                            <li class="explore-item active"><a href="#/exhibitWorks">交易市场</a></li>
                            <li class="upload-item"><a href="#/uploadWorks">凭证上传</a></li>
                            <li class="records-item"><a href="#/recordWorks">我的凭证</a></li>
                            <li class="home-item"><a href="#/home">个人中心</a></li>
                           
                        </ul>
                        <div>
                            <button class="home-navbar-button" @click="logOut">退出登录</button>
                        </div>
                        <div class="home-navbar-profile">
                            <a href="https://github.com/Psalm404/Hellometa" target="_blank">
                                <img src="../assets/github.jpg" alt="Join us">
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- 将 DISPLAY 和搜索框包裹在一个新的容器中 -->
            <div class="display-container">
                <div class="profile-title" >
                    <h2 :style = "{color:buttonColor}">Display</h2>
                </div>
                <div class="search-box">
                    <i class="el-icon-search" style="font-size: large; line-height:33px;"></i>
                    <el-input class="search-by-name" placeholder="按名称搜索" v-model="searchName" size="small"></el-input>
                    <el-select style="width:200px; " size="small" v-model="searchType" placeholder="按类型搜索">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
            </div>
            <transition name="el-fade-in-linear">
            <div class="grid-box">
                <div v-for="(item, index) in gridData" :key="index" class="grid-item">
                    <subInfo :fileURL="item" :source="source" />
                </div>
            </div>
        </transition>
        </div>
  
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
        this.wordColor = this.$store.state.textColor;
        console.log('wordColor:', this.wordColor)
        this.buttonColor = this.$store.state.buttonColor;
        this.mainBackgroundColor = this.$store.state.backgroundColor;
        this.modeValue = this.$store.state.modeValue;
        setTimeout(() => {
                this.show = true;
            }, 150),
            this.getURLs();
    },
    computed: {
        backgroundColor() {
            console.log(this.$store.state.backgroundColor, this.$store.state.textColor)
            return {
                backgroundColor: this.$store.state.backgroundColor,
                wordColor: this.$store.state.textColor,
                buttonColor: this.$store.state.buttonColor
            };
        }
    },
    data() {
        return {
            modeValue: null,
            mainBackgroundColor: '#ffffff',
            wordColor: 'white',
            buttonColor: '409eff',
            show: false,
            searchName: '',
            searchType: '',
            source: "exhibit",
            allData: [],
            gridData: [],
            options: [{
                    value: 'pic',
                    label: '图片'
                }, {
                    value: 'txt',
                    label: '文本'
                },
                {
                    value: '',
                    label: '全部'
                }
            ]
        };
    },
    watch: {
        backgroundColor(newColor) {
            console.log('chamge')
            this.mainBackgroundColor = newColor;
            this.buttonColor = this.$store.state.buttonColor;
            this.wordColor = this.$store.state.textColor;
        },
        searchName(newValue) {
            this.filterData(newValue);
        },
        searchType(newValue2) {

            this.filterData(newValue2);
        }
    },
    methods: {
        changeBgc() {
            console.log('切换背景颜色')
            if (!this.modeValue)
                this.$store.dispatch('changeColor', {
                    backgroundColor: '#f5f5f5',
                    buttonColor: '#409eff',
                    textColor: 'black'
                });
            else
                this.$store.dispatch('changeColor', {
                    backgroundColor: '#292929',
                    buttonColor: '#ff5900',
                    textColor: '#edebeb'
                });
        },
        logOut() {
            this.$store.dispatch('logout');
            if (this.$route.path !== '/intro') {
                setTimeout(() => {
                    this.$router.push('/intro');
                }, 100);
            }
        },
        async filterData() {
            console.log('searchName', this.searchName);
            console.log('searchType', this.searchType);

            if (this.searchName || this.searchType) {
                console.log('searchType', this.searchType)
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
                        const type = response.data.type; // 假设响应中包含类型信息

                        const nameMatches = this.searchName ?
                            name && name.toLowerCase().includes(this.searchName.toLowerCase()) :
                            true;

                        const typeMatches = this.searchType ?
                            type && type.toLowerCase().includes(this.searchType.toLowerCase()) :
                            true;

                        // 同时满足名称和类型条件
                        return nameMatches && typeMatches;
                    }).map(response => response.config.url);

                    console.log('filteredData', this.gridData);
                } catch (error) {
                    console.error('处理 Promise.all 操作时出错:', error);
                }
            } else {
                this.gridData = this.allData; // 没有搜索条件时，显示全部数据
            }
        },
        async getURLs() {
            try {
                this.allData = await getActiveNFTsURLs();
                this.gridData = this.allData; // allData中存的是全部数据
                console.log('allData', this.allData);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: auto;
    max-height: 100%;
    /* display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
    position: relative; */
}

.content {
    max-width: 100%;
    
    width: 100%;
    margin: 0 auto;
    /* width: 100%;
    height: 100%;
    margin-left: 10%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: auto; */
}

/* 新增的样式 */
.display-container {
    display: flex;
    align-items: center;
    /* 垂直居中对齐 */
    justify-content: space-between;
    /* 在两端对齐 */
    margin-top: 70px;
    /* 根据需要调整间距 */
    padding: 0 15px;
    /* 根据需要调整内边距 */
}

.search-box {

    position: relative;
    top: 0%;
    left: -28%;
    z-index: 10;
    text-align: left;
    color: #9c9c9c;
    padding: 15px 15px;
    width: 500px;
    border: 1px solid gray;
    border-radius: 5px;
    margin: 0px 60px;
    margin-left: 10%;
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

.grid-item {
    color: var(--wordColor);
    background-color: rgba(157, 157, 157, 0.1);
    height: 330px;
    text-align: center;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    /* 添加灰白色边框 */
}

.home-navbar {
    margin-top: 20px;
    margin-left: calc(50% - 48vw);
    background-color: rgba(255, 255, 255, 0.6);
    /* 设置为半透明 */
    border-bottom: 1px solid rgba(230, 232, 236, 0);
    /* 去掉底部边框 */
    padding: 10px 20px;
    position: fixed;
    top: 0;
    width: 90%;
    height: auto;
    z-index: 1000;
    border-radius: 25px;
    /* 设置圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 添加阴影效果 */
    backdrop-filter: blur(30px);
    /* 添加背景模糊效果 */
}
.mode-item {
    position: relative;
    top: 12px;
    /* 根据需要调整位置 */
    left: -115px;
    /* 根据需要调整位置 */
}

/* Recharge */
.guide-item {
    position: relative;
    top: 10px;
    /* 根据需要调整位置 */
    left: -110px;
    /* 根据需要调整位置 */
}

/* Recharge */
.recharge-item {
    position: relative;
    top: 10px;
    /* 根据需要调整位置 */
    left: -100px;
    /* 根据需要调整位置 */
}

/* Browser */
.intro-item {
    position: relative;
    top: 10px;
    /* 根据需要调整位置 */
    left: -90px;
    /* 根据需要调整位置 */
}

/* Explore */
.explore-item {
    position: relative;
    top: 10px;
    /* 根据需要调整位置 */
    left: -80px;
    /* 根据需要调整位置 */
}

/* Upload */
.upload-item {
    position: relative;
    top: 10px;
    /* 根据需要调整位置 */
    left: -70px;
    /* 根据需要调整位置 */
}

/* Records */
.records-item {
    position: relative;
    top: 10px;
    /* 根据需要调整位置 */
    left: -60px;
    /* 根据需要调整位置 */
}

/* Home */
.home-item {
    position: relative;
    top: 10px;
    /* 根据需要调整位置 */
    left: -50px;
    /* 根据需要调整位置 */
}

.home-navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.want-to-be-left {
    display: flex;
    justify-content: flex-start;
    /* 左对齐 */
    align-items: center;
    flex-grow: 1;
    /* 使其占据剩余空间 */
}

.want-to-be-right {
    display: flex;
    justify-content: space-evenly;
}

.home-navbar-logo-container {
    display: flex;
    align-items: center;
}

.home-navbar-logo {
    font-size: 2px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
}

.home-logo-image {
    height: 40px;
    margin-right: 10px;
}

.home-navbar-title {
    margin: 0;
    padding: 0;
}

.home-navbar-menu li {
    margin: 0 15px;
}

.home-navbar-menu {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}

.home-navbar-menu li a {
    color: #4d3535;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    transition: color 0.3s;
}

.home-navbar-menu li.active a {
    font-size: 18px;
    color: var(--buttonColor);
    ;
}

.home-navbar-menu li a:hover {
    color: var(--buttonColor);
}


.home-navbar-actions {
    display: flex;
    align-items: center;
}

.home-navbar-button {
    background-color: rgba(255, 255, 255, 0.6);
    /* 设置为半透明 */
    color: #4d3535;
    border: 1px solid #4d3535;
    /* 添加2px的边框，颜色与原背景色一致 */
    padding: 10px 10px;
    border-radius: 20px;
    /* 设置圆角 */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    /* 添加边框颜色过渡 */
    margin-right: 10px;
    /* 增加一个右边距 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 添加阴影效果 */
    backdrop-filter: blur(30px);
    /* 添加背景模糊效果 */
}

.home-navbar-button:hover {
    background-color: #ff5900;
    border-color: #ff5900;
    /* 修改hover状态下的边框颜色 */
}

.home-navbar-profile img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
}

.profile-titile {
    z-index: 00;
    /* 设置一个较高的 z-index 使其在页面顶层 */
}

h2 {
    position: relative;
    left: 12%;
    top: 23px;
    font-size: 6em;
    color: var(--buttonColor);
    text-align: center;
}
</style>
