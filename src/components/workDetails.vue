<template>
<div class="container">
    <transition name="el-fade-in-linear">
        <div class="content" v-show = "show">
            <div class="detail-box">
                <div class="delete-work">
                    <a @click="deleteWork"> <i class="el-icon-delete"></i> 删除作品</a>
                </div>
                <div class="detail-box-top">
                    <div class="detail-box-top-left">
                        <div class="record-picture">
                            <el-avatar shape="square" :size="220" :src="picUrl"></el-avatar>
                        </div>
                        <div class="work-download"> <button>下载文件</button> </div>
                    </div>
                    <div class="detail-box-top-right">
                        <div class="work-name">
                            <span style="font-weight: bolder;">作品名称:</span>
                            <span style=" display: block; align-self: self-start">{{workName}}</span>
                        </div>
                        <div class="work-type">
                            <span style="font-weight: bolder;">作品类别:</span>
                            <span>{{workType}}</span>
                        </div>
                        <div class="work-describe">
                            <span style="font-weight: bolder;">
                                作品介绍:
                            </span>
                            <span style="display: block">{{ workDesc }}</span>
                        </div>
                        <div class="work-createtime">
                            <span style="font-weight: bolder;">
                                铸造时间:
                            </span>
                            <span style="display: block">{{ workCreateTime }}</span>
                        </div>
                        <div class="work-hashvalue">
                            <span style="font-weight: bolder;">
                                TokenID:
                            </span>
                            <span style="display: block">{{ workHashValue }}</span>
                        </div>
                    </div>
                </div>
                <div class="detail-box-bottom">
                    <div class="back-button">
                        <button @click="backToRecord"> 返回 </button>
                    </div>
                </div>
            </div>
            <div class="cool-text">DETAILS</div>
        </div>
    </transition>
</div>
</template>

<script>
export default { 
    name: 'ChildComponent',
    mounted(){
      setTimeout(()=>{
        this.show = true;
      },100)
    },

    data() {
        return {
            show:false,
            picUrl: require('../assets/image.png'),
            workHashValue: '1111111111122222222222222333333333344444444555555555555',
            workCreateTime: new Date(),
            workName: "一只猫猫的照片",
            workType: "",
            workDesc: ""
        }
    },
    methods: {
        /*该方法用于接收值,并处理父组件穿过来的值*/
        hangleProp(data) {
            // 这是通过方式 1 实现的传值,
            console.log('父组件通过 $refs 穿过来的值是 : ',data);
        },
        backToRecord() {
            this.$router.push('/recordWorks');
        },
        deleteWork() {

        },
    }
}
</script>

<style>
.container {
    max-height: 100vh;
    overflow: hidden;
    width: 100vw;
}

.content {
    max-width: 90%;
    height: 100%;
    margin-left: 10%;
    position: relative;
    display: flex;
    flex-direction: column;
}

.detail-box {
    margin: 60px 60px;
    background-color: #303030;
    box-shadow: 0px 4px 15px #000000;
    height: 80vh;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.work-name,
.work-type,
.work-describe,
.work-createtime,
.work-hashvalue {
    text-align: left;
}

.detail-box-top {
    flex: 9;
    width: 100%;
    display: flex;
    margin-top: 50px;
}

.detail-box-top-left {
    flex: 1;
}

.work-download {
    margin-top: 30px;
}

.work-download button {
    margin: auto;
    flex: 1;
    border: 1px solid #9c9c9c;
    cursor: pointer;
    width: 180px;
    color: #9c9c9c;
    background-color: transparent;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
}

.work-download button:hover {
    border: 1px solid rgba(255, 87, 51, 1);
    color: rgba(255, 87, 51, 1);
}

.detail-box-top-right {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: self-start;
    margin-right: 30px;
    font-size: 17px;
}

.detail-box-top-right .data-describe {
    flex: 6;
    margin-right: 30px;
}

.detail-box-top-right .data-select {
    flex: 2;

}

.detail-box-bottom {
    flex: 2;
    /* border:1px solid green; */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.detail-box-bottom button {
    margin: auto;
    flex: 1;
    border: 1px solid rgba(255, 87, 51, 1);
    cursor: pointer;
    width: 180px;
    color: rgba(255, 87, 51, 0.8);
    background-color: transparent;
    border-radius: 5px;
    height: 30px;
}

.delete-work {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
}

.delete-work a {
    color: #9c9c9c;
    font-size: 15px;
    text-decoration: none;
}

.delete-work a:hover {
    color: rgba(255, 87, 51, 1);
}
</style>
