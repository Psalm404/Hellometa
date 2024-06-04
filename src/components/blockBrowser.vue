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
                <div v-for="(item, index) in searchResult" :key="index" class="block-result-card">
                    <h1>查询结果</h1>
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
                                        <p class="transaction-Tx-link" @click="drawer = true">transactionsRoot: {{
                                            item['transactionsRoot'] }}
                                        </p>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </div>
                    </div>
                </div>
                <el-drawer title="交易详情" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
                    <div class="copy-container">
                        <pre id="copy-text" class="copy-text">这是一个可以复制的文本示例。</pre>
                        <span class="copy-icon" @click="copyToClipboard">📋</span>
                    </div>
                </el-drawer>
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
        this.searchData = this.$route.query.bkSearchQuery;
        this.blockSearch();
        this.activeNames = Array.from({ length: 100 }, (_, index) => index);
    },
    created() {
        this.blockSearch = debounce(this.blockSearch, 300)
    },
    data() {
        return {
            navSearchQuery: '',
            searchData: [],
            activeNames: [],
            drawer: false,
            searchResult: [],
            blockTitle: [
                'baseFeePerGas', 'difficulty', 'extraData', 'gasLimit', 'gasUsed',
                'hash', 'logsBloom', 'miner', 'mixHash', 'nonce', 'number', 'parentHash',
                'receiptsRoot', 'sha3Uncles', 'size', 'stateRoot', 'timestamp',
                'totalDifficulty', 'transactions', 'transactionsRoot', 'uncles'
            ],
            transactions_detail_title: [],
        }
    },
    methods: {
        navSearch() { },
        connWallet() { },
        blockSearch() {
            if (this.searchData === '') {
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
                if (this.searchByUrl(this.searchData)) {
                    console.log('searchByUrl')
                }
                else if (this.searchByTokenId(this.searchData)) {
                    console.log('searchByTokenId')
                }
                else this.searchByTH(this.searchData)
            }
            this.$nextTick(() => {
                // DOM更新后执行的操作
                console.log('DOM已更新');
            });
            this.searchData = ''
        },
        async searchByUrl(url) {
            let hastTx = await getTransactionHash(url);
            if (hastTx === null) return false;

            let res = await getTransaction(hastTx);

            // 后续处理
            alert(res)

            return true;
        },
        async searchByTokenId(tokenId) {
            let url = await getURLbyTokenId(tokenId)
            return this.searchByUrl(url)
        },
        async searchByTH(hash) {
            let res = await getTransaction(hash)
            if (res === 'error') return false;

            // 后续处理
            alert(res)
            return true
        },
        handleChange(val) {
            console.log(val);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done();
                })
                .catch(() => { });
        },
        displayTransaction() {
            alert("clicked")
        },
        copyToClipboard() {
            const copyText = this.$refs.copyText;

            // 创建一个隐藏的文本域
            const textArea = document.createElement("textarea");
            textArea.value = copyText.textContent;
            document.body.appendChild(textArea);

            // 选择文本域内容
            textArea.select();
            textArea.setSelectionRange(0, 99999); // 适用于移动设备

            // 复制文本到剪贴板
            document.execCommand("copy");

            // 移除临时文本域
            document.body.removeChild(textArea);

            // 可选：提示用户已复制
            alert("文本已复制到剪贴板！");
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

.block-result-card {
    margin-bottom: 50px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* overflow: hidden; */
    transition: transform 0.3s;
    width: 80%;
    align-self: center
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

.copy-container {
    position: relative;
    display: inline-block;
    margin: 20px;
}

.copy-text {
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    user-select: all;
    /* 允许用户选择文本 */
}

.copy-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.3s;
}

.copy-icon:hover {
    opacity: 1;
}
</style>