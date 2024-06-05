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
                    <el-page-header @back="goBack" content="区块浏览器">
                    </el-page-header>
                    <img src="../assets/logo.png" class="block-browser-logo">
                    <h1 style="color: rgb(26,115,232)">交易详情</h1>
                </div>
                <div class="transaction-detail-description">
                    <el-descriptions title="区块信息" column="2" class="transaction-detail-title">
                        <el-descriptions-item label="accessList">{{ transactionDetail[0] }}</el-descriptions-item>
                        <el-descriptions-item label="blockHash">{{ transactionDetail[1] }}</el-descriptions-item>
                        <el-descriptions-item label="blockNumber">{{ transactionDetail[2] }}</el-descriptions-item>
                        <el-descriptions-item label="chainId">{{ transactionDetail[3] }}</el-descriptions-item>
                        <el-descriptions-item label="nonce">
                            <el-tag size="small">{{ transactionDetail[12] }}</el-tag>
                        </el-descriptions-item>
                    </el-descriptions>
                    <br>
                </div>
                <div class="transaction-detail-container">
                    <h2>详细信息</h2>
                    <pre id="transaction-detail-infoText">
                        <p v-for="(item, index) in transactionDetail_title" :key="index" 
                        class="transaction-detail-para">{{ item }}: {{ transactionDetail[index] }}</p>
                    </pre>
                    <button @click="copyToClipboard">复制全部信息</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import getTransaction from '@/commons/getTransaction';
export default {
    mounted() {
        this.transactionHash = this.$route.query.hash;
        console.log(this.transactionHash)
        if (this.transactionHash === '') {
            this.show = false;
        }
        else {
            this.show = true;
            this.searchDetails();
        }
    },
    data() {
        return {
            show: true,
            navSearchQuery: '',
            transactionHash: '',
            transactionDetail: [],
            transactionDetail_title: [
                'accessList', 'blockHash', 'blockNumber', 'chainId',
                'data', 'from', 'gas', 'gasPrice', 'hash', 'input', 'maxFeePerGas',
                'maxPriorityFeePerGas', 'nonce', 'r', 's', 'to', 'transactionIndex', 'type',
                'v', 'value'
            ]
        }
    },
    methods: {
        navSearch() { },
        connWallet() { },
        goBack() {
            this.$router.back();
        },
        searchDetails() {
            getTransaction(this.transactionHash).then((result) => {
                console.log(result)
                for (let i = 0; i < this.transactionDetail_title.length; i++) {
                    this.transactionDetail.push(result[this.transactionDetail_title[i]]);
                }
                console.log(this.transactionDetail)
            }).catch((err) => {
                console.error(err)
            });
        },
        copyToClipboard() {
            var copyText = document.getElementById("transaction-detail-infoText");
            var range = document.createRange();
            range.selectNode(copyText);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? '成功' : '失败';
                alert('复制' + msg);
            } catch (err) {
                alert('复制失败');
            }

            window.getSelection().removeAllRanges();
        }
    }
}
</script>

<style>
.el-page-header {
    color: #fff;
    font-size: 20px;
}

.transaction-detail-description {
    align-self: center;
    width: 80%;
    background-color: rgb(41, 41, 41);
}

.el-descriptions {
    color: #fff;
    background-color: rgb(41, 41, 41);
}

.el-descriptions-item {
    background-color: rgb(41, 41, 41);
}

.transaction-detail-container {
    align-self: center;
    text-align: center;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 800px;
}

.transaction-detail-container pre {
    text-align: left;
    background-color: #f8f8f8;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-top: 20px;
}

.transaction-detail-container button {
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.transaction-detail-container button:hover {
    background-color: #0056b3;
}

.transaction-detail-para {
    padding: 5px;
}
</style>