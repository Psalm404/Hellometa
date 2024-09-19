<template>
<div class="myGas-container">
    <div class="content" style="height:100vh">
        <div class="myGas-guideBox">
            <div style="display: flex; justify-content: flex-start; gap: 10vw;">
                <div class="myGas-title">燃料管理</div>
                <el-breadcrumb class="router-arrow" separator-class="el-icon-arrow-right" style="margin-top: 13px;">
                    <el-breadcrumb-item :to="{ path: '/home' }">个人中心</el-breadcrumb-item>
                    <el-breadcrumb-item>燃料管理</el-breadcrumb-item>
                </el-breadcrumb>                
            </div>
            <a class="myGas-howtouse" @click="drawer = true" style="align-self:self-start;">
                <i class="el-icon-question" style="display:contents;"></i>
                我该如何使用燃料管理？</a>
        </div>
        <div class="myGas-info">
            <div style="align-self: self-start; font-weight:bold; font-size:17px"> 待分配燃料 </div>
            <div style="font-size:2em; align-self: self-start;">{{totalGas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
            <div style="display: flex; gap:10px">
                <el-button type="primary" size="mini" @click="toGasRecharge()">燃料充值</el-button>
                <!-- <el-button type="primary" size="mini" @click = "distributeGas()">分配燃料</el-button> -->
                <el-button size="mini" @click="drawer2 = true">收支明细</el-button>
                <el-button size="mini" @click="drawer3 = true">分配记录</el-button>
            </div>
        </div>
        <div class="myGas-accountList">
            <div style="align-self:self-start;">链账户列表</div>
            <div>
                <el-table :key="listData.length" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width:100%">
                    <el-table-column prop="name" label="账户名称" width="320"></el-table-column>
                    <el-table-column prop="address" label="账户地址" width="390"></el-table-column>
                    <el-table-column prop="balance" label="账户余额" width="200"></el-table-column>
                    <el-table-column :align="right">
                        <!-- eslint-disable-next-line -->
                        <template slot="header" slot-scope="scope">
                            <el-input v-model="search" size="mini" placeholder="输入名称关键字搜索" />
                        </template>
                        <!-- eslint-disable-next-line -->
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="distributeGas(scope.$index, scope.row)">分配燃料</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
    </div>

    <el-drawer size="40%" :visible.sync="drawer" :with-header="false">
        <div style="font-size:22px; font-weight:bold; color:black; margin-top:10px;">我该如何使用燃料管理?</div>
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
                <el-table-column prop="type" label="交易类型" width="180">
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

        this.getRecord();

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
    /* background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 80%); */
    background-image: linear-gradient(to top, #e25323 0%, rgba(255, 201, 163, 0.821) 100%);
    ;
}

.myGas-guideBox {
    margin-top: 50px;
    margin-left: 52px;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    margin-left: 50px;
    margin-top: 30px;
    width: 90%;
    /*侧边栏删除记得改*/
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    display: flex;
    gap: 20px;
    flex-direction: column;
}

.myGas-accountList {
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

.myGas-container .el-button--primary span {
    color: white;
}

.router-arrow{
    color: #fff;
    position: relative;
    left: -75%;
}

.el-icon-arrow-right{
    color: #fff;
}
</style>
