<template>
<div class="myGas-container">
    <div class="content" style="height:100vh">
        <div class="myGas-guideBox">
            <div class="myGas-title">燃料管理</div>
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
                    <el-table-column align="right">
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
        this.getTotalGas();
        this.getAccountBalance();
        this.getRecord();
    },
    data() {
        return {
            account: '123',
            myGas: null,
            drawer: false,
            drawer2: false,
            drawer3: false,
            totalGas: 123,
            search: '',
            CNYToUSD: '',
            USDToETH: '',
            listData: [{
                    name: 'Account4',
                    address: '0x95ee5aac032ea66b9bac993a42AC998a12C8079d',
                    balance: '',
                },
                {
                    name: 'Account5',
                    address: '0xd00aAb9859C88e5748E8FC375f210bd7625b9864',
                    balance: '',
                }
            ],
            rechargeRecord: null,
            distributeRecord: null,
        }
    },
    methods: {
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
                let res = axios.post('http://127.0.0.1:28888/api/sendFunds', {
                    toAddress: info.address,
                    amount: value
                });
                console.log('hi,im in the train now and feel so bored', info.address, value)
                console.log(res.status)
                // if (res.status === 200) {
                this.$message({
                    type: 'success',
                    message: '分配成功'
                });
                // }

            }).catch(() => {});
        },
        async getAccountBalance() {
            let web3 = new Web3(window.ethereum);
            try {
                for (const item of this.listData) {
                    await window.ethereum.request({
                        "method": 'eth_getBalance',
                        "params": [
                            item.address,
                            'latest'
                        ]
                    });
                    item.balance = await web3.eth.getBalance(item.address); // 获取余额（wei）

                    const balanceInEth = web3.utils.fromWei(item.balance, 'ether'); // 将wei转换为ETH
                    item.balance = parseFloat(balanceInEth).toFixed(10); // 保留7位小数，并赋值为字符串
                    console.log(item.balance);
                }
            } catch (e) {
                console.log(e)
            }
        },
        getTotalGas() {
            const params = {
                account: this.account
            }
            axios.get('http://127.0.0.1:28888/api/getUserBalance', {
                params: params
            }).then(res => {
                if (res.data.code === '200') {
                    this.totalGas = res.data.balance;
                }
            }).catch(e => {
                console.log(e)
            })
        },
        async getRecord() {
            await axios.get('http://127.0.0.1:28888/api/getRecord', this.account).then(res => {
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

<style>
.myGas-container {
    position: relative;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    /* background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 80%); */
    background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
    ;
}

.myGas-guideBox {
    margin-top: 50px;
    margin-left: 50px;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.myGas-title {
    flex: 1;
    align-self: flex-start;
    color: black;
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
</style>
