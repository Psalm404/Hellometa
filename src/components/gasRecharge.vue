<template>
<div class="gasRecharge-container">
    <div class="content" style="height:100vh">
        <div v-if="isLoading" class="overlay">
            <div class="overlay-content">
                {{tip}}
            </div>
            <div>  <el-button id="backBT" style="z-index:10001" v-show="showBackButton" @click="close"> 返回充值 </el-button></div>
          
        </div>
        <div ref="formDiv"> </div>
        <div class="gasRecharge-guideBox">
            <div style="display: flex; gap:50px;">
                <div class="gasRecharge-title">
                    燃料充值
                </div>
                <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:13px;">
                    <el-breadcrumb-item :to="{ path: '/' }">个人中心</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/myGas' }">燃料管理</el-breadcrumb-item>
                    <el-breadcrumb-item>燃料充值</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <a @click="drawer = true" style="align-self:self-start;">
                <i class="el-icon-question" style="display:contents;"></i>
                我该如何使用燃料充值？</a>
        </div>
        <div class="gasRecharge-box">
            <div style="align-self: self-start; font-weight:bold"> 燃料数量(单位:WEI) </div>
            <div class="gasRecharge-priceBox">
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(1)"> 1万 </el-button>
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(10)"> 10万 </el-button>
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(100)"> 100万 </el-button>
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(1000)"> 1000万 </el-button>
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(10000)"> 10000万 </el-button>
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(100000)"> 100000万 </el-button>
            </div>
            <div style="display: flex; flex-direction: column; margin-top:15px ">
                <div style="align-self: self-start; font-weight:bold;">价目表</div>
                <div style="align-self: self-start; color:red; font-weight:bold;"> 该汇率并非真实汇率，使用支付宝沙箱模拟交易环境，不涉及真实钱财交易。 </div>
                <br />
                <div style="align-self: center; font-weight:bold; font-size:19px;"> 1 ETH = 100,000,000 WEI </div>
                <div style="align-self: center; font-weight:bold; font-size:19px;"> 1 RMB = 10,000 WEI </div>
                <!-- <div v-loading="loading" style="height: 40px"> {{rate}} </div> -->
            </div>
        </div>
        <div class="gasRecharge-currentPrice">
            <div style="align-self: self-start; font-weight:bold"> 当前配置 </div>
            <el-divider></el-divider>
            <div style="display: flex; flex-direction: column; ">
                <div style="display: flex;">
                    <div style="flex:1">燃料数量</div>
                    <div style="align-self: flex-end; flex:1; font-weight:bold; font-size:19px;"> {{price}} 万</div>
                </div>
                <div style="display:flex">
                    <div style="flex:1; margin-top:20px">配置费用</div>
                    <div style="align-self: flex-end; flex:1; color:red; font-size:19px; font-weight:bold"> ￥{{price}} </div>
                </div>
                <el-divider></el-divider>
                <div style="margin-top:10px;">
                    <el-button type="primary" size="small" style="width:180px;" @click="submitOrder()"> 提交订单 </el-button>
                </div>

            </div>
        </div>
    </div>
    <el-drawer size="40%" :visible.sync="drawer" :with-header="false">
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
            <br/>
            <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 二、 支付流程 </div>
            <br/>
            <div style="text-align: start">&emsp;&emsp;1. 选择要充值的金额，点击提交订单。 </div>
            <div style="text-align: start">&emsp;&emsp;2. 等待支付宝页面加载完毕，用支付宝沙箱版扫描二维码或填写账号密码支付。建议使用扫码支付。 </div>
            <div style="text-align: start; margin:10px">
                <el-image :src="require('@/assets/alipay2.png') "></el-image>
            </div>
            <div style="text-align: start">&emsp;&emsp;3. 在手机上输入支付密码（默认为11111），检测到成功支付后点击按钮即可返回充值页面。 </div>
            <br/>
            <div style="margin-top:20px; font-weight:bold; font-size:large; text-align: start;"> 三、支付常见问题 </div>
            <br/>
            <div style="text-align: start; font-weight:bold;">&emsp;&emsp;1. 页面加载慢/加载失败怎么办？ </div>
            <div style="text-align: start">&emsp;&emsp;受支付宝沙箱系统稳定性影响，可能存在支付页面加载较慢、系统繁忙、交易失败等问题，耐心等待一会儿，多刷新几次，不要急着关闭页面。 </div>
            <div style="text-align: start; font-weight:bold;">&emsp;&emsp;2. 会对真实支付宝账户产生影响吗？ </div>
            <div style="text-align: start">&emsp;&emsp;不会。 </div>
            
        </div>
    </el-drawer>
</div>
</template>

<script>
import axios from 'axios';
export default {
    /* eslint-disable */
    mounted() {
        console.log('account:', localStorage.getItem('account'))
        this.getExchangeRate();
    },
    data() {
        return {
            tip: " 交易中，请稍后......",
            loading: true,
            rate: null,
            price: 0,
            urlContent: null,
            isLoading: false,
            out_trade_no: null,
            drawer: false,
            showBackButton: false,
        };
    },
    methods: {
        close() {
            this.isLoading = false;
            this.tip = " 交易中，请稍后......"
            this.showBackButton = true;
        },
        getExchangeRate() {
            axios.get('http://127.0.0.1:28888/api/getExchangeRate').then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    console.log(res.data.rates)
                    this.CNYToUSD = res.data.rates.CNYToUSD;
                    this.rate = `人民币到美元:  ${this.CNYToUSD}`;
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.rate = '获取汇率失败';
                }
                console.log(this.CNYToUSD)
            }).catch((e) => {
                console.log(e)
            })
        },
        selectPrice(price) {
            this.price = price;
        },
        requirePayment() {
            console.log('account:', localStorage.getItem('account'))
            const intervalId = setInterval(() => {
                axios.post('http://127.0.0.1:28888/api/queryPayment', {
                        account: localStorage.getItem('account'),
                        out_trade_no: this.out_trade_no
                    })
                    .then(res => {
                        console.log(res.data.status)
                        if (res.data.code === 10001) {
                            this.tip = "交易成功"
                            this.showBackButton = true;

                            clearInterval(intervalId);
                            this.$message({
                                type: 'success',
                                message: '交易成功'
                            });
                        } else if (res.data.code === 20002) {

                        } else if (res.data.code === 30003) {
                            this.isLoading = false;
                            this.$message({
                                type: 'error',
                                message: '未付款，交易关闭'
                            });
                        }
                    })
                    .catch(error => {
                        console.error("请求失败", error);
                    });
            }, 2000); // 每2秒调用一次
        },
        beforeDestroy() {
            clearInterval(intervalId); // 确保组件销毁时清理定时任务
        },
        submitOrder() {
            this.out_trade_no = new Date().getTime();
            if (this.price === 0) {
                this.$message({
                    type: "error",
                    message: "请选择充值数额"
                })
                return;
            }
            let data = {
                out_trade_no: this.out_trade_no,
                total_amount: this.price,
                subject: '充值'
            }
            console.log('submits')
            axios.post('http://127.0.0.1:28888/api/payment', data).then(res => {
                this.isLoading = true
                this.urlContent = res.data.url
                console.log(this.urlContent)
                window.open(this.urlContent, '_blank')
                this.requirePayment();
            }).catch(e => {
                console.log(e)
            })
        }
    },
}
</script>

<style scoped>
/* 蒙版的样式 */
.overlay {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 半透明黑色背景 */
    z-index: 9999;
    /* 保证蒙版位于最上层 */
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    font-family: Arial, sans-serif;
}

.gasRecharge-container {
    position: relative;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    /* background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 80%); */
    background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
}

.gasRecharge-guideBox {
    margin-top: 50px;
    margin-left: 50px;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.gasRecharge-title {
    align-self: flex-start;
    color: black;
    font-weight: bold;
    font-size: 2em;
}

.gasRecharge-box {
    padding: 30px;
    /* border:1px solid red; */
    margin-left: 50px;
    width: 90%;
    margin-top: 30px;
    /*侧边栏删除记得改*/
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    display: flex;
    gap: 20px;
    flex-direction: column;
}

.gasRecharge-priceBox {
    /* border:1px solid red; */
    display: flex;
    gap: 40px;
    margin-left: 50px;
    width: 85%
}

.priceBT {
    flex: 1
}

.gasRecharge-currentPrice {
    padding: 25px;
    /* border:1px solid red; */
    margin-left: 50px;
    width: 90%;
    margin-top: 30px;
    /*侧边栏删除记得改*/
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
}
</style>
