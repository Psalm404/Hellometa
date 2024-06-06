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

<style>
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