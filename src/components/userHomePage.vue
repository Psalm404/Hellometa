<template>
    <div class="container">
        <transition name="el-fade-in-linear">
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
                                <h3>个人主页</h3>
                            </div>
                        </div>
                        <div class="want-to-be-right">
                            <ul class="home-navbar-menu">
                                <li class="recharge-item"><a href="#/myGas">燃料充值</a></li>
                                <li class="intro-item"><a href="#/u_intro">区块浏览器</a></li>
                                <li class="explore-item"><a href="#/exhibitWorks">交易市场</a></li>
                                <li class="upload-item"><a href="#/uploadWorks">凭证上传</a></li>
                                <li class="records-item"><a href="#/recordWorks">我的凭证</a></li>
                            </ul>
                            <div>
                                <button class="home-navbar-button" @click="logOut">Log out</button>
                            </div>                            
                        </div>
                    </div>
                </nav>              
                <div class="sidebar-wallet-container">
                    <div class="sidebar">
                        <img :src="user.avatar" alt="未成功加载头像" class="avatar">
                        <!-- <img v-else alt="未成功加载头像" class="avatar"> -->
                        <div class="user-info-container">
                            <div class="user-info">
                                <p>用户ID: <span>{{ user.account }}</span></p>
                                <p>公司名称: <span>{{ user.name }}</span></p>
                                <p>描述: <span>{{ user.description }}</span></p>
                                <button class="edit-profile-button" @click="editProfile">修改账号信息</button>
                            </div>
                            <div class="account-info">
                                <p>剩余燃料: <span>{{ user.balance }}</span></p>
                                <p>邮箱&电话: <span>{{ user.email }}   |   {{ user.phone }}</span></p>
                                <p>连接到的钱包账户: <span>{{ selectedAccount ? selectedAccount.name : '未检测到钱包' }}</span></p>
                                <!-- 重要的改动：添加动态类和点击事件 -->
                                <button 
                                    class="manage-account-button" 
                                    :class="{ active: isAccountManagementVisible }" 
                                    @click="toggleAccountManagement"
                                >链上账号管理⬇️</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 关键：myAccount.vue的内容合并到这里 -->
                <div v-if="isAccountManagementVisible" class="myAccount-container" style="background-color: #708090;">
                    <div class="content" style="height:100vh">
                        <div class="myAccount-guideBox">
                            <div class="myAccount-title">小账户管理</div>
                            <a class="myAccount-howtouse" @click="drawer = true" style="align-self:self-start;">
                                <i class="el-icon-question" style="display:contents;"></i>
                                我该如何使用账户管理？
                            </a>
                        </div>
                        <div class="myAccount-createAccount">
                            <div style="display: flex; gap: 20px">
                                <div style=" display: flex; flex:1; justify-items: center; align-items:center; gap:15px;">
                                    <span> 账户名称: </span>
                                    <el-input
                                        size="medium"
                                        v-model="name"
                                        placeholder="请输入账户名称"
                                        style="width:400px"
                                        maxlength="12"
                                        minlength="1"
                                        show-word-limit
                                    ></el-input>
                                </div>
                                <div style=" display: flex; flex:1; justify-items: center; align-items:center; gap:15px;">
                                    <span> 账户地址: </span>
                                    <el-input
                                        size="medium"
                                        v-model="address"
                                        placeholder="请输入账户地址"
                                        style="width:400px"
                                    ></el-input>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <el-button type="primary" class="create-accountBT" size="small" style="align-self: self-end;" @click="addSmallAccount"> 导入账户</el-button>
                            </div>
                        </div>
                        <div class="myAccount-accountList">
                            <div style="align-self:self-start;">小账户列表</div>
                            <div>
                                <el-table
                                    :key="listData.length"
                                    :data="filteredListData"
                                    style="width:100%"
                                >
                                    <el-table-column prop="name" label="账户名称" width="400"></el-table-column>
                                    <el-table-column prop="address" label="账户地址" width="500"></el-table-column>
                                    <el-table-column :align="'right'">
                                        <template #header>
                                            <el-input v-model="search" size="mini" placeholder="输入名称关键字搜索" />
                                        </template>
                                        <template #default="{ scope }">
                                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <el-drawer size="40%" :visible.sync="drawer" :with-header="false">
                        <div style="font-size:22px; font-weight:bold; color:black; margin-top:10px;">我该如何使用小账户管理?</div>
                    </el-drawer>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            defaultUser: {
                avatar: '../assets/default-avatar.png',
                // account: '123456',
                name: 'Timmy',
                balance: '0.1eth',
                description: "hiiiiiiiiiiiiiiiiiiiiiiiiii😁",
                email: "22@qq.com",
                phone: "13244422222",
                chainAccounts: []
            },
            selectedAccount: null,
            isAccountManagementVisible: false, // 控制链账户管理部分的显示
            account: null,
            drawer: false,
            name: '',
            address: '',
            search: '',
            listData: [{
                    name: 'dasa',
                    address: '1232131sdaa21231asd123',
                },
                {
                    name: 'asassa',
                    address: '123dsad231asd123'
                }
            ],
        };
    },
    created() {
        console.log('created avatar load=================>');
        // this.loadAvatar();
    },
    computed: {
        user() {
            // 这里确保我们从 Vuex 的 state 中获取 user 数据
            const user = this.$store.state.user;
            console.log(user); // 打印到控制台检查 user 数据
            return user;
        },
        filteredListData() {
            return this.listData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('logout');
            setTimeout(() => {
                this.$router.push('/intro');
            }, 100);
        },
        editProfile() {
            setTimeout(() => {
                this.$router.push('/editProfile');
            }, 100);
        },
        // 切换链账户管理部分的显示状态
        toggleAccountManagement() {
            this.isAccountManagementVisible = !this.isAccountManagementVisible;
        },
        goToAccountManagement() {
            this.$router.push('/myAccount');
        },
        async ensureUserLoaded({ state, dispatch }) {
            if (!state.user) {
                await dispatch('checkLoginStatus');
            }
            if (state.user) {
                dispatch('loadAvatar');
            } else {
                console.error('用户未登录或加载失败');
            }
        },
        loadAvatar() {
            const account = this.user.account;
            if (!account) {
                console.error('账号信息不完整。');
                return;
            }

            const localAvatarUrl = localStorage.getItem(`avatar_${account}`);
            if (localAvatarUrl) {
                console.log(localAvatarUrl);
                this.user.avatar=localAvatarUrl;
                this.$store.commit('setUserAvatar', localAvatarUrl);
            } else {
                axios.get(`http://localhost:28888/api/loadAvatar`, { params: { account } })
                .then(res => {
                    if (res.data && res.data.avatarUrl) {
                        this.$store.commit('setUserAvatar', res.data.avatarUrl);
                        localStorage.setItem(`avatar_${account}`, res.data.avatarUrl);
                    }
                })
                .catch(error => {
                    console.error('Error loading avatar:', error);
                });
            }
        },
        handleDelete(index, row) {
            this.$confirm('是否移除该账户？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post('http://127.0.0.1:28888/api/removeAddress', row).then(res => {
                    if (res.data.status === '200') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败'
                        });
                    }
                })

            }).catch(() => {});
            console.log(index, row);
        },

        addSmallAccount() {
            if (this.name === '') {
                this.$message.warning('账户名不得为空');
                return;
            } else if (this.address === '') {
                this.$message.warning('账户地址不得为空');
                return;
            }
            let data = {
                account: "123",
                address: this.address,
                name: this.name,
            }

            axios.post('http://127.0.0.1:2888/api/addSmallAccount', data)
                .then(response => {
                    if (response.code === "200")
                        this.$message.success('导入成功');
                    else {
                        this.$message.error('导入失败');
                    }
                }).catch(e => {
                    console.log(e)
                })
        },
        async getAccountList() {
            let res = await axios.get('http://127.0.0.1:28888/api/getSmallAccount', {
                params: {
                    account: this.account
                }
            }).catch(e => {
                console.log(e)
            })
            if (res.data.status === "查询成功" && res.data.addresses) {
                this.listData = res.data.addresses.map(item => {
                    // 如果 address 属性不存在，给它一个默认值
                    return {
                        ...item,
                        addresses: item || 'null'
                    };
                });
            }
        }

    },
    mounted() {
        this.loadAvatar();
        this.account = localStorage.getItem('account');
        this.getAccountList();
    }
};
</script>

<style scoped>
/* 重置一些默认样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 容器样式 */
.container {
    width: 100%;
    height: auto;
}

/* 内容样式 */
.content {
    width: 100%;
    margin: 0 auto;
}

.manage-account-button.active {
    background-color: #ff5900;
    border-color: #ff5900;
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

/* 侧边栏和头像样式 */
.sidebar-wallet-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px; /* 根据需要调整 */
}

.sidebar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 响应式头像 */
.avatar {
    width: 15vw; /* 根据需要调整大小 */
    height: 15vw; /* 确保宽高相等 */
    max-width: 200px; /* 设置最大宽度，防止过大 */
    max-height: 200px;
    border-radius: 50%; /* 使其为正圆形 */
    object-fit: cover; /* 确保图片按比例填充容器 */
    overflow:auto;
    background-color: transparent;
    text-align: center; /* 使alt文字水平居中 */
    line-height: 150px;  /* 调整这个值以改变alt文字的垂直位置 */
    border: 0.8px solid #ffffffb0; /* 3像素宽的蓝色描边 */
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit:cover; /* 图片按比例填充容器 */
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
.user-info, .account-info {
    width: 80%;
    max-width: 600px;
    margin: 10px 0;
    text-align: center;
    color: #ffffffb0;
}

.user-info p, .account-info p {
    margin: 10px 0;
}

.user-info p span, .account-info p span {
    color: #ff741d;
    font-style: italic;
    font-size: 1em;
}

/* 按钮样式 */
.edit-profile-button, .manage-account-button {
    background-color: rgba(255, 255, 255, 0.303);
    color:  #ffffffb0;
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

.edit-profile-button:hover, .manage-account-button:hover {
    background-color: #ff5900;
    border-color: #ff5900;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .avatar {
        width: 25vw;
        height: 25vw;
    }

    .edit-profile-button, .manage-account-button {
        width: 90%;
    }

    .user-info, .account-info {
        width: 90%;
    }
}

.myAccount-container {
    position: relative;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    /* background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 80%); */
    background-image: linear-gradient(to top, #333 0%, rgb(47, 43, 43) 100%);
    ;

}

.myAccount-guideBox {
    margin-top: 50px;
    margin-left: 50px;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.myAccount-title {
    flex: 1;
    align-self: flex-start;
    color: black;
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

</style>

