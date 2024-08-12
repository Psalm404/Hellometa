<template>
<div id="app">
    <div :class="{ 'guide-text-hidden': show }" class="guide-text" :style="{ color: textColor }">{{ guideText }}
    </div>
    <transition name="el-fade-in-linear">
        <div v-show="show" class="main-page">
            <div class="side-navigator">
                <div class='index-list'>
                    <div class="navi-home" :class="{ 'active': activeButton === 'home' }">
                        <button @click="select('home')"> 主页 </button>
                    </div>
                    <div class='navi-exhibit' :class="{ 'active': activeButton === 'exhibit' }">
                        <button @click="select('exhibit') " > 数据资产凭证展示</button>
                    </div>
                    <div class='navi-uplord' :class="{ 'active': activeButton === 'upload' }">
                        <button @click="select('upload')" > 上传你的凭证 </button>
                    </div>
                    <div class='navi-record' :class="{ 'active': activeButton === 'record' }">
                        <button @click="select('record')" > 你的凭证记录 </button>
                    </div>
                </div>
            </div>
            <div >
                <router-view>

                </router-view>
            </div>
            <!-- login -->
            <div v-if="!isLoggedIn" class="login-modal" id="login">
                <div class="login-form">
                    <div class="login-close" @click="showAlert">×</div>
                    <h3>登录</h3>
                    <input type="text" v-model="username" placeholder="账号">
                    <input type="password" v-model="password" placeholder="密码">
                    <button @click="login">Login</button>
                </div>
            </div>
            <!-- login -->
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
            isLoggedIn: document.cookie.includes('loggedIn=true'),
            username: '',
            password: '',
            //origin
            account: '',
            guideText: '',
            textColor: 'transparent',
            show: false,
            activeButton: '',
        };
    },
    mounted() {
        this.checkLogin();
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
                    }, 0);
                }
            });
            getAccountAddr().then(address => {
                if (address === 'error') {
                    this.guideText = '连接中断';
                } else {
                    this.account = address;
                    this.guideText = `已连接到MetaMask账户`+address;
                    console.log(this.guideText);
                    setTimeout(() => {
                        this.textColor = 'transparent';
                        this.show = true;
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
        checkLogin() {
            // 检查cookie中是否有登录信息
            // 如果没有，保持isLoggedIn为false
            if (document.cookie.includes('loggedIn=true')) {
                this.isLoggedIn = true;
            }
        },
        login() {
            if (this.username === 'a123' && this.password === '123') {
                this.isLoggedIn = true;
                document.cookie = 'loggedIn=true'; // 设置cookie
                // window.location.reload(); // 刷新页面
            } else {
                alert('账号或密码错误');
            }
        },
        showAlert() {
            alert('未登录不可使用该功能');
        },
        //origin
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

/* 添加登录表单和蒙版样式 */
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.login-form {
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  width: 300px;
  text-align: center;
  position: relative;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.login-form button:hover {
  background-color: #155ab3;
}

.login-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
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
  z-index:100;
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
