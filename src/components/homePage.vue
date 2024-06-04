<template>
    <div class="container">
        <transition name="el-fade-in-linear">
            <div class="content">
                <nav class="home-navbar">
                    <div class="home-navbar-container">
                        <a href="#/home" class="home-navbar-logo">
                            <img src="../assets/logo.png" alt="Logo" class="home-logo-image">
                        </a>
                        <h2>工业互联网数据资产化平台</h2>
                        <ul class="home-navbar-menu">
                            <li><a href="#/exhibitWorks">Explore</a></li>
                            <li><a href="#/uploadWorks">Upload</a></li>
                            <li><a href="#/recordWorks">Records</a></li>
                        </ul>
                        <div class="home-navbar-search">
                            <div class="home-search-icon">
                                <input type="text" class="home-search-input" v-model="navSearchQuery"
                                    @keyup.enter="navSearch" placeholder="Search...">
                            </div>
                        </div>
                        <div>
                            <button class="home-navbar-button" @click="connWallet">Connect Wallet</button>
                        </div>
                        <div class="home-navbar-profile">
                            <a href="https://github.com/Psalm404/Hellometa" target="_blank">
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
                <el-divider><i class="el-icon-menu"></i></el-divider>
                <a href="#/blockBrowser">
                    <h1 class="home-block-browser" @click="gotoBrowser">区块浏览器</h1>
                </a>
                <div class="chain-search-container">
                    <div class="chain-search-box">
                        <h3 style="color: aliceblue; margin: 10px;">搜索</h3>
                        <input type="text" v-model="bkSearchQuery" @keyup.enter="bkSearch" placeholder="搜索地址/交易/区块/代币">
                        <button @click="bkSearch">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 100),
            this.getURLs();
    },
    data() {
        return {
            show: false,

            // 走马灯图片
            picture: [
                require("@/assets/680aa819c894e632d3ce71e1ef533ea.png"),
                require("@/assets/PixPin_2024-05-25_17-46-05.jpg"),
                require("@/assets/d7dfc57d557f18490d2d00ba5f9f8af.png"),
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
        searchName(newValue) {
            this.filterData(newValue);
        },
    },
    methods: {
        navSearch() {
            if (this.navSearchQuery.trim() === '') {
                return;
            }
            alert('nav button clicked')
            this.navSearchQuery = '';
        },
        bkSearch() {
            if (this.bkSearchQuery.trim() === '') {
                return;
            }
            alert('bkSearch button clicked');
            // 清空搜索框
            let tmp = this.bkSearchQuery;
            this.bkSearchQuery = '';
            // 跳转到区块浏览器界面
            this.$router.push({ path: '/blockBrowser', query: { bkSearchQuery: tmp } });
        },
        gotoBrowser() {
            this.$router.push({ path: '/blockBrowser'});
        },
        connWallet() {
            alert("connWallet button clicked")
        },

    }
}
</script>

<style>
.home-navbar {
    background-color: #fff;
    border-bottom: 1px solid #e6e8ec;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    width: 90%;
    z-index: 1000;
}

.home-navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.home-navbar-logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
}

.home-logo-image {
    height: 40px;
    /* Adjust the height to your logo size */
    margin-right: 10px;
    /* Space between logo and text */
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

.home-navbar-menu a {
    color: #1a73e8;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
    transition: color 0.3s;
}

.home-navbar-menu a:hover {
    color: rgb(102, 229, 255);

}

.home-navbar-search {
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-right: auto;
    position: relative;
}

.home-search-icon {
    position: relative;
}

.home-search-input {
    padding: 8px 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s;
}

.home-search-input:focus {
    outline: none;
    border-color: #aaa;
}

.home-navbar-button {
    background-color: #1a73e8;
    color: #fff;
    border: none;
    padding: 10px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.home-navbar-button:hover {
    background-color: #155ab3;
}

.home-navbar-profile img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-left: 20px;
    cursor: pointer;
}

.home-card-container {
    margin-top: 80px;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.home-card-img {
    max-width: 100%;
    height: auto;
}

.home-introduction {
    font: "Microsoft YaHei";
    color: #edebeb;
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
    background-color: rgb(41, 41, 41);
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

.chain-search-container {
    width: 100%;
    max-width: 600px;
    margin: 50px auto;
}
.home-block-browser {
    color: aliceblue;
}
.chain-search-box {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
}

.chain-search-box input[type="text"] {
    flex: 1;
    padding: 10px 15px;
    border: none;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
}

.chain-search-box button {
    padding: 10px 15px;
    border: none;
    background: transparent;
    cursor: pointer;
    outline: none;
}

.chain-search-box button:hover {
    background-color: #f1f1f1;
}

.chain-search-box svg {
    width: 20px;
    height: 20px;
    fill: #666;
}
</style>