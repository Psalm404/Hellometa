<template>
    <div class="container">
        <transition name="el-fade-in-linear">
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
                                <li class="recharge-item"><a href="#/myGas">燃料管理</a></li>
                                <li class="intro-item active"><a href="#/blockBrowse">区块浏览器</a></li>
                                <li class="explore-item"><a href="#/exhibitWorks">交易市场</a></li>
                                <li class="upload-item"><a href="#/uploadWorks">凭证上传</a></li>
                                <li class="records-item"><a href="#/recordWorks">我的凭证</a></li>
                                <li class="home-item"><a href="#/home">个人中心</a></li>
                            </ul>
                            <div>
                                <button class="home-navbar-button" @click="logOut">Log out</button>
                            </div>
                            <div class="home-navbar-profile">
                                <a href="https://github.com/Psalm404/Hellometa" target="_blank">
                                    <img src="../assets/github.jpg" alt="Join us">
                                </a>
                            </div>
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
                <!-- 区块浏览器部分开始 -->
                <div class="block-browser">
                    <img src="../assets/logo.png" class="block-browser-logo">
                    <p class="browser-passage1">为工业互联网数据资产存证、确权、溯源需求</p>
                    <p class="browser-passage2">提供安全、高效、可信的区块链服务</p>
                    <h1 style="color: rgb(196,196,196);">区块浏览器</h1>
                </div>
                <div class="block-browser-search-box">
                    <input type="text" class="block-browser-search-input" placeholder="搜索地址/交易/区块/代币"
                        v-model="searchData" @keyup.enter="blockSearch">
                    <button class="block-browser-search-button" @click="blockSearch">搜索</button>
                </div>
                <div v-if="show" class="block-result-card-box">
                    <div v-for="(item, index) in searchResult" :key="index" class="block-result-card">
                        <h2>区块 {{ index }}</h2>
                        <div class="block-result-card-content">
                            <el-divider><i class="el-icon-bottom"></i></el-divider>
                            <div>
                                <div v-for="(title, n) in blockTitle" :key="n" class="result-card-context">
                                    <p v-if="(n === 18 || n === 19)"></p>
                                    <p v-else>{{ title }}: {{ item[title] }}</p>
                                </div>
                                <div>
                                    <el-collapse v-model="activeNames" @change="handleChange">
                                        <el-collapse-item title="交易列表" :name="index" class="result-card-context">
                                            <p>transactions: {{ item['transactions'] }}</p>
                                            <p class="transaction-Tx-link" @click="showTransactionDetail(index)">
                                                transactionsRoot: {{ item['transactionsRoot'] }}
                                            </p>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="block-result-card-box">
                    <div class="block-result-card">
                        <h2>查询结果</h2>
                        <div class="block-result-card-content">
                            <el-divider><i class="el-icon-bottom"></i></el-divider>
                            <div>
                                <p v-for="(item, index) in transactions_detail_title" :key="index"
                                    class="result-card-context">{{ item }}: {{ transactionResult[index] }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 区块浏览器部分结束 -->
            </div>
        </transition>
    </div>
</template>

<script>
import getRecentBlocks from '@/commons/getRecentBlocks';
import getTransaction from '@/commons/getTransaction';
import getTransactionHash from '@/commons/getTransactionHash';
import getURLbyTokenId from '@/commons/getURLbyTokenId';
import debounce from 'lodash/debounce';

export default {
    created() {
        this.blockSearch = debounce(this.blockSearch, 300);
    },
    mounted() {
        this.searchData = this.$route.query.bkSearchQuery ? this.$route.query.bkSearchQuery.toString() : '';
        this.activeNames = Array.from({ length: 100 }, (_, index) => index);
        this.blockSearch();
    },
    data() {
        return {
            // 区块浏览器数据
            show: true,
            searchData: '',
            activeNames: [],
            searchResult: [],
            showDetail: false,
            blockTitle: [
                'baseFeePerGas', 'difficulty', 'extraData', 'gasLimit', 'gasUsed',
                'hash', 'logsBloom', 'miner', 'mixHash', 'nonce', 'number', 'parentHash',
                'receiptsRoot', 'sha3Uncles', 'size', 'stateRoot', 'timestamp',
                'totalDifficulty', 'transactions', 'transactionsRoot', 'uncles'
            ],
            transactionResult: [],
            transactions_detail_title: [
                'accessList', 'blockHash', 'blockNumber', 'chainId',
                'data', 'from', 'gas', 'gasPrice', 'hash', 'input', 'maxFeePerGas',
                'maxPriorityFeePerGas', 'nonce', 'r', 's', 'to', 'transactionIndex', 'type',
                'v', 'value'
            ],
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
        };
    },
    methods: {
        navSearch() {
            if (this.navSearchQuery.trim() === '') {
                return;
            }
            alert('nav button clicked');
            this.navSearchQuery = '';
        },
        logOut() {
            this.$store.dispatch('logout');
            setTimeout(() => {
                this.$router.push('/intro');
            }, 200);
        },
        blockSearch() {
            if (this.searchData === '') {
                this.show = true;
                console.log('search for all');
                getRecentBlocks().then(blocks => {
                    this.searchResult = [];
                    for (let i = 0; i < blocks.length; i++) {
                        let tmp = {};
                        for (let j = 0; j < this.blockTitle.length; j++) {
                            tmp[this.blockTitle[j]] = blocks[i]['block'][this.blockTitle[j]];
                            if (tmp[this.blockTitle[j]] != null) {
                                tmp[this.blockTitle[j]] = tmp[this.blockTitle[j]].toString();
                            }
                        }
                        this.searchResult.push(tmp);
                    }
                }).catch(error => {
                    console.error("Error fetching blocks:", error);
                });
            } else {
                this.show = false;
                if (this.searchData.startsWith('0x')) {
                    console.log('search by hashText');
                    this.searchByTH(this.searchData);
                } else if (this.searchData.startsWith('http')) {
                    console.log('search by url');
                    this.searchByUrl(this.searchData);
                } else {
                    console.log('search by token id');
                    this.searchByTokenId(this.searchData);
                }
            }
            this.$nextTick(() => {
                console.log('DOM已更新');
            });
            this.searchData = '';
        },
        async searchByUrl(url) {
            let hashTx = await getTransactionHash(url);
            if (hashTx === null) return false;
            return this.searchByTH(hashTx);
        },
        async searchByTokenId(tokenId) {
            let url = await getURLbyTokenId(tokenId);
            return this.searchByUrl(url);
        },
        async searchByTH(hash) {
            let res = await getTransaction(hash);
            if (res === 'error') return false;
            this.transactionResult = [];
            for (let i = 0; i < this.transactions_detail_title.length; i++) {
                this.transactionResult.push(res[this.transactions_detail_title[i]]);
            }
            console.log(this.transactionResult);
            return true;
        },
        showTransactionDetail(index) {
            let tmp = this.searchResult[index]['transactions'];
            this.$router.push({
                path: '/blockBrowse/transactionDetail',
                query: { hash: tmp }
            });
        },
        handleChange(val) {
            console.log(val);
        },
    },
};
</script>

<style scoped>
/* 容器样式 */
.container {
    max-width: 100%;
    height: auto;
    max-height: 100%;
}

/* 内容样式 */
.content {
    max-width: 100%;
    max-height: 100%;
    margin: 0;
}

h3 {
    font-size: 1.3em;
    color:  #c64500;
    text-align:justify;
}

.page-titile {
    position: relative;
    left: 14%;
    top: -20%;
}

.home-navbar {
    margin-top: 20px;
    margin-left: calc(50% - 48vw);
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

/* Recharge */
.recharge-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -100px; /* 根据需要调整位置 */
}

/* Browser */
.intro-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -90px; /* 根据需要调整位置 */
}

/* Explore */
.explore-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -80px; /* 根据需要调整位置 */
}

/* Upload */
.upload-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -70px; /* 根据需要调整位置 */
}

/* Records */
.records-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -60px; /* 根据需要调整位置 */
}

/* Home */
.home-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -50px; /* 根据需要调整位置 */
}

.home-navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.want-to-be-left {
    display: flex;
    justify-content: flex-start; /* 左对齐 */
    align-items: center;
    flex-grow: 1; /* 使其占据剩余空间 */
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
    color:  #ff5900;
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
    background-color: #ff5900;
    border-color: #ff5900; /* 修改hover状态下的边框颜色 */
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
    position: relative;
    left: 5%;
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
    margin-left: calc(50% - 50vw);
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

.home-block-browser {
    margin-left: calc(50% - 50vw);
    display: inline-block; /* 使标题与搜索框在同一行 */
    vertical-align: left; /* 垂直对齐 */
    color: aliceblue;
}

.chain-search-container {
    width: 100%;
    max-width: 600px;
    margin: 0px auto;
    position: relative;
    right:5%;
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

/* block browser */
.block-browser {
    position: relative;
    left: 0%;
    margin-top: 5px;
}

.block-browser-logo {
    width: 360px;
    height: auto;
}

.browser-passage1 {
    font-family: Poppins, sans-serif;
    color: #ffffff;
    font-size: 30px;
    padding: 25px 0px 30px;
}

.browser-passage2 {
    font-family: Poppins, sans-serif;
    color: #ffffff;
    font-size: 28px;
    padding: 0px 0px 60px;
}

.block-browser-search-box {
    position: relative;
    left: 0%;
    font-family: Arial, sans-serif;
    width: 700px;
    margin: 20px auto;
    padding: 10px;
    background-color: #ffffffab;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
}

.block-browser-search-input {
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    background-color: #ffffffd5;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
}

.block-browser-search-button {
    padding: 10px 20px;
    background-color: #ff5100;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.block-browser-search-button:hover {
    background-color: #ffc02d;
    color: #ffffff94;
}

.block-result-card-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.block-result-card {
    max-width: 80%;
    margin-bottom: 50px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    width: 80%;
    align-self: center;
}

.block-result-card:hover {
    transform: translateY(-10px);
}

.block-result-card-content {
    padding: 20px;
}

.result-card-context {
    text-align: left;
    padding-left: 30px;
    padding-right: 30px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.transaction-Tx-link {
    color: rgb(209, 100, 37);
}

.transaction-Tx-link:hover {
    cursor: pointer;
}
</style>