<template>
<div class="container">

    <div class="content">
        <div class="profile-titile">
            <h2>Profile</h2>
        </div>
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
                        <li class="intro-item"><a href="#/blockBrowse">区块浏览器</a></li>
                        <li class="explore-item">
                            <a href="#/exhibitWorks" :class="{ disabled: !$store.state.isAccountMatched }">交易市场</a>
                        </li>
                        <li class="upload-item">
                            <a href="#/uploadWorks" :class="{ disabled: !$store.state.isAccountMatched }">凭证上传</a>
                        </li>
                        <li class="records-item">
                            <a href="#/recordWorks" :class="{ disabled: !$store.state.isAccountMatched }">我的凭证</a>
                        </li>
                        <li class="home-item active"><a>个人中心</a></li>
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
        <transition name="el-fade-in-linear">
            <div class="sidebar-wallet-container" v-show="show">
                <div class="sidebar">
                    <img :src="this.user.avatar" alt="未成功加载头像" class="avatar">
                    <!-- <img v-else alt="未成功加载头像" class="avatar"> -->
                    <div class="user-info-container">
                        <div class="user-info">
                            <p>用户ID: <span>{{ user.account }}</span></p>
                            <p>公司名称: <span>{{ user.name }}</span></p>
                            <p>描述: <span>{{ user.description }}</span></p>
                            <button class="edit-profile-button" @click="editProfile">修改账号信息</button>
                        </div>
                        <div class="account-info">
                            <p>剩余燃料: <span>{{ user.balance }} ETH</span></p>
                            <p>邮箱&电话: <span>{{ user.email }} | {{ user.phone }}</span></p>
                            <p>连接到的钱包账户: <span>{{ selectedAccount ? selectedAccount : '未检测到钱包' }}</span></p>
                            <p v-if="!isAccountMatched && selectedAccount" class="warning-message">
                                非所属小账户！请将此账户导入或切换至其他账户
                            </p>
                            <!-- 重要的改动：添加动态类和点击事件 -->
                            <button class="manage-account-button" :class="{ active: isAccountManagementVisible }" @click="toggleAccountManagement">链上账号管理⬇️</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 关键：myAccount.vue的内容合并到这里 -->
        <div v-if="isAccountManagementVisible" class="myAccount-container" style="background-color: #708090;">
            <div class="content" style="height:100vh">
                <div class="myAccount-guideBox">
                    <div class="myAccount-title">链上账号管理</div>
                    <a class="myAccount-howtouse" @click="drawer = true" style="align-self:self-start;">
                        <i class="el-icon-question" style="display:contents;"></i>
                        我该如何使用账户管理？
                    </a>
                </div>
                <div class="myAccount-createAccount">
                    <div style="display: flex; gap: 20px">
                        <div style=" display: flex; flex:1; justify-items: center; align-items:center; gap:15px;">
                            <span> 账户名称: </span>
                            <el-input size="medium" v-model="name" placeholder="请输入账户名称" style="width:400px" maxlength="12" minlength="1" show-word-limit></el-input>
                        </div>
                        <div style=" display: flex; flex:1; justify-items: center; align-items:center; gap:15px;">
                            <span> 账户地址: </span>
                            <el-input size="medium" v-model="address" placeholder="请输入账户地址" style="width:400px"></el-input>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <el-button type="primary" class="create-accountBT" size="small" style="align-self: self-end;" @click="addSmallAccount"> 导入账户</el-button>
                    </div>
                </div>
                <div class="myAccount-accountList">
                    <div style="align-self:self-start;">小账户列表</div>
                    <div>
                        <el-table :key="listData.length" :data="filteredListData" style="width:100%">
                            <el-table-column prop="name" label="账户名称" width="400"></el-table-column>
                            <el-table-column prop="address" label="账户地址" width="500"></el-table-column>
                            <el-table-column :align="'right'">
                                <template #header>
                                    <el-input v-model="search" size="mini" placeholder="输入名称关键字搜索" />
                                </template>
                                <template #default="scope">
                                    <el-button size="mini" class="delete-accountBT" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <el-drawer size="40%" :visible.sync="drawer" :with-header="false">
                <div style="font-size:22px; font-weight:bold; color:black; margin-top:20px;">我该如何使用链账户管理?</div>
                <div style="margin:20px">
                    <div style="display:flex; flex-direction: column; align-items: flex-start; gap:10px;">
                        <div style="font-weight:bold">一、下载MetaMask插件并注册账号 </div>
                        <div style="font-weight:bold">二、连接SSENFT区块链网络 </div>
                        <div style="font-weight:bold">三、导入MetaMask账户</div>
                        <div style="font-weight:bold">四、常见问题</div>
                    </div>
                    <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 一、下载MetaMask插件并注册账号 </div>
                    <br />
                    <div style="text-align: start">&emsp;&emsp;MetaMask是一款常用的以太坊钱包插件，以Edge为例演示下载流程：</div>
                    <br />
                    <div style="text-align: start; font-weight: bold">1. 在浏览器拓展市场下载安装MetaMask。</div>
                    <div>
                        <el-image :src="require('@/assets/account1.png') "></el-image>
                    </div>
                    <br />
                    <div style="text-align: start; font-weight: bold">2. 以第一次使用为例，点击“创建新钱包”。</div>
                    <div>
                        <el-image :src="require('@/assets/account2.png') "></el-image>
                    </div>
                    <br />
                    <div style="text-align: start; font-weight: bold">3. 根据引导完成注册流程。</div>
                    <br />
                    <div style="text-align: start; font-weight: bold">4. 注册完毕后，进入个人主页。</div>
                    <div>
                        <el-image :src="require('@/assets/account3.png') "></el-image>
                    </div>
                    <br />

                    <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 二、连接SSENFT区块链网络 </div>
                    <br />
                    <div style="text-align: start">&emsp;&emsp;MetaMask首次注册后默认连接以太坊公链。根据项目需求，需要更换至SSENFT区块链网络。</div>
                    <br />
                    <div style="text-align: start; font-weight: bold">1. 进入网络设置界面，流程如下：</div>
                    <div>
                        <el-image :src="require('@/assets/account4.png') "></el-image>
                    </div>
                    <div>
                        <el-image :src="require('@/assets/account5.png') "></el-image>
                    </div>
                    <div>
                        <el-image :src="require('@/assets/account6.png') "></el-image>
                    </div>
                    <br />
                    <div style="text-align: start; font-weight: bold">2. 输入网络配置：</div>
                    <br />
                    <div style="text-align: start; font-weight: bold"> &emsp;&emsp;网络名称（建议）：SSENFT</div>
                    <div style="text-align: start; font-weight: bold"> &emsp;&emsp;新的 RPC URL：http://8.134.209.144:18545</div>
                    <div style="text-align: start; font-weight: bold"> &emsp;&emsp;链ID： 12346</div>
                    <div style="text-align: start; font-weight: bold"> &emsp;&emsp;货币符号：eth</div>
                    <br />
                    <div>
                        <el-image :src="require('@/assets/account7.png') "></el-image>
                    </div>
                    <div style="text-align: start;"> 确保填入信息无误后，点击保存并切换至该网络。</div>
                    <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 三、导入MetaMask账户 </div>
                    <br />
                    <div style="text-align: start">&emsp;&emsp;每个MetaMask账户都有唯一的地址。将MetaMask账户地址导入本系统，便于系统定位到账户并进行区块链操作。</div>
                    <br />
                    <div style="text-align: start; font-weight: bold">1. 点击浏览器右上角拼图图标呼出MetaMask，点击账户名：</div>
                    <div>
                        <el-image :src="require('@/assets/account8.png') " size="small" style="width: 300px;"></el-image>
                    </div>
                    <br />
                    <div style="text-align: start; font-weight: bold">2. 进入“账户详情”界面，可以修改账户名和查看完整的账户地址。</div>
                    <div>
                        <el-image :src="require('@/assets/account9.png') " size="small" style="width: 300px;"></el-image>
                    </div>
                    <br />
                    <div style="text-align: start; font-weight: bold">3. 将账户名称和账户地址导入到本系统中。</div>
                    <div style="text-align: start;">&emsp;&emsp;注意：账户名称理论上可以自行指定，但建议与MetaMask上的账户名保持相同。账户地址必须正确无误。</div>
                    <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 四、常见问题 </div>
                    <br />
                    <div style="text-align: start; font-weight: bold">总是提醒“未查询到该账户”怎么办？</div>
                    <div style="text-align: start;">&emsp;&emsp;确保您的地址与MetaMask钱包中的一致。如果仍然无法解决，请检查MetaMask中的账户连接是否正常。</div>
                </div>
            </el-drawer>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedAccount: null,
            isAccountManagementVisible: false, // 控制链账户管理部分的显示
            account: null,
            drawer: false,
            name: '',
            show: false,
            address: '',
            search: '',
            listData: [],
        };
    },
    created() {
        console.log('created avatar load=================>');
        this.account = localStorage.getItem('account');
        console.log('account' + this.account)
        // this.loadAvatar();
    },
    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 150)
        this.account = localStorage.getItem('account');
        this.connectWallet();

        this.loadAvatar();
        console.log('account', this.account)
        this.getAccountList();
    },
    computed: {
        user() {
            const user = this.$store.state.user;
            console.log(user);
            return user;
        },
        filteredListData() {
            return this.listData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
        },
        isAccountMatched() {
            if (!this.selectedAccount || !this.listData) return false;
            return this.listData.some(item => item.address.toLowerCase() === this.selectedAccount.toLowerCase());
        },
    },
    methods: {
        logOut() {
            console.log('登出');
            this.selectedAccount = null; // 注销时清空选中的钱包地址
            this.$store.dispatch('logout');
            console.log(this.$route.path)
            if (this.$route.path !== '/intro') {
                setTimeout(() => {
                  this.$router.push('/intro');
                }, 100);
            }
        },
        editProfile() {
            setTimeout(() => {
                this.$router.push('/editProfile');
            }, 100);
        },
        // 切换链账户管理部分的显示状态
        toggleAccountManagement() {
            this.getAccountList();
            this.isAccountManagementVisible = !this.isAccountManagementVisible;
        },
        loadAvatar() {
            const account = this.user.account;
            if (!account) {
                console.error('账号信息不完整。');
                return;
            }

            const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
            axios.get(`${apiBaseUrl}/loadAvatar`, {
                    params: {
                        account
                    }
                })
                .then(res => {
                    console.log('res.data' + res.data);
                    console.log('res.data.avatarUrl:::' + res.data.avatarUrl)
                    if (res.data && res.data.avatarUrl) {
                        this.$store.commit('setUserAvatar', res.data.avatarUrl);
                        localStorage.setItem(`avatar_${account}`, res.data.avatarUrl);
                        this.$forceUpdate();
                    }
                })
                .catch(error => {
                    console.error('Error loading avatar:', error);
                    // 检查是否存在响应对象，并判断状态码
                    if (error.response && error.response.status === 401) {
                        this.logOut();
                    } else {
                        console.error('Error loading avatar:', error); // 处理其他错误
                    }
                });
        },
        async getAccountList() {
            const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;

            try {
                let res = await axios.get(`${apiBaseUrl}/getSmallAccount`, {
                    params: {
                        account: this.user.account
                    }
                });

                if (res.data && res.data.status === "查询成功" && res.data.addresses) {
                    this.listData = res.data.addresses.map(item => {
                        // 如果 address 属性不存在，给它一个默认值
                        return {
                            ...item,
                            addresses: item.address || 'null'
                        };
                    });
                    this.checkAccountMatch(); // 在数据获取后检查账户匹配
                } else {
                    console.log("数据状态错误或地址为空");
                }

            } catch (error) {
                console.log('请求出错:', error);
                // 检查是否是 401 错误，并处理
                if (error.response && error.response.status === 401) {
                    this.logOut();
                } else {
                    console.log('Error loading avatar:', error);
                }
            }
        },
        handleDelete(index, row) {
            this.$confirm('是否移除该账户？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
                axios.post(`${apiBaseUrl}/removeAddress`, row).then(res => {
                    console.log(res);
                    if (res.data.code == '200') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.listData.splice(index, 1);
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败'
                        });
                    }
                }).catch(error => {
                    console.error('Error:', error);
                    this.$message({
                        type: 'error',
                        message: '操作失败，请检查控制台以获取更多信息'
                    });
                })
            }).catch(() => {
                console.log('用户取消了删除操作');
            });
            console.log(index, row);
        },
        async addSmallAccount() {
            // 1. 校验账户名和地址
            if (this.name === '') {
                this.$message.warning('账户名不得为空');
                return;
            } else if (this.address === '') {
                this.$message.warning('账户地址不得为空');
                return;
            }

            try {
                const addressList = await window.ethereum.request({
                    method: 'eth_accounts',
                    params: [],
                });

                console.log('addressList', addressList);
                if (!Array.isArray(addressList) || !addressList.includes(this.address.toLowerCase())) {
                    this.$message.warning('未查找到该账户地址');
                    return;
                }

                const data = {
                    account: this.account,
                    address: this.address,
                    name: this.name,
                };
                console.log('asds', data)
                axios.post('http://8.134.209.144:28888/api/addSmallAccount', data).then(response => {
                    console.log('response', response)
                    if (response.data.code === 200) {
                        this.$message.success('导入成功');
                        this.listData.push({
                            name: this.name,
                            address: this.address
                        });
                        // this.getAccountList();
                    } else {
                        this.$message.error(response.data.status);
                    }
                });

            } catch (error) {
                console.error('Error:', error);
                this.$message.error('操作失败，请检查控制台以获取更多信息');
            }
        },
        async connectWallet() {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    // 请求用户连接 MetaMask 钱包
                    const accounts = await window.ethereum.request({
                        method: 'eth_requestAccounts'
                    });
                    this.selectedAccount = accounts[0]; // 获取第一个钱包地址
                    this.checkAccountMatch(); // 检查账户是否匹配
                    console.log('当前连接的 MetaMask 账号:', accounts[0]);

                    // 添加账户变更事件监听器
                    window.ethereum.on('accountsChanged', (accounts) => {
                        if (accounts.length === 0) {
                            // 用户已注销
                            console.log('用户已注销');
                            this.selectedAccount = null;
                        } else {
                            this.selectedAccount = accounts[0];
                            console.log('MetaMask 账号已更改:', accounts[0]);
                        }
                        this.checkAccountMatch(); // 检查账户是否匹配
                    });
                } catch (error) {
                    console.error('连接钱包失败:', error);
                }
            } else {
                console.error('MetaMask 未检测到');
                alert('请安装 MetaMask 钱包');
            }
        },
        checkAccountMatch() {
            const matched = this.isAccountMatched;
            this.$store.commit('setAccountMatched', matched);
        },
    },
    watch: {
        selectedAccount() {
            this.checkAccountMatch();
        },
        listData() {
            this.checkAccountMatch();
        },
    },

};
</script>

<style scoped>
/* 重置一些默认样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* max-height: 200%; */
}

/* 容器样式 */
.container {
    width: 100%;

    max-height: 100%;
}

/* 内容样式 */
.content {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;

    /* max-height: 200%; */
}

.manage-account-button.active {
    background-color: #f3a479;
    border-color: #f3a479;
    color: #ffffff;
}

.profile-titile {
    position: relative;
    left: -550px;
    top: 75px;
    z-index: 00;
    /* 设置一个较高的 z-index 使其在页面顶层 */
}

h2 {
    position: relative;
    left: 2%;
    font-size: 6em;
    color: #c64500;
    text-align: center;
}

h3 {
    font-size: 1.3em;
    color: #c64500;
    text-align: center;
}

h4 {
    position: absolute;
    left: 33%;
    font-size: 2em;
    color: #c64500;
    text-align: left;
}

.page-titile {
    position: absolute;
    left: 14%;
    top: 21px;
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

.home-navbar-profile img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
}

/* 侧边栏和头像样式 */
.sidebar-wallet-container {
    display: flex;
    flex-direction: column;
    align-items: center;

}

.sidebar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 响应式头像 */
.avatar {
    width: 15vw;
    /* 根据需要调整大小 */
    height: 15vw;
    /* 确保宽高相等 */
    max-width: 200px;
    /* 设置最大宽度，防止过大 */
    max-height: 200px;
    border-radius: 50%;
    /* 使其为正圆形 */
    object-fit: cover;
    /* 确保图片按比例填充容器 */
    overflow: auto;
    background-color: transparent;
    text-align: center;
    /* 使alt文字水平居中 */
    line-height: 150px;
    /* 调整这个值以改变alt文字的垂直位置 */
    border: 0.8px solid #ffffffb0;
    /* 3像素宽的蓝色描边 */
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 图片按比例填充容器 */
}

/* 用户信息容器 */
.user-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
}

/* 用户信息样式 */
.user-info,
.account-info {
    width: 80%;
    max-width: 600px;
    margin: 10px 0;
    text-align: center;
    color: #ffffffb0;
}

.user-info p,
.account-info p {
    margin: 10px 0;
}

.user-info p span,
.account-info p span {
    color: #ff741d;
    font-style: italic;
    font-size: 1em;
}

/* 按钮样式 */
.edit-profile-button,
.manage-account-button {
    background-color: rgba(255, 255, 255, 0.303);
    color: #ffffffb0;
    font-weight: 700;
    border: 1px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    margin-top: 10px;
    width: 80%;
    max-width: 400px;
    height: 50px;
    text-align: center;
}

.edit-profile-button:hover,
.manage-account-button:hover {
    background-color: #ff5900;
    border-color: #ff5900;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .avatar {
        width: 25vw;
        height: 25vw;
    }

    .edit-profile-button,
    .manage-account-button {
        width: 90%;
    }

    .user-info,
    .account-info {
        width: 90%;
    }
}

.myAccount-container {
    position: relative;
    background-color: #ffffff5b;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    min-height: 95vh;
    min-width: 95vw;
    /* background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 80%); */
    background-image: linear-gradient(to top, #333 0%, rgb(47, 43, 43) 100%);
    ;

}

.myAccount-guideBox {
    margin-top: 50px;
    margin-left: 50px;
    color: #ff5900;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.myAccount-title {
    flex: 1;
    align-self: flex-start;
    color: rgb(229, 223, 223);
    font-weight: bold;
    font-size: 2em;
}

.myAccount-createAccount {
    padding: 30px;
    margin-left: 50px;
    margin-top: 30px;
    width: 90%;
    /*侧边栏删除记得改*/
    height: 140px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    display: flex;
    gap: 20px;
    flex-direction: column;
}

.myAccount-accountList {
    padding: 30px;
    margin-left: 50px;
    margin-top: 30px;
    width: 90%;
    /*侧边栏删除记得改*/
    /* height: 140px; */
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    display: flex;
    gap: 20px;
    flex-direction: column;
}

.create-accountBT {
    background-color: rgba(255, 255, 255, 0.6);
    /* 设置为半透明 */
    color: #4d3535;
    border: 1px solid #4d3535;
    /* 添加2px的边框，颜色与原背景色一致 */
    padding: 10px 10px;
    border-radius: 10px;
    /* 设置圆角 */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    /* 添加边框颜色过渡 */
    margin-right: 10px;
    /* 增加一个右边距 */
}

.create-accountBT:hover {
    background-color: #af4949;
    /* 设置为半透明 */
    color: #ffffff;
    border: 1px solid #af4949;
    /* 添加2px的边框，颜色与原背景色一致 */
    padding: 10px 10px;
    border-radius: 10px;
    /* 设置圆角 */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    /* 添加边框颜色过渡 */
    margin-right: 10px;
    /* 增加一个右边距 */
}

.delete-accountBT {
    background-color: rgba(255, 255, 255, 0.6);
    /* 设置为半透明 */
    color: #4d3535;
    border: 1px solid #4d3535;
    /* 添加2px的边框，颜色与原背景色一致 */
    padding: 5px 5px;
    border-radius: 10px;
    /* 设置圆角 */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    /* 添加边框颜色过渡 */
    margin-right: 10px;
    /* 增加一个右边距 */
}

.delete-accountBT:hover {
    background-color: rgba(255, 255, 255, 0.6);
    /* 设置为半透明 */
    color: #f63900;
    border: 1px solid #4d3535;
    /* 添加2px的边框，颜色与原背景色一致 */
    padding: 5px 5px;
    border-radius: 10px;
    /* 设置圆角 */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    /* 添加边框颜色过渡 */
    margin-right: 10px;
    /* 增加一个右边距 */
}

.myAccount-howtouse {
    color: #fff5d7;
}

.disabled {
    pointer-events: none;
    opacity: 0.5;
}

.warning-message {
    color: #f63900;
}
</style>
