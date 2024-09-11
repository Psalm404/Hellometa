<template>
<div class="gasRecharge-container">
    <div class="content" style="height:100vh">
        <div v-html="htmlContent" ref="formDiv"> </div>
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

        </div>
        <div class="gasRecharge-box">
            <div style="align-self: self-start; font-weight:bold"> 燃料数量 </div>
            <div class="gasRecharge-priceBox">
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(1)"> 1万 </el-button>
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(10)"> 10万 </el-button>
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(100)"> 100万 </el-button>
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(1000)"> 1000万 </el-button>
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(10000)"> 10000万 </el-button>
                <el-button class="priceBT" type="primary" plain size="small" @click="selectPrice(100000)"> 100000万 </el-button>
            </div>
            <div style="display: flex; flex-direction: column; margin-top:15px ">
                <div style="align-self: self-start;">价目表</div>
                <div v-loading="loading" style="height: 40px"> {{rate}} </div>
            </div>
        </div>
        <div class="gasRecharge-currentPrice">
            <div style="align-self: self-start; font-weight:bold"> 当前配置 </div>
            <el-divider></el-divider>
            <div style="display: flex; flex-direction: column; ">
                <div style="display: flex;">
                    <div style="flex:1">燃料数量</div>
                    <div style="align-self: flex-end; flex:1; font-weight:bold; font-size:19px;"> {{price}} </div>
                </div>
                <div style="display:flex">
                    <div style="flex:1; margin-top:20px">配置费用</div>
                    <div style="align-self: flex-end; flex:1; color:red; font-size:19px; font-weight:bold"> ${{price*2}} </div>
                </div>
                <el-divider></el-divider>
                <div style="margin-top:10px;">
                    <el-button type="primary" size="small" style="width:180px;" @click="submitOrder()"> 提交订单 </el-button>
                </div>

            </div>
        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    /* eslint-disable */
    mounted() {
        this.getExchangeRate();
    },
    data() {
        return {
            loading: true,
            rate: null,
            price: 0,
            htmlContent: null,
        };
    },
    methods: {
        getExchangeRate() {
            axios.get('http://127.0.0.1:28888/api/getExchangeRate').then(res => {
                console.log(res)
                if (res.data.code === '200') {
                    this.CNYToUSD = res.data.CNYToUSD;
                    this.USDToETH = res.data.USDToETH;
                    this.rate = `人民币到美元:${this.CNYToUSD}`;
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.rate = '获取汇率失败';
                }
                console.log(this.CNYToUSD, this.USDToETH)
            }).catch((e) => {
                console.log(e)
            })
        },
        selectPrice(price) {
            this.price = price;
        },
        submitOrder() {
            let data = {
                out_trade_no: new Date().getTime(),
                total_amount: this.price,
                subject: '充值'
            }
            axios.post('http://127.0.0.1:28888/api/payment', data).then(res => {
                this.htmlContent = res.data;
                //                 this.htmlContent = `<form name="punchout_form" method="post"
                //     action="https://openapi.alipay.com/gateway.do?charset=UTF-8&method=alipay.trade.page.pay&format=json&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&version=1.0&app_id=2017060101317939&sign_type=RSA2&timestamp=2014-07-24+03%3A07%3A50">
                //     <input type="hidden" name="biz_content" value="{&quot;time_expire&quot;:&quot;2016-12-31 10:05:01&quot;,&quot;extend_params&quot;:&quot;&quot;,&quot;query_options&quot;:&quot;[\&quot;hyb_amount\&quot;,\&quot;enterprise_pay_info\&quot;]&quot;,&quot;settle_info&quot;:&quot;&quot;,&quot;subject&quot;:&quot;Iphone6 16G&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;,&quot;body&quot;:&quot;Iphone6 16G&quot;,&quot;qr_pay_mode&quot;:&quot;1&quot;,&quot;integration_type&quot;:&quot;PCWEB&quot;,&quot;merchant_order_no&quot;:&quot;20161008001&quot;,&quot;sub_merchant&quot;:&quot;&quot;,&quot;invoice_info&quot;:&quot;&quot;,&quot;ext_user_info&quot;:&quot;&quot;,&quot;timeout_express&quot;:&quot;90m&quot;,&quot;disable_pay_channels&quot;:&quot;pcredit,moneyFund,debitCardExpress&quot;,&quot;agreement_sign_params&quot;:&quot;&quot;,&quot;royalty_info&quot;:&quot;&quot;,&quot;store_id&quot;:&quot;NJ_001&quot;,&quot;request_from_url&quot;:&quot;https://&quot;,&quot;qrcode_width&quot;:&quot;100&quot;,&quot;goods_detail&quot;:&quot;&quot;,&quot;enable_pay_channels&quot;:&quot;pcredit,moneyFund,debitCardExpress&quot;,&quot;out_trade_no&quot;:&quot;20150320010101001&quot;,&quot;total_amount&quot;:&quot;88.88&quot;,&quot;business_params&quot;:&quot;{\&quot;mc_create_trade_ip\&quot;:\&quot;127.0.0.1\&quot;}&quot;,&quot;promo_params&quot;:&quot;{\&quot;storeIdType\&quot;:\&quot;1\&quot;}&quot;}">
                //     <input type="submit" value="立即支付" style="display:none" >
                // </form>
                // <script>
                //     document.forms[0].submit();
                // <\/script>`;
                const formDiv = this.$refs.formDiv;
                console.log(this.htmlContent)
                formDiv.innerHTML = this.htmlContent;
                formDiv.querySelector('form').submit();

            })
        }
    },
}
</script>

<style>
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

.gasRecharge-currentPrice .el-button--primary span {
    color: white
}

.gasRecharge-currentPrice {
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
    flex-direction: column;
}
</style>
