<template>
<div class="gasRecharge-container">
    <div class="content" style="height:100vh">
        <div class="gasRecharge-guideBox">
            <div style = "display: flex; gap:50px;">
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
                <div> 价格情况 </div>
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
                    <el-button type="primary" size="small" style="width:180px;"> 提交订单 </el-button>
                </div>

            </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
    methods: {
        selectPrice(price) {
            this.price = price;
        }
    },
    data() {
        return {
            price: 0,
        }
    }
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
