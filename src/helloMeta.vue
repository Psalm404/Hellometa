<template>
<div id="app">
    <div :class="{ 'guide-text-hidden':show  }" class="guide-text" :style="{ color: textColor }">{{ guideText }}
    </div>
    <transition name="el-fade-in-linear">
        <div v-show="show" class="main-page">
            <div class="side-navigator">
                <div class='index-list'>
                    <div class="navi-home" :class="{ 'active': activeButton === 'home' }">
                        <button @click="select('home')"> 主页 </button>
                    </div>
                    <div class='navi-exhibit' :class="{ 'active': activeButton === 'exhibit' }">
                        <button @click="select('exhibit') "> 交易市场 </button>
                    </div>
                    <div class='navi-uplord' :class="{ 'active': activeButton === 'upload' }">
                        <button @click="select('upload')"> 上传我的凭证 </button>
                    </div>
                    <div class='navi-record' :class="{ 'active': activeButton === 'record' }">
                        <button @click="select('record')"> 我的凭证记录 </button>
                    </div>
                    <div class='navi-login' :class="{ 'active': activeButton === 'login' }" style = "position:absolute; bottom:30px; left:55px;">
                        <a @click="select('login')"> 登录 </a>
                    </div>
                </div>
            </div>
            <div>
                <router-view>

                </router-view>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import {
    getAccountAddr
} from './commons/getAccountAddr';
import getRecentBlocks from '@/commons/getRecentBlocks';
export default {
    name: 'HellometaComponent',
    data() {
        return {
            account: '',
            guideText: '',
            textColor: 'transparent',
            hidden: false,
            activeButton: '',
        };
    },
    mounted() {
        if (window.ethereum) {
            this.guideText = '请连接到 MetaMask';
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.guideText = '连接中断';
                } else {
                    this.account = accounts[0];
                    this.guideText = '已连接到MetaMask账户';
                    setTimeout(() => {
                        this.textColor = 'transparent';
                        this.show = true;
                        this.hidden = true;
                    }, 0);
                }
            });
            getAccountAddr().then(address => {
                if (address === 'error') {
                    this.guideText = '连接中断';
                } else {
                    this.account = address;
                    this.guideText = `已连接到MetaMask账户`;
                    setTimeout(() => {
                        this.textColor = 'transparent';
                        this.show = true;
                        this.hidden = true;
                    }, 0);

                    // 调用 getBlocks 函数获取区块信息
                    getRecentBlocks().then(blocks => {
                        console.log("Received blocks:", blocks);
                        // 在此处处理 blocks 数组
                    }).catch(error => {
                        console.error("Error fetching blocks:", error);
                    });
                }
            }).catch(error => {
                console.error('发生错误：', error);
            });

        } else {
            this.guideText = '未检测到钱包，请先下载';
        }
        setTimeout(() => {
            this.textColor = '#FF5733';
        }, 100);
    },
    methods: {
        select(index) {
            var targetRoute;
            console.log(index)
            this.activeButton = index;
            if (index === 'upload') {
                targetRoute = '/uploadWorks';
            } else if (index === 'record') {
                targetRoute = '/recordWorks';
            } else if (index === 'exhibit') {
                targetRoute = '/exhibitWorks';
            } else if (index === 'home') {
                targetRoute = '/home'
            } else if (index == 'login'){
                targetRoute = '/login'
            }
            if (targetRoute && this.$route.path !== targetRoute)
                this.$router.push(targetRoute);
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    text-align: center;
    background-color: #292929;
}

.guide-text {
    padding-top: 40vh;
    font-size: 3em;
    transition: color 0.5s ease;
    text-align: center
}

.guide-text-hidden {
    display: none;
}

.main-page {
    min-height: 100vh;
    display: flex;
}

.side-navigator {
    background-color: #202020;
    width: 10%;
    height: 100vh;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
}

.index-list {
    margin-top: 150px;
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: 35px;
}

.index-list button {
    background-color: transparent;
    border: 1px solid rgba(170, 170, 170, 1);
    height: 35px;
    line-height: 13px;
    padding: 10px 20px;
    text-align: center;
    color: rgba(170, 170, 170, 1);
    border-radius: 5px;
    cursor: pointer;
}

.index-list button:hover {
    color: #ff5733;
    border-color: #ff5733;
}

.active button {
    color: #ff5733;
    border-color: #ff5733;
}
</style>
