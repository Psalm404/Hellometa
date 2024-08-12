<!-- 文件展示细节封装成单独的文件，exhibit和record共用一套逻辑 -->
<template>
<div>
    <div class="grid-subitem">
        <div class="grid-item-top">
            <div class="grid-item-top-top">
                <div class="grid-item-top-left">
                    <div class="record-picture">
                        <el-avatar shape="square" :size="115" :src="picUrl"></el-avatar>
                    </div>
                </div>
                <div class="grid-item-top-right">
                    <div class="record-name">
                        <span class="record-name-title">作品名称：</span>
                        <span style="font-weight:bolder; display: block; align-self: self-start">{{ recordName }}</span>
                    </div>
                    <div class="record-type">
                        <span>作品类别：{{ recordType }}</span>
                    </div>
                    <div v-if = "recordPrice" class="record-price">
                        <span>售价：{{ recordPrice }} wei</span>
                    </div>
                </div>
            </div>

            <div class="grid-item-top-bottom">
                <div class="record-desc">
                    <span>作品描述:</span>
                    <span style="display:block; margin-top:5px; margin-left:15px; font-weight:bolder; font-size:small">{{
                    recordDesc }}</span>
                </div>
            </div>
            
        </div>
        <div class="grid-item-bottom">
            <button @click="toInfo">
                查看凭证
            </button>
        </div>
    </div>

</div>
</template>

<script>
import axios from 'axios'
import getTokenIdbyURL from '@/commons/getTokenIdbyURL'
import getTokenPrice from '@/commons/getTokenPrice'
export default {
    name: 'subInfo',
    props: ["fileURL", "source"],
    mounted() {
        console.log('this.fileURL:', this.fileURL)
        console.log('this.source', this.source)
        this.fetchData();
    },
    watch: {
        fileURL() {
            this.fetchData();
        },
    },
    data() {
        return {
            show: false,
            picUrl: "",
            searchName: '',
            recordName: "",
            recordDesc: "",
            recordType: "",
            recordPrice:null,
            tokenID:"",
        };
    },
    methods: {
        async fetchData() {
            try {
                let response = await axios.get(this.fileURL)
                let jsonData = response.data
                console.log("in subinfo", jsonData)
                this.recordName = jsonData.name
                this.recordDesc = jsonData.desc
                let tokenID = await getTokenIdbyURL(this.fileURL) //从url拿一次tokenid，再从tokenid拿价格
                this.recordPrice = await getTokenPrice(tokenID)
               // this.recordPrice = jsonData.price
                if (jsonData.type == 'pic') {
                    this.recordType = '图片'
                    this.picUrl = jsonData.image
                }
            } catch (e) {
                console.log(e)
            }
        },
        toInfo() {
            console.log('source', this.source)
            if (this.source == 'exhibit') {
                this.$router.push('/workInfo?jsonURL=' + this.fileURL);
            } else if (this.source == "record") {
                this.$router.push('/workDetails?jsonURL=' + this.fileURL); //路由传参
            }
        }
    }
}
</script>

<style>
.grid-subitem {
    padding: 15px;
    height: 330px;
    text-align: center;
    display: flex;
    flex-direction: column;
}

.grid-item-top {
    flex: 5;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* border:1px solid red; */
}

.grid-item-top-top {
    flex: 1;
    display: flex;
    gap: 10px;
    /* border: 1px solid green; */
}

.grid-item-top-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: self-start;
}

.record-name {
    margin-top: 10px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.record-type {
    flex: 1;
    align-self: self-start;
}
.record-price {
    flex: 1;
    align-self: self-start;
}

.grid-item-bottom .grid-item-top-left {
    flex: 1;
}

.grid-item-top-bottom {
    flex: 3;
}

.record-desc {
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
}

.grid-item-bottom button {
    margin-top: 10px;
    flex: 1;
    border: 1px solid rgba(255, 87, 51, 1);
    cursor: pointer;
    width: 150px;
    color: rgba(255, 87, 51, 0.8);
    background-color: transparent;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
}
</style>
