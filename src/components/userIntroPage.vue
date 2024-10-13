<template>
<div class="container">
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
                        <li class="guide-item"><a href="#/guidePage">用户指南</a></li>
                        <li class="recharge-item"><a href="#/myGas">燃料管理</a></li>
                        <li class="intro-item  active"><a>区块浏览器</a></li>
                        <li class="explore-item">
                            <a href="#/exhibitWorks" :class="{ disabled: !$store.state.isAccountMatched }">交易市场</a>
                        </li>
                        <li class="upload-item">
                            <a href="#/uploadWorks" :class="{ disabled: !$store.state.isAccountMatched }">凭证上传</a>
                        </li>
                        <li class="records-item">
                            <a href="#/recordWorks" :class="{ disabled: !$store.state.isAccountMatched }">我的凭证</a>
                        </li>
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
            <input type="text" class="block-browser-search-input" placeholder="可输入交易哈希/区块哈希/发送方地址/tokenID搜索区块" v-model="searchData" @keyup.enter="blockSearch">
            <button class="block-browser-search-button" @click="blockSearch">搜索</button>
        </div>
        <div v-if="show" class="block-result-card-box">
            <div v-for="(item, index) in searchResult" :key="index" class="block-result-card">
                <h2>区块{{ index }}</h2>
                <div class="block-result-card-content">
                    <!-- <el-divider><i class="el-icon-bottom"></i></el-divider> -->
                    <div>
                        <div v-for="(title, n) in blockTitle" :key="n" class="result-card-context">
                            <p v-if="(n === 18 || n === 19)"></p>
                            <p v-else>{{ title }}: {{ item[title] }}</p>
                        </div>
                    </div>
                    <button class="details-button" @click="searchByTH(item['Hash'])">详情</button>
                </div>
            </div>
        </div>
        <div v-else class="block-result-card-box">
            
            <div class="block-result-card">
                <!-- 左上角返回箭头 -->
                <div class="back-arrow" @click="blockSearch">
                    &larr; 返回
                </div>
                <h2>区块详情</h2>
                <div class="block-result-card-content">
                    <div>
                        <!-- 循环显示每个区块的基本信息 -->
                        <p v-for="(item, index) in transactions_detail_title" :key="index" class="result-card-context">{{ item }}: {{ transactionResult[item] }}</p>
                        
                        <p class="result-card-context">ExtraData⬇️---------------------------------------------------------------</p>
                        <div v-for="(value, key) in transactionResult['ExtraData']" :key="key" class="result-card-context">
                            <p>{{ key }}: {{ value }}</p>
                        </div>

                        <!-- 展示 Transactions 列表 -->
                        <p class="result-card-context">Transactions⬇️---------------------------------------------------------------</p>
                        <div v-if="transactionResult['Transactions'] && transactionResult['Transactions'].length" class="result-card-context">
                            <div v-for="(tx, txIndex) in transactionResult['Transactions']" :key="txIndex">
                                <p>TxHash: {{ tx.TxHash }}</p>
                                <p>From: {{ tx.FromAddress }}</p>
                                <p>To: {{ tx.ToAddress }}</p>
                                <p>Value: {{ tx.Value }}</p>
                                <p>Gas: {{ tx.Gas }}</p>
                                <p>Nonce: {{ tx.Nonce }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 区块浏览器部分结束 -->
    </div>

</div>
</template>

<script>
// import getRecentBlocks from '@/commons/getRecentBlocks';
// import getTransaction from '@/commons/getTransaction';
import getTransactionHash from '@/commons/getTransactionHash';
import getURLbyTokenId from '@/commons/getURLbyTokenId';
import debounce from 'lodash/debounce';
import axios from 'axios';

export default {
    created() {
        this.blockSearch = debounce(this.blockSearch, 300);
    },
    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 150)
        this.searchData = this.$route.query.bkSearchQuery ? this.$route.query.bkSearchQuery.toString() : '';
        this.activeNames = Array.from({
            length: 100
        }, (_, index) => index);
        this.blockSearch();
    },
    data() {
        return {
            // 区块浏览器数据
            show: false,
            searchData: '',
            activeNames: [],
            searchResult: [],
            showDetail: false,
            blockTitle: [
                'BlockNumber', 
                'Difficulty', 
                // 'ExtraData', 
                'GasLimit', 
                'GasUsed', 
                'Hash', 
                'LogsBloom', 
                'Miner', 
                'Nonce', 
                'ParentHash', 
                'ReceiptsRoot', 
                'Sha3Uncles', 
                'Size', 
                'StateRoot', 
                'Timestamp', 
                'TotalDifficulty', 
                // 'Transactions', 
                'TransactionsRoot', 
                // 'Uncles' 
            ],
            transactionResult: [],
            transactions_detail_title: [
                'BlockNumber', 
                'Difficulty', 
                'GasLimit', 
                'GasUsed', 
                'Hash', 
                'LogsBloom', 
                'Miner', 
                'Nonce', 
                'ParentHash', 
                'ReceiptsRoot', 
                'Sha3Uncles',
                'Size', 
                'StateRoot', 
                'Timestamp', 
                'TotalDifficulty', 
                'TransactionsRoot', 
            ],
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
            textBlocks: [{
                    title: '工业互联网 ',
                    description: '"工业互联网"（Industrial Internet）是指在工业领域应用物联网技术，' +
                        '通过设备、传感器和软件系统的互联互通，实现数据的收集、交换和分析，以优化制造流程、提高生产效率和减少维护' +
                        '成本的概念。它通常涉及到智能制造、自动化技术、大数据分析和云计算等领域。'
                },
                {
                    title: '无币公链',
                    description: '"无币公链"是指一种公共区块链技术的实现，其中不发行任何原生加密货币或代币。' +
                        '这与众多知名的区块链平台不同，后者通常都有自己的内置代币，如比特币、以太坊等。'
                },
                {
                    title: '数据资产化',
                    description: '"数据资产化"是一个涉及将数据转换成可量化的、有价值的资产的概念。' +
                        '这一过程不仅包括数据的收集和存储，还包括对数据的管理、分析和利用，目的是从数据中提取价值，支持决策制定，' +
                        '创造商业机会，甚至直接作为产品或服务出售。'
                },
            ],
        };
    },
    methods: {
        logOut() {
        console.log('logOut');
            this.$store.dispatch('logout');
            if (this.$route.path !== '/intro') {
                setTimeout(() => {
                    this.$router.push('/intro');
                }, 100);
            }
        },
        blockSearch() {
            if (this.searchData === '') {
                this.show = true;
                console.log('search for all');

                // 使用API请求前100个区块
                const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
                axios.get(`${apiBaseUrl}/getBlocksAndTransactions`, {
                    params: {
                        n: 100
                    } // 获取前100个区块
                }).then(response => {
                    if (response.data.code === 200) {
                        const blocks = response.data.blocksWithTransactions;
                        this.searchResult = [];
                        for (let i = 0; i < blocks.length; i++) {
                            let tmp = {};
                            // 将区块信息从响应数据中提取并匹配你已有的字段
                            for (let j = 0; j < this.blockTitle.length; j++) {
                                tmp[this.blockTitle[j]] = blocks[i][this.blockTitle[j]] || ''; // 使用区块数据中的相应字段
                                // console.log(blocks);
                                if (tmp[this.blockTitle[j]] != null) {
                                    tmp[this.blockTitle[j]] = tmp[this.blockTitle[j]].toString();
                                }
                            }
                            this.searchResult.push(tmp);
                        }
                    } else {
                        console.error("Error fetching blocks:", response.data);
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
            this.show = false;
            const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;

            try {
                const res = await axios.get(`${apiBaseUrl}/blockSearch`, {
                    params: {
                        query: hash
                    }
                });

                if (res && res.data && res.data.Block) {
                    console.log("Transaction data:", res.data);

                    // 清空transactionResult避免数据重复
                    this.transactionResult = {};

                    // 查询结果推入transactionResult数组，展示区块的基本信息
                    for (let i = 0; i < this.transactions_detail_title.length; i++) {
                        let title = this.transactions_detail_title[i];
                        this.$set(this.transactionResult, title, res.data.Block[title] ? res.data.Block[title].toString() : ''); 
                    }

                    // 展示ExtraData字段，确保它是JSON格式
                    this.$set(this.transactionResult, 'ExtraData', res.data.Block['ExtraData'] ? res.data.Block['ExtraData'] : {});

                    // 将Transactions字段数据加入到transactionResult中，如果存在交易
                    if (res.data.Transactions && res.data.Transactions.length) {
                        this.$set(this.transactionResult, 'Transactions', res.data.Transactions);
                    } else {
                        this.$set(this.transactionResult, 'Transactions', []);
                    }

                } else {
                    console.error('Unexpected response structure:', res);
                }
            } catch (error) {
                console.error('Error fetching transaction data:', error);
            }

            return true;
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
    color: #c64500;
    text-align: justify;
}

.page-titile {
    position: relative;
    left: 14%;
    top: -20%;
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
    color: #ff5900;
}

.home-navbar-menu li a:hover {
    color: #ff5900;
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

.details-button{
    position: relative;
    margin-top: 10px;
    margin-bottom: -5px;
    left: 48%;
    background-color: rgba(255, 255, 255, 0.216);
    /* 设置为半透明 */
    color: #4d3535;
    border: 1px solid #4d3535;
    /* 添加2px的边框，颜色与原背景色一致 */
    padding: 12px 18px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

.details-button:hover {
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

/* .home-card-container {
    margin-top: 80px;
    height: auto;
} */

.home-card-container {
    position: relative;
    left: 5%;
    margin-top: 100px;
    height: auto;
    padding: 0;
    /* 移除任何内边距 */
    width: 90%;
    /* 确保容器宽度为100% */
    box-sizing: border-box;
    /* 确保padding和border包含在宽度内 */
}

.home-card-img {
    width: 100%;
    /* 图片宽度填充整个容器 */
    height: 100%;
    /* 图片高度填充整个容器 */
    object-fit: cover;
    /* 保持图片比例，同时填充整个容器 */
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
    display: inline-block;
    /* 使标题与搜索框在同一行 */
    vertical-align: left;
    /* 垂直对齐 */
    color: aliceblue;
}

.chain-search-container {
    width: 100%;
    max-width: 600px;
    margin: 0px auto;
    position: relative;
    right: 5%;
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
    background-color: #f4bc80;
    color: #ffffff94;
}

.block-result-card {
    color: #333;
    font-size: 1em;
    max-width: 80%;
    margin-bottom: 50px;
    background-color: #ffffffdc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    width: 80%;
    align-self: center;
    height:fit-content; /* 添加这行，确保卡片高度自适应内容 */
}

.block-result-card-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2 {
    color: #333;
    margin-top: 1%;
    margin-bottom: 0%;
}

.block-result-card {
    color: #333;
    font-size: 1em;
    max-width: 80%;
    margin-bottom: 50px;
    background-color: #ffffffdc;
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
    padding: 50px;
}

.result-card-context {
    text-align: left;
    padding-left: 30px;
    padding-right: 30px;
    overflow-wrap: break-word; /* 处理长词换行 */
    word-wrap: break-word; /* 处理长词换行 */
    white-space: normal; /* 正常换行 */
    overflow: visible; /* 允许超出内容正常显示 */
}

.transaction-Tx-link {
    color: rgb(209, 100, 37);
}

.transaction-Tx-link:hover {
    cursor: pointer;
}

.disabled {
    pointer-events: none;
    opacity: 0.5;
}

.back-arrow {
    position: absolute;
    top: 25px; /* 调整箭头的顶部间距 */
    left: 20px; /* 调整箭头的左侧间距，靠近区块详情 */
    cursor: pointer;
    color: rgb(118, 93, 93);
    font-size: 16px;
    z-index: 10000;
    transition: color 0.3s ease;
}

.back-arrow:hover {
    color: rgb(209, 100, 37);
}
</style>
