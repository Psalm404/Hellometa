<template>
<div class="container">
    <div class="content">
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
                        <li class="guide-item active"><a href="#/guidePage">用户指南</a></li>
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
                        <li class="home-item"><a href="#/home">个人中心</a></li>
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
            <div class="guide-box" v-show="show">
                <div style="font-size:3em; color:#edebeb">欢迎来到HelloMeta! </div>
                <div style=" color:#edebeb;font-size:large">这些指南可以帮助您快速入门系统。</div>
                <div class="guide-item-box">
                    <div> <a style=" color:#ff5900; font-size:large " class="el-icon-s-opportunity" @click="drawer1 = true;"> 我想快速了解HelloMeta。 </a> </div>
                    <div> <a style=" color:#ff5900; font-size:large" class="el-icon-s-opportunity" @click="drawer2 = true;"> 我该如何使用链上账户管理？ </a> </div>
                    <div> <a style=" color:#ff5900; font-size:large" class="el-icon-s-opportunity" @click="drawer3 = true;"> 我该如何使用燃料管理？ </a> </div>
                    <div> <a style=" color:#ff5900; font-size:large" class="el-icon-s-opportunity" @click="drawer4 = true;"> 我该如何使用燃料充值？ </a> </div>
                    <div> <a style=" color:#ff5900; font-size:large" class="el-icon-s-opportunity" @click="drawer5 = true;"> 我在使用系统的时候出现了问题，该如何解决？ </a> </div>
                </div>
            </div>
        </transition>
    </div>

    <el-drawer size="40%" :visible.sync="drawer2" :with-header="false">
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
    <el-drawer size="40%" :visible.sync="drawer3" :with-header="false">
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
    <el-drawer size="40%" :visible.sync="drawer4" :with-header="false">
        <div style="font-size:22px; font-weight:bold; color:black; margin-top:20px;">我该如何使用燃料充值?</div>
        <div style="margin:20px;">
            <div style="display:flex; flex-direction: column; align-items: flex-start; gap:10px;">
                <div style="font-weight:bold">一、下载沙箱版支付宝 </div>
                <div style="font-weight:bold">二、 支付流程 </div>
                <div style="font-weight:bold">三、支付常见问题 </div>
            </div>
            <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 一、下载沙箱版支付宝 </div>
            <br />
            <div style="text-align: start">&emsp;&emsp;支付宝沙箱是支付宝提供的一个模拟环境, 不会影响到真实支付宝账户和资金。对于本项目的充值系统，用户需要下载手机版支付宝沙箱进行模拟支付。</div>
            <div style="text-align: start">&emsp;&emsp;下载地址: <a href="https://open.alipay.com/develop/sandbox/tool/alipayclint" target="_blank"> https://open.alipay.com/develop/sandbox/tool/alipayclint</a></div>
            <div style="text-align: start">&emsp;&emsp;下载完毕后，在“沙箱账号”页面查看支付宝提供的账号和密码，在登录界面使用沙箱账号即可成功登录。 </div>
            <div style="text-align: start; margin:10px">
                <el-image :src="require('@/assets/alipay1.png') "></el-image>
            </div>
            <br />
            <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 二、 支付流程 </div>
            <br />
            <div style="text-align: start">&emsp;&emsp;1. 选择要充值的金额，点击提交订单。 </div>
            <div style="text-align: start">&emsp;&emsp;2. 等待支付宝页面加载完毕，用支付宝沙箱版扫描二维码或填写账号密码支付。建议使用扫码支付。 </div>
            <div style="text-align: start; margin:10px">
                <el-image :src="require('@/assets/alipay2.png') "></el-image>
            </div>
            <div style="text-align: start">&emsp;&emsp;3. 在手机上输入支付密码（默认为11111），检测到成功支付后点击按钮即可返回充值页面。 </div>
            <br />
            <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 三、支付常见问题 </div>
            <br />
            <div style="text-align: start; font-weight:bold;">&emsp;&emsp;1. 页面加载慢/加载失败怎么办？ </div>
            <div style="text-align: start">&emsp;&emsp;受支付宝沙箱系统稳定性影响，可能存在支付页面加载较慢、系统繁忙、交易失败等问题，耐心等待一会儿，多刷新几次，不要急着关闭页面。 </div>
            <div style="text-align: start; font-weight:bold;">&emsp;&emsp;2. 会对真实支付宝账户产生影响吗？ </div>
            <div style="text-align: start">&emsp;&emsp;不会。 </div>

        </div>

    </el-drawer>

</div>
</template>

<script>
export default {
    data() {
        return {
            drawer1: false,
            drawer2: false,
            drawer3: false,
            drawer4: false,
            drawer5: false,
            show: false,
        }
    },

    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 150)
    },
    methods: {

        logOut() {
            this.$store.dispatch('logout');
            setTimeout(() => {
                this.$router.push('/intro');
            }, 200);
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

.container {
    width: 100%;
    height: auto;
    max-height: 100%;
    /* display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
    position: relative; */
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

.guide-box {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 140px;
}

.guide-item-box {
    /* border: 1px solid red; */
    margin-top: 35px;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 45px;
    width: 60vh;
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

.profile-titile {
    z-index: 00;
    /* 设置一个较高的 z-index 使其在页面顶层 */
}

h2 {
    position: relative;
    left: 12%;
    top: 23px;
    font-size: 6em;
    color: #c64500;
    text-align: center;
}
</style>
