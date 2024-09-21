<template>
<div class="container">
    <!-- NFT原文件从Pinata删除的加载窗口 -->
    <div id="loading-overlay" style="display: none;">
        <div class="spinner"></div>
        <div class="loading-message">正在从Pinata上删除MetaData&Original File，请稍候...</div>
    </div>

    <transition name="el-fade-in-linear">
        <div class="content" v-show="show">
            <div class="detail-box">
                <div v-if="workPrice !== '0' && workPrice !== 0 && workPrice !== '0.'" class="inactive-work">
                    <a @click="inactiveWork"> <i class="el-icon-edit"></i> 下架作品</a>
                </div>
                <div class="modify-price">
                    <a v-if="workPrice !== '0' && workPrice !== 0 && workPrice !== '0.'" @click="modifyWork"> <i class="el-icon-download"></i> 修改售价</a>
                    <a v-else @click="activeWork"> <i class="el-icon-upload2"></i> 上架作品</a>
                </div>
                <div class="delete-work">
                    <a @click="deleteWork"> <i class="el-icon-delete"></i> 删除作品</a>
                </div>
                <div class="detail-box-top">
                    <div class="detail-box-top-left">
                        <div class="record-picture">
                            <el-avatar shape="square" :size="220" :src="workPic"></el-avatar>
                        </div>
                        <div class="work-download"> <button @click="downloadFile">下载文件</button> </div>
                    </div>
                    <div class="detail-box-top-right">
                        <div class="work-name">
                            <span style="font-weight: bolder;">作品名称:</span>
                            <span style=" display: block; align-self: self-start">{{workName}}</span>
                        </div>
                        <div class="work-type">
                            <span style="font-weight: bolder;">作品类别:</span>
                            <span>{{workType}}</span>
                        </div>
                        <div class="work-describe">
                            <span style="font-weight: bolder;">
                                作品介绍:
                            </span>
                            <span style="display: block">{{ workDesc }}</span>
                        </div>
                        <div class="work-createtime">
                            <span style="font-weight: bolder;">
                                铸造时间:
                            </span>
                            <span style="display: block">{{ workCreateTime }}</span>
                        </div>
                        <div class="work-hashvalue">
                            <span style="font-weight: bolder;">
                                tokenId:
                            </span>
                            <span style="display: block">{{ workTokenID }}</span>
                        </div>
                        <div class="work-isOnMarket">
                            <span style="font-weight: bolder;">
                                上架状态:
                            </span>
                            <span>{{ (workPrice !== '0' && workPrice !== 0 && workPrice !== '0.')?'已上架':'未上架'}}</span>
                        </div>
                        <div v-if="workPrice !== '0' && workPrice !== 0 && workPrice !== '0.'" class="work-price">
                            <span style="font-weight: bolder;">
                                售价:
                            </span>
                            <span>{{workPrice}} eth</span>
                        </div>
                    </div>
                </div>
                <div class="detail-box-bottom">
                    <div class="back-button">
                        <button @click="backToRecord"> 返回 </button>
                    </div>
                </div>
            </div>
            <div class="cool-text">Details</div>
        </div>
    </transition>
</div>
</template>

<script>
import burn from '@/commons/burn';
import getTokenIdbyURL from '@/commons/getTokenIdbyURL';
import getTokenPrice from '@/commons/getTokenPrice';
import {
    deletePinFromPinata
} from '@/commons/pinata';
import updateTokenPrice from '@/commons/updateTokenPrice';

export default {
    mounted() {
        // 在组件创建时获取路由参数
        this.fileURL = this.$route.query.jsonURL;
        setTimeout(() => {
            this.show = true;
            // call those show func
            this.resolveJSONUrl();
        }, 100)
    },
    data() {
        return {
            workPrice: null,
            radio: '1',
            fileURL: "",
            testURL: "https://brown-urban-hornet-311.mypinata.cloud/ipfs/QmPeyXWXmwEFWL8LusARGZZsQtgf4K8ZrmDu3taavNtVGY",
            show: false,
            picUrl: '',
            workTokenID: '',
            workCreateTime: '',
            workName: "",
            workType: "",
            workDesc: "",
            workPic:"",
        }
    },
    methods: {
        //解析传过来的URL并赋值表单
        //?:文件哈希？交易哈希？TokenID? TID的意义是什么？——先设置成TokenID了,opensea标了TokenID
        async resolveJSONUrl() {
            this.workTokenID = await getTokenIdbyURL(this.fileURL);
            this.workPrice = await getTokenPrice(this.workTokenID)
            if (this.workTokenID != null) {
                fetch(this.fileURL)
                    .then(response => {
                        // 检查响应状态
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        // 解析 JSON 数据
                        return response.json();
                    })
                    .then(async data => {
                        // log整个 JSON 数据
                        console.log(data);
                        // 赋值于details
                        this.picUrl = data.image;
                        this.workPic = this.picUrl;
                        // this.workHashValue = "11"
                        this.workName = data.name;
                        this.workType = data.type;
                        this.workDesc = data.desc;
                        this.workCreateTime = new Date(data.timestamp);
                        // this.workTokenID = await getTokenIdbyURL(this.testURL);
                        if (data.type == 'txt') {
                            this.workType = '文本'
                            this.workPic = require('@/assets/text.png')
                        } else {
                            this.workType = '图片'
                        }

                    })
                    .catch(error => {
                        // 处理错误
                        console.error('There has been a problem with your fetch operation:', error);
                    });
            } else {
                alert("fail to fetch tokenID from url")
            }

        },
        async modifyWork() {
            try {
                // 使用 await 来处理 this.$prompt 返回的 Promise
                const {
                    value
                } = await this.$prompt('请输入售价(单位:eth)', '修改售价', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^(([1-9][0-9]*)|([^0]))$/,
                    inputErrorMessage: '请检查售价格式（只能为数字且不得为0或空）'
                });

                // 使用 await 来处理 updateTokenPrice 返回的 Promise
                let transaction = await updateTokenPrice(this.workTokenID, value);

                console.log("transaction", transaction);

                if (transaction) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                }
                this.workPrice = value;
            } catch (error) {
                console.log(error)
            }
        },
        async activeWork() {
            try {
                // 弹出输入框并等待用户输入
                const {
                    value
                } = await this.$prompt('请输入售价(单位:eth)', '上架作品', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^(([1-9][0-9]*)|([^0]))$/,
                    inputErrorMessage: '请检查售价格式（只能为数字且不得为0或空）'
                });

                // 调用异步函数更新 token 价格
                let transaction = await updateTokenPrice(this.workTokenID, value);

                // 检查交易结果并显示相应消息
                if (transaction) {
                    this.$message({
                        type: 'success',
                        message: '上架成功'
                    });
                }
            } catch (error) {
                console.log(error)
            }
        },
        async inactiveWork() {
            try {
                await this.$confirm('是否确认将作品下架？下架后作品将不在市场上显示。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                let transaction = await updateTokenPrice(this.workTokenID, 0);
                if (transaction) {
                    this.$message({
                        type: 'success',
                        message: '下架成功!'
                    });
                }
            } catch (error) {
                console.log(error)
            }
        },
        //删除nft
        async deleteWork() {
            // 弹出确认框
            const userConfirmed = confirm("Are you sure you want to burn this NFT?");
            if (!userConfirmed) {
                // 用户取消，返回凭证界面
                // this.backToRecord();
                return;
            }

            if (this.workTokenID != null) {
                let delete_meta_res;
                let delete_file_res;

                try {
                    // 调用 burn 方法销毁 NFT
                    const transaction = await burn(this.workTokenID);

                    // 等待交易完成
                    const receipt = transaction; // Web3.js send() 方法直接返回交易收据

                    if (receipt.status) {
                        alert("NFT has been burnt successfully");

                        // 显示加载窗口
                        document.getElementById('loading-overlay').style.display = 'flex';

                        // 删除元数据和文件
                        delete_meta_res = await deletePinFromPinata(this.fileURL);
                        delete_file_res = await deletePinFromPinata(this.picUrl);

                    } else {
                        alert("Failed to burn NFT. Transaction was reverted.");
                    }
                } catch (error) {
                    console.error("Error during NFT burn:", error);
                    alert("An error occurred while burning the NFT: " + error.message);
                } finally {
                    // 成功删除原文件
                    if (delete_meta_res == 200 & delete_file_res == 200) {
                        alert("Successfully unpinned!");
                    } else {
                        if (delete_meta_res != 200) {
                            alert("MetaData unpinned Error, status code: " + delete_meta_res);
                        }
                        if (delete_file_res != 200) {
                            alert("Original file unpinned Error, status code: " + delete_file_res);
                        }
                    }
                    // 隐藏加载窗口
                    document.getElementById('loading-overlay').style.display = 'none';
                    // 返回凭证界面
                    this.backToRecord();
                }
            }
        },
        //下载nft源文件
        async downloadFile() {
            try {
                const response = await fetch(this.picUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = this.workName || 'download';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        },
        //返回到我的交易记录列表路由
        backToRecord() {
            this.$router.push('/recordWorks');
        },
    }
}
</script>

<style>
.container {
    max-height: 100vh;
    overflow: hidden;
    width: 100vw;
}

.content {
    max-width: 90%;
    height: 100%;
    margin-left: 10%;
    position: relative;
    display: flex;
    flex-direction: column;
}

.cool-text {
    position: absolute;
    z-index: 0;
    font-size: 4.5em;
    top: 0;
    left: 75px;
    color: rgba(255, 87, 51, 0.8);
}

.detail-box {
    margin: 60px 60px;
    color: #ffffff;
    background-color: #303030;
    box-shadow: 0px 4px 15px #000000;
    height: 80vh;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.work-name,
.work-type,
.work-describe,
.work-createtime,
.work-hashvalue {
    text-align: left;
}

.detail-box-top {
    flex: 9;
    width: 100%;
    display: flex;
    margin-top: 50px;
}

.detail-box-top-left {
    flex: 1;
}

.work-download {
    margin-top: 30px;
}

.work-download button {
    margin: auto;
    flex: 1;
    border: 1px solid #9c9c9c;
    cursor: pointer;
    width: 180px;
    color: #9c9c9c;
    background-color: transparent;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
}

.work-download button:hover {
    border: 1px solid rgba(255, 87, 51, 1);
    color: rgba(255, 87, 51, 1);
}

.detail-box-top-right {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: self-start;
    margin-right: 30px;
    font-size: 17px;
}

.detail-box-top-right .data-describe {
    flex: 6;
    margin-right: 30px;
}

.detail-box-top-right .data-select {
    flex: 2;

}

.detail-box-bottom {
    flex: 2;
    /* border:1px solid green; */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.detail-box-bottom button,
.modal-overlay button {
    margin: auto;
    flex: 1;
    border: 1px solid rgba(255, 87, 51, 1);
    cursor: pointer;
    width: 180px;
    color: rgba(255, 87, 51, 0.8);
    background-color: transparent;
    border-radius: 5px;
    height: 30px;
}

.delete-work {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
}

.modify-price {
    position: absolute;
    top: 20px;
    right: 130px;
    z-index: 2;
}

.inactive-work {
    position: absolute;
    top: 20px;
    right: 240px;
    z-index: 2;
}

.delete-work a,
.modify-price a,
.inactive-work a {
    color: #9c9c9c;
    font-size: 15px;
    text-decoration: none;
}

.delete-work a:hover,
.modify-price a:hover,
.inactive-work a:hover {
    color: rgba(255, 87, 51, 1);
}

/* 加载窗口样式 */
#loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.spinner {
    border: 8px solid rgba(255, 255, 255, 0.3);
    border-top: 8px solid #fff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
    margin-right: 30px;
}

.loading-message {
    margin-top: 20px;
    color: white;
    font-size: 18px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 半透明背景 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* 确保模态框在最上层 */
}

/* 模态框内容 */
.modal-content {
    color: #9c9c9c;
    background-color: #292929;
    padding: 40px;
    border-radius: 8px;
    width: 400px;
    max-width: 80%;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.5);
    position: relative;
    /* 为了定位关闭按钮 */
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    background: none;
    border: none;
    color: #000;
    padding: 0;
}

.close-button:hover {
    color: #f00;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
