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
                                <h3>Home</h3>
                            </div>
                        </div>
                        <div class="want-to-be-right">
                            <ul class="home-navbar-menu">
                                <li class="recharge-item"><a href="#/myGas">Recharge</a></li>
                                <li class="intro-item"><a href="#/u_intro">Browser</a></li>
                                <li class="explore-item"><a href="#/exhibitWorks">Market</a></li>
                                <li class="upload-item"><a href="#/uploadWorks">Upload</a></li>
                                <li class="records-item"><a href="#/recordWorks">My Records</a></li>
                            </ul>
                            <div>
                                <button class="home-navbar-button" @click="logOut">Log out</button>
                            </div>                            
                        </div>
                    </div>
                </nav>              
                <div class="sidebar-wallet-container">
                    <div class="sidebar">
                        <el-avatar :src="user.avatar" class="avatar" size="900">
                            <template v-if="!user.avatar"> 
                                <img src="../assets/default-avatar.png" alt="Default Avatar">
                            </template>
                        </el-avatar>
                        <div class="user-info-container">
                            <div class="user-info">
                                <p>ID: <span>{{ user.account }}</span></p>
                                <p>Name: <span>{{ user.name }}</span></p>
                                <p>Description: <span>{{ user.description }}</span></p>
                                <button class="edit-profile-button" @click="editProfile">Edit Account Info</button>
                            </div>
                            <div class="account-info">
                                <p>Account Balance: <span>{{ user.balance }}</span></p>
                                <p>Email&Phone: <span>{{ user.email }}   |   {{ user.phone }}</span></p>
                                <p>Selected Chain Account: <span>{{ selectedAccount ? selectedAccount.name : 'NAN, Please go to account management to select an account.' }}</span></p>
                                <button class="manage-account-button" @click="goToAccountManagement">Manage Chain Accounts</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 默认的用户信息
            defaultUser: {
                avatar: '',
                account: '123456',
                name: 'Timmy',
                balance: '0.1eth',
                description: "hiiiiiiiiiiiiiiiiiiiiiiiiii😁",
                email: "22@qq.com",
                phone: "13244422222",
                chainAccounts: []
            },
            selectedAccount: null,
        };
    },
    computed: {
        user() {
            // 如果全局状态中有用户信息，则使用全局状态中的信息，否则使用默认信息
            return this.$store.state.user || this.defaultUser;
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
        goToAccountManagement() {
            // alert('route to account-management');
            this.$router.push('/myAccount');
        }
    }
}
</script>

<style scoped>
.content {
    margin-left: 10%;
}

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

.sidebar {
    position: absolute;
    top:450px;
    left: 1px;
    width: 40%;
    background-color: rgba(255, 255, 255, 0);
    padding: 10px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0);
    order: 1;
    height: 50vh;
}

.avatar {
    position: absolute;
    top:-60%;
    left: 20%;
    width: 52%;
    height: 68%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    background-color: #f4f4f400;
    border-radius: 500%; 
    overflow: hidden;
}

.user-info {
    width:fit-content;
    position: relative;
    top:10%;
    font-size: 1.6em;
    font-weight: 700; /* 设置字体粗细，500 为中等粗细 */
    text-align: left;
    color: #ffffffb0;
}

.user-info-container {
    position: absolute;
    top:10%;
    left: 10%;
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: flex-start;
}

.user-info p {
    white-space: nowrap;  /* 禁止换行 */
    overflow: hidden;     /* 隐藏溢出内容 */
    text-overflow: ellipsis; /* 在溢出时显示省略号 */
    margin: 10px 0;
}

.account-info {
    width:2000px;
    position: absolute;
    top:0%;
    left: 90%;
    font-size: 1.6em;
    font-weight: 700; /* 设置字体粗细，500 为中等粗细 */
    text-align: left;
    color: #ffffffb0;
}

.account-info p {
    white-space: nowrap;  /* 禁止换行 */
    overflow: hidden;     /* 隐藏溢出内容 */
    text-overflow: ellipsis; /* 在溢出时显示省略号 */
    margin: 10px 0;
}

.user-info, .account-info {
    flex: 1;
    margin-right: 200px; /*调整两列间距*/
}

.user-info p, .account-info p {
    display: flex;
    flex-direction: column; /* 使信息在冒号后换行显示 */
    margin: 10px 0;
}

.user-info p span, .account-info p span {
    color: #ff741d; /* 设置为不同的颜色 */
    font-style: italic; /* 设置字体样式为斜体 */
    font-size: 1.2em; /* 设置字体大小 */
}

.manage-account-button {
    position: absolute;
    top:100%;
    background-color: rgba(255, 255, 255, 0.303); /* 设置为半透明 */
    color:  #ffffffb0;
    font-weight: 700; /* 设置字体粗细，500 为中等粗细 */
    border: 1px solid  #ffffff00; 
    border-radius: 10px; /* 设置圆角 */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s; /* 添加边框颜色过渡 */
    margin-top: 10px;
    margin-right: 10px; /* 增加一个右边距 */
    text-align: center; /* 文字居中 */
    width: 400px; /* 设置按钮的宽度 */
    height: 60px; /* 设置按钮的高度 */
}

.manage-account-button:hover {
    background-color: #ff5900;
    border-color: #ff5900; /* 修改hover状态下的边框颜色 */
}

.edit-profile-button  {
    position: absolute;
    top:100%;
    left: 0px;
    background-color: rgba(255, 255, 255, 0.303); /* 设置为半透明 */
    color:  #ffffffb0;
    font-weight: 700; /* 设置字体粗细，500 为中等粗细 */
    border: 1px solid  #ffffff00; 
    border-radius: 10px; /* 设置圆角 */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s; /* 添加边框颜色过渡 */
    margin-top: 10px;
    margin-right: 10px; /* 增加一个右边距 */
    text-align: center; /* 文字居中 */
    width: 400px; /* 设置按钮的宽度 */
    height: 60px; /* 设置按钮的高度 */
}

.edit-profile-button:hover {
    background-color: #ff5900;
    border-color: #ff5900; /* 修改hover状态下的边框颜色 */
}


</style>

