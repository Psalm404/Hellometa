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
                            <!-- <div class="home-search-icon">
                                <input type="text" class="home-search-input" v-model="navSearchQuery"
                                    @keyup.enter="navSearch" placeholder="Search...">
                            </div> -->
                        </div>
                        <div>
                            <!-- <button class="home-navbar-button" @click="connWallet">Connect Wallet</button> -->
                        </div>
                        <div class="home-navbar-profile">
                            <a href="https://github.com/Psalm404/Hellometa" target="_blank">
                                <img src="../assets/github.jpg" alt="Join us">
                            </a>
                        </div>
                    </div>
                </nav>
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
                        <h2>区块{{ index }}</h2>
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
                                                transactionsRoot: {{
                                                    item['transactionsRoot'] }}
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
                                <!-- <div v-for="(item, index) in transactionResult" :key="index" class="result-card-context">
                                    <p v-for="(item, index) in transactionResult" :key="index">{{ index }}: {{ item }}</p>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>

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
    mounted() {
        this.searchData = this.$route.query.bkSearchQuery.toString();
        this.activeNames = Array.from({ length: 100 }, (_, index) => index);
        this.blockSearch();
    },
    created() {
        this.blockSearch = debounce(this.blockSearch, 300)
    },
    data() {
        return {
            show: true,
            navSearchQuery: '',
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

        }
    },
    methods: {
        navSearch() { },
        connWallet() {
            alert("connWallet button clicked")
        },
        blockSearch() {
            if (this.searchData === '') {
                this.show = true;
                console.log('search for all')
                getRecentBlocks().then(blocks => {
                    for (let i = 0; i < blocks.length; i++) {
                        let tmp = {}
                        for (let j = 0; j < this.blockTitle.length; j++) {
                            tmp[this.blockTitle[j]] = blocks[i]['block'][this.blockTitle[j]]
                            if (tmp[this.blockTitle[j]] != null) {
                                tmp[this.blockTitle[j]] = tmp[this.blockTitle[j]].toString();
                            }
                        }
                        this.searchResult.push(tmp)
                    }
                }).catch(error => {
                    console.error("Error fetching blocks:", error);
                });
            }
            else {
                this.show = false;
                if (this.searchData.startsWith('0x')) {
                    console.log('search by hashText')
                    this.searchByTH(this.searchData)
                } else if (this.searchData.startsWith('http')) {
                    console.log('search by url')
                    this.searchByUrl(this.searchData)
                } else {
                    console.log('search by token id')
                    this.searchByTokenId(this.searchData)
                }
            }
            this.$nextTick(() => {
                // DOM更新后执行的操作
                console.log('DOM已更新');
            });
            this.searchData = ''
        },
        async searchByUrl(url) {
            let hashTx = await getTransactionHash(url);
            if (hashTx === null) return false;
            // 后续处理
            return this.searchByTH(hashTx);
        },
        async searchByTokenId(tokenId) {
            let url = await getURLbyTokenId(tokenId)
            return this.searchByUrl(url)
        },
        async searchByTH(hash) {
            let res = await getTransaction(hash)
            if (res === 'error') return false;

            // 后续处理
            console.log(this.transactionResult)
            if (this.transactionResult.length > 0) {
                this.transactionResult = []
            }
            console.log(this.transactionResult)
            for (let i = 0; i < this.transactions_detail_title.length; i++) {
                this.transactionResult.push(res[this.transactions_detail_title[i]]);
            }
            console.log(this.transactionResult);
            return true
        },
        showTransactionDetail(index) {
            let tmp = this.searchResult[index]['transactions']
            this.$router.push({
                path: '/blockBrowser/transactionDetail',
                query: { hash: tmp }
            })
        },
        handleChange(val) {
            console.log(val);
        },
    },

}
</script>

<style scoped>
.container {
    margin-left: calc(50% - 50vw); /* 使用calc函数让页面自动紧贴左侧 */
    width: 100vw; /* 确保页面内容宽度占据整个视口宽度 */
    height: 100vw;
}

.sidebar-wallet-container {
    display: flex;
    justify-content: flex-end; /* 使内容靠下排列 */
    align-items: flex-start;
    flex-direction: column; /* 垂直排列 sidebar 和 wallet-accounts */
    margin-top: 100px; /* 确保在 home-navbar 下方 */
    padding: 10px;
}

.profile-titile{
    position: relative;
    left: -550px;
    top: 75px;
    z-index: 00; /* 设置一个较高的 z-index 使其在页面顶层 */
}

h2 {
    position: relative;
    left: 2%;
    font-size: 6em;
    color:  #c64500;
    text-align: center;
}

h3 {
    font-size: 1.4em;
    color:  #c64500;
    text-align: center;
}

h4 {
    position: absolute;
    left: 33%;
    font-size: 2em;
    color:  #c64500;
    text-align: left;
}

.page-titile {
    position: absolute;
    left: 14%;
    top: 21px;
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
    top: 10px; /* 根据需要调整位置 */
    left: -90px; /* 根据需要调整位置 */
}

/* Browser */
.intro-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -80px; /* 根据需要调整位置 */
}

/* Explore */
.explore-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -70px; /* 根据需要调整位置 */
}

/* Upload */
.upload-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -60px; /* 根据需要调整位置 */
}

/* Records */
.records-item {
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

.block-browser {
    margin-top: 100px;
}

.block-browser-logo {
    width: 360px;
    height: auto;
}

.browser-passage1 {
    font: Poppins;
    color: #ffffff;
    font-size: 30px;
    padding: 25px 0px 30px;
}

.browser-passage2 {
    font: Poppins;
    color: #ffffff;
    font-size: 28px;
    padding: 0px 0px 60px;
}

.block-browser-search-box {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    width: 700px;
    margin: 20px auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
}

.block-browser-search-input {
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
}

.block-browser-search-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.block-browser-search-button:hover {
    background-color: #0056b3;
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
    /* overflow: hidden; */
    transition: transform 0.3s;
    width: 80%;
    align-self: center;
}

.block-result-card:hover {
    transform: translateY(-10px);
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
    color: blue;
}

.transaction-Tx-link:hover {
    cursor: pointer;
}
</style>