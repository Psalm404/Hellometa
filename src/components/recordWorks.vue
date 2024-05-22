<template>
<div class="container">
    <child-component ref="child"/>
    <transition name="el-fade-in-linear">
        <div class="content" v-show = "show">
            <div class="cool-text">RECORD</div>
            <div class=search-box> <i class="el-icon-search" style="font-size: large; line-height:33px;"></i>
                <el-input class="search-by-name" placeholder="按名称搜索" v-model="searchName" size=small></el-input>
                <Select class="search-by-type" placeholder="按类型搜索">
                    <Option el-option label="文本" value="txt"></Option>
                    <Option label="图片" value="pic"></Option>
                </Select>
            </div>
            <div class="grid-box">
                <div v-for="(item, index) in gridData" :key="index" class="grid-item">
                    <div class="grid-item-top">
                        <div class="grid-item-top-top">
                            <div class="grid-item-top-left">
                                <div class="record-picture">
                                    <el-avatar shape="square" :size="113" :src="picUrl"></el-avatar>
                                </div>
                            </div>
                            <div class="grid-item-top-right">
                                <div class="record-name">
                                    <span class="record-name-title">作品名称：</span>
                                    <span style="font-weight:bolder; display: block; align-self: self-start">{{ recordName }}</span>
                                </div>
                                <div class="record-type">
                                    <span>作品类别：{{ recordType }}</span>
                                    <!-- 父向子 workDetails传参 -->
                                    <workDetails :workType="recordType" :workName="recordName" :workDesc="recordDesc"/>
                                    <!-- 父向子 workDetails传参 -->
                                </div>
                            </div>
                        </div>

                        <div class="grid-item-top-bottom">
                            <div class="record-desc">
                                <span>作品描述:</span>
                                <span style="display:block; margin-top:5px; margin-left:15px; font-weight:bolder; font-size:small">{{ recordDesc }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="grid-item-bottom">
                        <button @click="toDetails">
                            查看凭证
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import workDetails from './workDetails.vue';

export default {
    components(){
        workDetails
    },
    mounted(){
      setTimeout(()=>{
        this.show = true;
      },100)
    },
    data() {
        
        return {
            show:false,
            picUrl: require('../assets/image.png'),
            searchName: '',
            recordName: "一只猫猫一只猫猫一只猫猫一只猫猫一只猫猫",
            recordDesc: "一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片一只猫猫的照片",
            recordType: "图片",
            gridData: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 9", "Item 9"] // 示例数据
        };
    },
    methods: {
        toDetails() {
            this.$refs.child.hangleProp(this.recordName);
            this.$router.push('/workDetails');
        }
    }
};
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
    z-index: 2;
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
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
    margin: 20px 60px;

}

.grid-item {
    color: white;
    background-color: #f0f0f0;
    padding: 15px;
    height: 330px;
    text-align: center;
    border-radius: 7px;
    box-shadow: 2px 4px 15px #171717;
    background-color: rgb(48, 48, 48);
    display: flex;
    flex-direction: column
}

.grid-item-top {
    flex: 5;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* border:1px solid red; */
}

.grid-item-top-top {
    flex: 1;
    display: flex;
    gap: 10px;
    /* border: 1px solid green; */
}

.grid-item-top-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: self-start;
}

.record-name {
    margin-top: 10px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.record-type {
    flex: 1;
    align-self: self-start;
}

.grid-item-bottom .grid-item-top-left {
    flex: 1;
}

.grid-item-top-bottom {
    flex: 2;
}

.record-desc {
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
}

.grid-item-bottom button {
    margin-top: 10px;
    flex: 1;
    border: 1px solid rgba(255, 87, 51, 1);
    cursor: pointer;
    width: 150px;
    color: rgba(255, 87, 51, 0.8);
    background-color: transparent;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
}
</style>
