<template>
<div class="myGas-container">
    <div class="content" style="height:100vh">
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
                            <li class="recharge-item  active"><a href="#/myGas">燃料管理</a></li>
                            <li class="intro-item"><a href="#/blockBrowse">区块浏览器</a></li>
                            <li class="explore-item"><a href="#/exhibitWorks">交易市场</a></li>
                            <li class="upload-item"><a href="#/uploadWorks">凭证上传</a></li>
                            <li class="records-item"><a href="#/recordWorks">我的凭证</a></li>
                            <li class="home-item"><a href="#/home">个人中心</a></li>
                        </ul>
                        <div>
                            <button class="home-navbar-button" @click="logOut">Log out</button>
                        </div>
                        <div class="home-navbar-profile">
                            <a href="https://github.com/Psalm404/Hellometa" target="_blank">
                                <img src="../assets/github.jpg" alt="Join us">
                            </a>
                        </div>
                    </div>
                </div>
        </nav>
        <div class="myGas-guideBox">
            <a class="myGas-howtouse" @click="drawer = true" style="align-self:self-start;">
                <i class="el-icon-question" style="display:contents;"></i>
                我该如何使用燃料管理？</a>
        </div>
        <div class="myGas-info">
            <div style="align-self: self-start; font-weight:bold; font-size:17px"> 待分配燃料 </div>
            <div style="font-size:2em; align-self: self-start;">{{totalGas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} eth</div>
            <div style="display: flex; gap:10px">
                <el-button class="custom-button" size="mini" @click="toGasRecharge()">燃料充值</el-button>
                <!-- <el-button class="custom-button" size="mini" @click="distributeGas()">分配燃料</el-button> -->
                <el-button class="custom-button" size="mini" @click="drawer2 = true">收支明细</el-button>
                <el-button class="custom-button" size="mini" @click="drawer3 = true">分配记录</el-button>
            </div>
        </div>
        <div class="myGas-accountList">
            <div style="align-self:self-start;">链账户列表</div>
            <div>
                <el-table :key="listData.length" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width:100%">
                    <el-table-column prop="name" label="账户名称" width="320"></el-table-column>
                    <el-table-column prop="address" label="账户地址" width="390"></el-table-column>
                    <el-table-column prop="balance" label="账户余额" width="200"></el-table-column>
                    <el-table-column align="right">
                        <!-- eslint-disable-next-line -->
                        <template slot="header" slot-scope="scope">
                            <el-input class="custom-input" v-model="search" size="mini" placeholder="输入名称关键字搜索" />
                        </template>
                        <!-- eslint-disable-next-line -->
                        <template slot-scope="scope">
                            <el-button class="custom-button2" size="mini" @click="distributeGas(scope.$index, scope.row)">分配燃料</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
    </div>

    <el-drawer size="40%" :visible.sync="drawer" :with-header="false">
        <div style="font-size:22px; font-weight:bold; color:black; margin-top:10px;">我该如何使用燃料管理?</div>
        <div style="margin:20px">
            <div style="display:flex; flex-direction: column; align-items: flex-start; gap:10px;">
                <div style="font-weight:bold">一、在链账户管理中导入账户 </div>
                <div style="font-weight:bold">二、充值账号余额 </div>
                <div style="font-weight:bold">三、将余额分配给小账户</div>
            </div>
            <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 一、在链账户管理中导入账户 </div>
            <br />
            <div style="text-align: start;">&emsp;&emsp;进入个人中心，按照指引导入MetaMask钱包账户。</div>
            <div>
                <el-image :src="require('@/assets/gas1.png') "></el-image>
            </div>
            <br />
            <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 二、充值账号余额 </div>
            <br />
            <div style="text-align: start;">&emsp;&emsp;点击'燃料充值'按钮，按照指引充值燃料余额。</div>
            <br />
            <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 三、将余额分配给小账户 </div>
            <br />
            <div style="text-align: start;">&emsp;&emsp;在下方的链账户列表中，点击右侧按钮进行燃料分配。该操作将会根据分配数量，将余额中的燃料分配给指定小账户。</div>
            <br />
            <div style="text-align: start;">&emsp;&emsp;注意，燃料充值和分配都是不可逆的，请确保无误后再进行操作。充值和分配记录分别可在'收支明细'和'分配记录'中进行查看。</div>
        </div>
    </el-drawer>
    <el-drawer size="40%" :visible.sync="drawer2" :with-header="false">
        <div style="font-size:20px;color:black; margin-top:10px;">收支明细</div>
        <template>
            <el-table :data="rechargeRecord" style="width: 90%; margin:10px 30px;">
                <el-table-column prop="type" label="交易类型" width="180">
                </el-table-column>
                <el-table-column prop="amount" label="燃料变动" width="180">
                </el-table-column>
                <el-table-column prop="time" label="交易时间">
                </el-table-column>
            </el-table>
        </template>
    </el-drawer>
    <el-drawer size="40%" :visible.sync="drawer3" :with-header="false">
        <div style="font-size:20px;color:black; margin-top:10px;">分配记录</div>
        <template>
            <el-table :data="distributeRecord" style="width: 90%; margin:10px 30px;">
                <el-table-column prop="address" label="分配账户" width="180">
                </el-table-column>
                <el-table-column prop="amount" label="燃料变动" width="180">
                </el-table-column>
                <el-table-column prop="time" label="交易时间">
                </el-table-column>
            </el-table>
        </template>
    </el-drawer>
</div>
</template>

<script>
import Web3 from 'web3';
import axios from 'axios';
export default {
    mounted() {
        this.account = localStorage.getItem('account')
        this.getAccountList();

        this.getTotalGas();
    },
    data() {
        return {
            account: null,
            myGas: null,
            drawer: false,
            drawer2: false,
            drawer3: false,
            totalGas: 0,
            search: '',
            CNYToUSD: '',
            USDToETH: '',
            listData: [],
            rechargeRecord: null,
            distributeRecord: null,
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('logout');
            setTimeout(() => {
                this.$router.push('/intro');
            }, 200);
        },
        async getAccountList() {
            const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
            let res = await axios.get(`${apiBaseUrl}/getSmallAccount`, {
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
                this.getAccountBalance();
            }
        },
        distributeGas(index, info) {
            console.log(index, info)
            this.$prompt('请输入分配燃料数量:', '分配燃料', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValidator: (value) => {
                    const numberValue = parseFloat(value);
                    if (isNaN(numberValue)) {
                        return '请输入有效数字';
                    }
                    if (numberValue > this.totalGas * 0.9) {
                        return '超过最大可分配额度 (' + (this.totalGas * 0.99).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ')';
                    }
                    return true;
                }
            }).then(({
                value
            }) => {
                let toAddress = info.address;
                let amount = parseFloat(value);
                const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
                    axios.post(`${apiBaseUrl}/sendFunds`, {
                    toAddress: toAddress,
                    amount: amount
                }).then(res => {
                    console.log(toAddress, amount)
                    console.log(res)
                    if (res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '分配成功'
                        });
                        this.getAccountBalance();
                        this.getTotalGas();
                    }
                });

            }).catch(() => {});
        },
        async getAccountBalance() {
            console.log('getbalance');
            let web3 = new Web3(window.ethereum);
            try {
                for (const item of this.listData) {
                    console.log(item.address);
                    const balance = await window.ethereum.request({
                        method: 'eth_getBalance',
                        params: [item.address, 'latest']
                    });

                    const balanceInEth = web3.utils.fromWei(balance, 'ether'); // 将 wei 转换为 ETH
                    const formattedBalance = parseFloat(balanceInEth).toFixed(10); // 保留 10 位小数

                    // 使用 $set 更新数据
                    this.$set(this.listData, this.listData.indexOf(item), {
                        ...item,
                        balance: formattedBalance
                    });
                    console.log('accountbalance', formattedBalance);
                }
            } catch (e) {
                console.log(e);
            }
        },
        getTotalGas() {
            const params = {
                account: this.account
            }
            console.log('account', this.account)
            const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
            axios.get(`${apiBaseUrl}/getUserBalance`, {
                params: params
            }).then(res => {
                if (res.data.code === 200) {
                    this.totalGas = res.data.balance;
                    // 调用 Vuex action 更新余额
                    this.$store.dispatch('updateUserBalance', res.data.balance);
                    console.log('userBalance::'+ res.data.balance)
                }
            }).catch(e => {
                console.log(e)
            })
        },
        async getRecord() {
            const params = {
                account: this.account
            }
            const apiBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
            await axios.get(`${apiBaseUrl}/getRecord`, {
                params: params
            }).then(res => {
                console.log(res)
                const recordList = res.data.records;
                this.rechargeRecord = recordList.filter((item) => {
                    return item.type === '充值'
                });
                this.distributeRecord = recordList.filter((item) => {
                    return item.type === '分配燃料'
                });
            }).catch((e) => {
                console.log(e)
            })
        },
        toGasRecharge() {
            this.$router.push('/myGas/gasRecharge');
        },

    }
}
</script>

<style scoped>
.myGas-container {
    position: relative;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    background-color:  #292929;;
    /* background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 80%); */
    /* background-image: linear-gradient(to top, #1e0e09 0%, rgba(255, 115, 22, 0.901) 100%); */
    ;
}

.myGas-guideBox {
    position: relative;
    top:14%;
    left: 8%;
    margin-top: 90px;
    margin-left: 90px;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.myGas-howtouse{
    color: #ff5900;
}

.myGas-title {
    position: relative;
    left: -33%;
    flex: 1;
    color: rgb(245, 240, 232);
    font-weight: bold;
    font-size: 2em;
}

.myGas-info {
    padding: 30px;
    margin-left: 60px;
    margin-top: 60px;
    width: 90%;
    /*侧边栏删除记得改*/
    border-color: #ff5900;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    display: flex;
    gap: 20px;
    flex-direction: column;
}

.myGas-accountList {
    padding: 30px;
    margin-left: 60px;
    margin-top: 40px;
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

.myGas-container .el-button--primary span {
    color: white;
}

.router-arrow {
    color: #fff;
    position: relative;
    left: -75%;
}

.el-icon-arrow-right {
    color: #fff;
}
.content {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    /* width: 100%;
    height: 100%;
    margin-left: 10%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: auto; */
}

/* 新增的样式 */
.display-container {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
    justify-content: space-between; /* 在两端对齐 */
    margin-top: 70px; /* 根据需要调整间距 */
    padding: 0 15px; /* 根据需要调整内边距 */
}

.search-box {
    position: relative;
    top:0%;
    left: -28%;
    z-index: 10;
    text-align: left;
    color: #9c9c9c;
    padding: 10px 15px;
    width: 500px;
    box-shadow: 2px 4px 15px #171717;
    background-color: rgb(48, 48, 48);
    border-radius: 5px;
    margin: 0px 60px;
    margin-left: 10%;
    display: flex;
    gap: 15px;
}

.grid-box {
    z-index: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 一行四个，每个项目平均分配空间 */
    gap: 25px;
    margin: 20px 60px;
}

.grid-item {
    color: white;
    background-color: rgb(48, 48, 48);
    height: 330px;
    text-align: center;
    border-radius: 7px;
    box-shadow: 2px 4px 15px #171717;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc; /* 添加灰白色边框 */
}

.home-navbar {
    margin-top: 20px;
    margin-left: calc(50% - 48vw);
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
    left: -100px; /* 根据需要调整位置 */
}

/* Browser */
.intro-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -90px; /* 根据需要调整位置 */
}

/* Explore */
.explore-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -80px; /* 根据需要调整位置 */
}

/* Upload */
.upload-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -70px; /* 根据需要调整位置 */
}

/* Records */
.records-item {
    position: relative;
    top: 10px; /* 根据需要调整位置 */
    left: -60px; /* 根据需要调整位置 */
}

/* Home */
.home-item {
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

.home-navbar-menu li.active a {
    font-size: 18px;
    color:  #ff5900;
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

.profile-titile{
    z-index: 00; /* 设置一个较高的 z-index 使其在页面顶层 */
}

h2 {
    position: relative;
    left: 12%;
    top: 23px;
    font-size: 6em;
    color:  #c64500;
    text-align: center;
}

/* 自定义按钮样式 */
::v-deep .custom-button {
    background-color: #ff5900; /* 默认橙色背景 */
    color: white;              /* 白色文字 */
    border-radius: 5px;       /* 圆角 */
    border: none;              /* 无边框 */
    transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
    border: 1px solid #ff5900; /* 添加橙色边框 */
}

::v-deep .custom-button:hover {
    /* background-color: #e65000; 悬停时稍微加深橙色 */
    background-color: white;   /* 按下时背景变为白色 */
    color: #ff5900;            /* 文字变为橙色 */
    border: 1px solid #ff5900; /* 添加橙色边框 */
}

::v-deep .custom-button:active {
    background-color: white;   /* 按下时背景变为白色 */
    color: #ff5900;            /* 文字变为橙色 */
    border: 1px solid #ff5900; /* 添加橙色边框 */
}

::v-deep .custom-button2 {
    background-color: #f6894f; 
    color: white;             
    border-radius: 5px;                
    transition: background-color 0.3s, color 0.3s; 
    border: 1px solid #f6894f; 
}

::v-deep .custom-button2:hover {
    background-color: white;   
    color: #f6894f; 
    border: 1px solid #f6894f; 
}

::v-deep .custom-button2:active {
    background-color: white;  
    color: #f6894f; 
    border: 1px solid#f6894f; 
}

::v-deep .custom-input .el-input__inner {
    /* border-color: #ff5900; 将边框颜色改为橙色 */
    border-radius: 5px;    /* 添加圆角 */
}

::v-deep .custom-input .el-input__inner:focus {
    border-color: #e65000; /* 聚焦时边框颜色变深 */
    box-shadow: 0 0 5px rgba(230, 80, 0, 0.5); /* 添加阴影效果 */
}
</style>
