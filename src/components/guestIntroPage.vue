<template>
    <div class="container">
        <transition name="el-fade-in-linear">
            <div class="content">
                <nav class="home-navbar">
                    <div class="home-navbar-container">
                        <div class="home-navbar-logo-container">
                            <a href="#/intro" class="home-navbar-logo">
                                <img src="../assets/logo.png" alt="Logo" class="home-logo-image">
                            </a>
                            <h3 class="home-navbar-title">游客模式</h3>
                        </div>
                        <ul class="home-navbar-menu">
                            <!-- 游客模式下的信息浏览 -->
                            <!-- <li><a href="#/intro">Explore</a></li> -->
                        </ul>
                        <div class="home-navbar-actions">
                            <button class="home-navbar-button" @click="triggerLogin">登录</button>
                            <a href="https://github.com/Psalm404/Hellometa" target="_blank" class="home-navbar-profile">
                                <img src="../assets/github.jpg" alt="Join us">
                            </a>
                        </div>
                    </div>
                </nav>
                <div class="home-card-container">
                    <el-carousel :interval="4000" type="card">
                        <el-carousel-item v-for="(item, index) in picture" :key="index">
                            <img :src="item" class="home-card-img" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <el-divider><i class="el-icon-s-promotion"></i></el-divider>
                <div class="home-introduction">
                    <h1>什么是工业互联网数据资产化？</h1>
                    <div class="home-text-blocks-container">
                        <div class="home-text-block" v-for="(block, index) in textBlocks" :key="index">
                            <h3>{{ block.title }}</h3>
                            <p>{{ block.description }}</p>
                        </div>
                    </div>
                </div>
                <!-- <el-divider><i class="el-icon-menu"></i></el-divider> -->
                <!-- 移除了区块浏览器部分 -->
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    mounted() {
    },
    data() {
        return {
            // 走马灯图片
            picture: [
                require("@/assets/6.png"),
                // require("@/assets/PixPin_2024-05-25_17-46-05.jpg"),
                require("@/assets/7.png"),
                require("@/assets/1.jpg"),
                require("@/assets/2.jpg"),
                require("@/assets/3.jpg"),
                require("@/assets/4.jpg"),
                require("@/assets/5.jpg"),
            ],

            // 介绍文字
            textBlocks: [
                {
                    title: '工业互联网 ', description: '"工业互联网"（Industrial Internet）是指在工业领域应用物联网技术，'
                        + '通过设备、传感器和软件系统的互联互通，实现数据的收集、交换和分析，以优化制造流程、提高生产效率和减少维护' +
                        '成本的概念。它通常涉及到智能制造、自动化技术、大数据分析和云计算等领域。'
                },
                {
                    title: '无币公链', description: '"无币公链"是指一种公共区块链技术的实现，其中不发行任何原生加密货币或代币。' +
                        '这与众多知名的区块链平台不同，后者通常都有自己的内置代币，如比特币、以太坊等。'
                },
                {
                    title: '数据资产化', description: '"数据资产化"是一个涉及将数据转换成可量化的、有价值的资产的概念。'
                        + '这一过程不仅包括数据的收集和存储，还包括对数据的管理、分析和利用，目的是从数据中提取价值，支持决策制定，' +
                        '创造商业机会，甚至直接作为产品或服务出售。'
                },
            ],
            navSearchQuery: '',
            bkSearchQuery: '',
        };
    },
    watch: {
    },
    methods: {
        
        triggerLogin() {
            console.log('click-login')
            this.$emit('trigger-login'); // 触发登录事件
        },
        navSearch() {
            if (this.navSearchQuery.trim() === '') {
                return;
            }
            alert('nav button clicked')
            this.navSearchQuery = '';
        },

    }
}
</script>

<style scoped>
.container {
    margin-left: calc(50% - 50vw); /* 使用calc函数让页面自动紧贴左侧 */
    width: 100vw; /* 确保页面内容宽度占据整个视口宽度 */
    height: 100vw;
}

h3 {
    font-size: 1.2em;
    color:  #c64500;
    text-align: center;
}

.home-navbar {
    margin-top: 20px;
    margin-left: calc(50% - 55vw);
    background-color: rgba(255, 255, 255, 0.6); /* 设置为半透明 */
    border-bottom: 1px solid rgba(230, 232, 236, 0); /* 去掉底部边框 */
    padding: 10px 20px;
    position: fixed;
    top: 0;
    width: 90%;
    height: auto;
    z-index: 1000;
    border-radius: 25px; /* 设置圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
    backdrop-filter: blur(30px); /* 添加背景模糊效果 */
}

.home-navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.home-navbar-logo-container {
    display: flex;
    align-items: center;
}

.home-navbar-logo {
    font-size: 24px;
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

.home-navbar-menu {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}

.home-navbar-menu li {
    margin: 0 15px;
}

.home-navbar-menu li a {
    color: #4d3535;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    transition: color 0.3s;
}

.home-navbar-menu li a:hover {
    color:  #ff5900;
}

.home-navbar-actions {
    display: flex;
    align-items: center;
}

.home-navbar-button {
    background-color: rgba(255, 255, 255, 0.6); /* 设置为半透明 */
    color: #4d3535;
    border: 1px solid #4d3535; /* 添加2px的边框，颜色与原背景色一致 */
    padding: 10px 10px;
    border-radius: 20px; /* 设置圆角 */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s; /* 添加边框颜色过渡 */
    margin-right: 10px; /* 增加一个右边距 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
    backdrop-filter: blur(30px); /* 添加背景模糊效果 */
}

.home-navbar-button:hover {
    background-color: rgba(255, 255, 255, 0.8); /* 修改hover背景色 */
    border-color: #ff5900; /* 修改hover状态下的边框颜色 */
}

.home-navbar-button:hover {
    background-color: #ff5900;
}

.home-navbar-profile img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
}

/* .home-card-container {
    margin-top: 80px;
    height: auto;
} */

.home-card-container {
    margin-top: 100px;
    height: auto;
    padding: 0; /* 移除任何内边距 */
    width: 90%; /* 确保容器宽度为100% */
    box-sizing: border-box; /* 确保padding和border包含在宽度内 */
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.home-card-img {
    width: 100%; /* 图片宽度填充整个容器 */
    height: 100%; /* 图片高度填充整个容器 */
    object-fit: cover; /* 保持图片比例，同时填充整个容器 */
}

.el-divider {
    text-align: center; /* 可以设置为 left, center, 或 right */
    margin-left: calc(50% - 50vw); /* 根据需要调整整体对齐 */
    margin-top: 20px; /* 增加上方空白间距 */
    margin-bottom: 20px; /* 增加下方空白间距 */
}

.el-divider i {
    /* introduction白框内图标样式调整 */
}

.home-introduction {
    margin-left: calc(50% - 54vw);
    font: "Microsoft YaHei";
    color: white;
}

.home-text-blocks-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
}

.home-text-block {
    flex: 1;
    margin: 0 10px;
    background-color: transparent;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
}

.home-text-block h3 {
    margin-bottom: 10px;
    font-size: 1.5em;
}

.home-text-block p {
    font-size: 1em;
    line-height: 1.6;
}

</style>