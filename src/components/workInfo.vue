<template>
<div class="container">
    <transition name="el-fade-in-linear">
        <div class="content" v-show="show">
            <div class="detail-box">
                <div class="detail-box-top">
                    <div class="detail-box-top-left">
                        <div class="record-picture">
                            <el-avatar shape="square" :size="220" :src="picUrl"></el-avatar>
                        </div>
                        <div class="price-box">
                            售价：{{workPrice}} eth
                        </div>
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
                        <div class="work-creator">
                            <span style="font-weight: bolder;">
                                作者名称:
                            </span>
                            <span style="display: block">{{ workCreator }}</span>
                        </div>
                        <div class="work-createtime">
                            <span style="font-weight: bolder;">
                                创建时间:
                            </span>
                            <span style="display: block">{{ workCreateTime }}</span>
                        </div>
                        <div class="work-tokenID">
                            <span style="font-weight: bolder;">
                                tokenId:
                            </span>
                            <span style="display: block">{{ workTokenID }}</span>
                        </div>
                        <div class="work-hashvalue">
                            <span style="font-weight: bolder;">
                                Transaction Hash:
                            </span>
                            <span style="display: block">{{ workHashValue }}</span>
                        </div>
                    </div>
                </div>
                <div class="detail-box-bottom">
                    <div>
                        <button @click="buyNFT"> 购买 </button>
                    </div>
                    <div class="back-button">
                        <button @click="backToRecord"> 返回 </button>
                    </div>
                </div>
            </div>
            <div class="cool-text">DETAILS</div>
        </div>
    </transition>
</div>
</template>

<script>
// 这里先从 exhibitWorks 中拿到当前 nft 的 url
// 然后导入 pinata 的解析url函数，拿到一个 json 
// 这个 json 文件包含了 picUrl、workCreateTime、workName、workType、workDesc
// workCreator 可以通过调用 ownerOfURL 获取这个账户的地址

// 引入 axios 用于 HTTP 请求
import axios from 'axios';
import getTransactionHash from '@/commons/getTransactionHash';
import getTokenIdbyURL from '@/commons/getTokenIdbyURL';
import getTokenPrice from '@/commons/getTokenPrice';
import buyToken from '@/commons/buyToken';
import updateTokenPrice from '@/commons/updateTokenPrice';
export default {
    mounted() {
        // 在组件创建时获取路由参数
        this.fileURL = this.$route.query.jsonURL;
        setTimeout(() => {
            this.show = true;
            this.fetchNFTData();
        }, 100)
    },
    data() {
        return {
            show: false,
            fileURL: "",
            picUrl: "", // 默认图片，加载完成后会被替换
            workHashValue: '', // 哈希值是从 exhibitWorks 中获取的
            workCreateTime: '',
            workCreator: '',
            workName: '',
            workType: '',
            workDesc: '',
            workTokenID: '',
            workIsOnMarket: 0,
            workPrice: null,
        }
    },
    methods: {
        async buyNFT() {
            try {
                let txHash = await buyToken(this.workTokenID, this.workPrice);
                let transaction = await updateTokenPrice(this.workTokenID, 0);

                console.log("transaction", transaction);
                if (txHash) {
                    this.$message({
                        type: 'success',
                        message: '购买成功!'
                    });
                }

            } catch (error) {
                console.log(error)
            }

        },
        async fetchJson(jsonURL) {
            try {
                let response = await axios.get(jsonURL)
                let jsonData = response.data
                this.workCreateTime = new Date(jsonData.timestamp)
                console.log("workCreateTime", this.workCreateTime)
                this.workName = jsonData.name
                this.workType = jsonData.type
                this.workDesc = jsonData.desc
                this.workTokenId = await getTokenIdbyURL(jsonURL)
                this.workPrice = await getTokenPrice(this.workTokenID)
                console.log(this.workTokenId)
                this.picUrl = jsonData.image
                if (jsonData.type == 'txt') {
                    this.workType = '文本'
                    this.picUrl = require('@/assets/text.png')
                }else{
                     this.workType = '图片'
                }
            } catch (e) {
                console.log(e)
            }
           

        },
        backToRecord() {
            this.$router.push('/exhibitWorks');
        },
        async fetchNFTData() {
            //先加一下，每家error判断
            this.workTokenID = await getTokenIdbyURL(this.fileURL);

            try {
                // const nftUrl = 'https://brown-urban-hornet-311.mypinata.cloud/ipfs/QmXwfXkjs4sFXBN5yXeokSAVJFR6PCVBd2KoNH1gBFK6oP'; // 从 exhibitWorks 中拿到的当前 NFT 的 URL
                const nftData = await this.fetchFromPinata(this.fileURL);

                this.picUrl = nftData.image;
                this.workCreateTime = new Date().toLocaleString();
                this.workName = nftData.name;
                this.workType = nftData.type;
                this.workDesc = nftData.desc;
                this.workCreator = nftData.creator;
                this.workPrice = await getTokenPrice(this.workTokenID)
                this.workHashValue = await getTransactionHash(this.fileURL);
                if (nftData.type == 'txt') {
                    this.workType = '文本'
                    this.picUrl = require('@/assets/text.png')
                }else{
                     this.workType = '图片'
                }
            } catch (error) {
                console.error('Error fetching NFT data:', error);
            }
        },
        async fetchFromPinata(url) {
            // 使用 axios 获取 JSON 数据
            const response = await axios.get(url);
            return response.data;
        }
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

.detail-box {
    margin: 60px 60px;
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
.work-tokenID,
.work-hashvalue,
.work-creator {
    text-align: left;
}

.detail-box-top {
    flex: 9;
    width: 100%;
    display: flex;
    margin-top: 50px;
    /* border:1px solid red; */
}

.detail-box-top-left {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.price-box {
    text-align: center;
    /* border:1px solid red; */
    margin-top: 40px;
    flex: 1;
    color: #9c9c9c;
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
    flex-direction: row;
    /* border: 1px solid red; */
    align-items: center;
    justify-content: center;
    gap: 200px;
}

.detail-box-bottom button {
    margin: auto;
    flex: 1;
    border: 1px solid rgba(255, 87, 51, 1);
    cursor: pointer;
    width: 180px;
    color: rgba(255, 87, 51, 0.8);
    background-color: transparent;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
}
</style>
