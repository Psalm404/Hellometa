<template>
<div class="myAccount-container" style="background-color: #ffffff;">
    <div class="content" style="height:100vh">
        <div class="myAccount-guideBox">
            <div class="myAccount-title">链账户管理</div>
            <a class="myAccount-howtouse" @click="drawer = true" style="align-self:self-start;">
                <i class="el-icon-question" style="display:contents;"></i>
                我该如何使用账户管理？</a>
        </div>
        <div class="myAccount-createAccount">
            <div style="display: flex; gap: 20px">
                <div style=" display: flex; flex:1; justify-items: center; align-items:center; gap:15px;"> <span> 账户名称: </span>
                    <el-input size="medium" v-model="name" placeholder="请输入账户名称" style="width:400px" maxlength="12" minlength="1" show-word-limit> </el-input>
                </div>
                <div style=" display: flex; flex:1; justify-items: center; align-items:center; gap:15px;"> <span> 账户地址: </span>
                    <el-input size="medium" v-model="address" placeholder="请输入账户地址" style="width:400px"> </el-input>
                </div>
            </div>
            <div style="display: flex; flex-direction: column;">
                <el-button type="primary" class="create-accountBT" size="small" style="align-self: self-end;" @click="addSmallAccount()"> 导入账户</el-button>
            </div>
        </div>
        <div class="myAccount-accountList">
            <div style="align-self:self-start;">链账户列表</div>
            <div>
                <el-table :key="listData.length" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width:100%">
                    <el-table-column prop="name" label="账户名称" width="400"></el-table-column>
                    <el-table-column prop="address" label="账户地址" width="500"></el-table-column>
                    <el-table-column align="right">
                        <!-- eslint-disable-next-line -->
                        <template slot="header" slot-scope="scope">
                            <el-input v-model="search" size="mini" placeholder="输入名称关键字搜索" />
                        </template>
                        <!-- eslint-disable-next-line -->
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
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

        </div>
    </el-drawer>
</div>
</template>

<script>
import axios from 'axios';
export default {
    mounted() {
        this.account = localStorage.getItem('account');
        this.getAccountList();
    },
    data() {
        return {
            account: null,
            drawer: false,
            name: '',
            address: '',
            search: '',
            listData: [],
        }
    },
    methods: {

        handleDelete(index, row) {
            this.$confirm('是否移除该账户？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post('http://127.0.0.1:28888/api/removeAddress', row).then(res => {
                    console.log(res);
                    if (res.data.code === 200) {
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

                axios.post('http://127.0.0.1:28888/api/addSmallAccount', data).then(response => {
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
        getAccountList() {
            axios.get('http://127.0.0.1:28888/api/getSmallAccount', {
                params: {
                    account: this.account
                }
            }).then(res => {
                console.log('res', res)
                if (res.data.status === "查询成功" && res.data.addresses) {
                    this.listData = res.data.addresses.map(item => {
                        // 如果 address 属性不存在，给它一个默认值
                        return {
                            ...item,
                            addresses: item || 'null'
                        };
                    });
                }

                console.log('listData', this.listData)
            }).catch(e => {
                console.log(e)
            })

        }
    },

}
</script>

<style scoped>
.myAccount-container {
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

.myAccount-guideBox {
    margin-top: 50px;
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
