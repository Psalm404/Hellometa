<template>
<div class="container">
    <transition name="el-fade-in-linear">
        <div class="content" v-show = "show">
            <el-form ref="form" :model="form" label-width="100px">
                <div class="upload-box">
                    <div class="upload-box-top">
                        <div class="upload-box-top-left" style="color:white">
                            <!-- 这里会有一个头像上传 -->
                        </div>
                        <div class="upload-box-top-right">
                            <div class="line1">
                                <div class="data-name">
                                    <el-form-item required label="作品名称" class="upload-form-item">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="data-type">
                                    <el-form-item style="flex: 1" required label="作品类别">
                                        <Select style="width: 100%;" size="large" v-model="form.type">
                                            <Option el-option label="文本" value="txt"></Option>
                                            <Option label="图片" value="pic"></Option>
                                        </Select>
                                    </el-form-item>

                                </div>
                            </div>
                            <div class="data-creator">
                                <el-form-item required label="作者名称">
                                    <el-input v-model="form.creator" resize="none"></el-input>
                                </el-form-item>
                            </div>
                            <div class="data-describe">
                                <el-form-item required label="作品介绍">
                                    <el-input type="textarea" :rows="9" v-model="form.desc" resize="none"></el-input>
                                </el-form-item>
                            </div>

                            <div class="data-select">
                                <el-upload 
                                    class="upload-demo" 
                                    ref="upload" 
                                    multiple:false 
                                    limit:1 
                                    :auto-upload="false"
                                    :on-change="onChangeFile"
                                >
                                    <button slot="trigger" size="small" id="list-button" @click.prevent type="primary">选取文件</button>
                                </el-upload>
                            </div>
                        </div>
                    </div>
                    <div class="upload-box-bottom">
                        <div class="submitt-button">
                            <button type="primary" @click.prevent="mintNFT">mintNFT</button>
                        </div>
                    </div>
                </div>
            </el-form>
            <div class="cool-text">UPLOAD</div>
        </div>
    </transition>
</div>
</template>

<script>
// import axios from 'axios';  // 引入axios库用于发送HTTP请求

import {
    uploadFileToIPFS,
    uploadJSONToIPFS,
} from '@/commons/pinata';

import {
    getAccountAddr
} from '@/commons/getAccountAddr';

import mint from '@/commons/mint';
import getTransactionHash from '@/commons/getTransactionHash'
// import getAllURLs from '@/commons/getAllURLs';

export default {
    mounted(){
      setTimeout(()=>{
        this.show = true;
      },100)
    },
    data() {
        return {
            show:false,
            //  表单验证用，还没写
            form: {
                name: '',
                type: '',
                creator: ' ',                
                desc: '',
            },
            uploadedStatus:'',
            fileURL: null,
        }
    },
    methods: {
        async onChangeFile(file){
            try{
                // let array = await getAllURLs()
                // alert(array);
                this.disableButton();
                this.file = file;
                if(this.file==null){ 
                    return this.$message.error("请先选取文件！"); 
                } 
                alert(file.name);
                const response = await uploadFileToIPFS(this.file);
                if(response.success === true) {
                    this.enableButton();
                    // this.$refs.upload.clearFiles(); // 清除已选取的文件
                    this.fileURL = response.pinataURL;
                    alert(this.fileURL);
                }else{
                    alert(response.message);
                }    
            } catch(e) {
                console.log("Error during file upload", e);
            }
        
        },
        async mintNFT(){
            //Upload data to IPFS
            try {
                const metadataURL = await this.uploadMetadataToIPFS();
                if(metadataURL === -1){
                    this.$message.info('metadataURL=-1!');
                    return;
                }
                const addr = await getAccountAddr();
                alert(addr);
                
                // 调用智能合约的 mint 函数
                await mint(addr, metadataURL);

                const txhash = await getTransactionHash(metadataURL);
                
                alert(txhash);
            }
            catch(e) {
                alert( "Upload error"+e )
            }
        },
        async uploadMetadataToIPFS(){
            const {name, type, creator, desc} = this.form;
            if( !name || !type || !creator || !desc || !this.fileURL)
            {
                this.$message.info("Please fill all the fields!");
                return -1;
            }

            const nftJSON = {
                name, type, creator,desc, image: this.fileURL
            }

            try {
                //upload the metadata JSON to IPFS
                const response = await uploadJSONToIPFS(nftJSON);
                if(response.success === true){
                    console.log("Uploaded JSON to Pinata: ", response)
                    // return response.pinataURL;
                    alert("Uploaded JSON to Pinata: "+ response.pinataURL)
                    return response.pinataURL;
                }
            }
            catch(e) {
                console.log("error uploading JSON metadata:", e)
            }
        },
        async disableButton() {
            const listButton = document.getElementById('list-button');
            if (listButton) {
                listButton.disabled = true;
                listButton.style.backgroundColor = 'grey';
                listButton.style.opacity = 0.3;
            }
        },
        async enableButton() {
            const listButton = document.getElementById('list-button');
            if (listButton) {
                listButton.disabled = false;
                listButton.style.backgroundColor = 'transparent';
                listButton.style.opacity = 1;
            }
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

.el-form-item label {
    color: white;
}

.el-input input,
.el-textarea textarea {
    color: #9C9C9C;
    border-color: rgba(156, 156, 156, 0.3);
    background-color: transparent;
    border-radius: 5px;
}

.ivu-select div,
span {
    background-color: transparent;
    cursor: pointer;
    color: #9C9C9C;
    border-radius: 5px;
    border-color: rgba(156, 156, 156, 0.3);
    outline: none;
}

.ivu-select li {
    background-color: rgb(48, 48, 48);
    cursor: pointer;
    color: #9C9C9C;
    border-radius: 5px;
}

.ivu-select-visible .ivu-select-selection,
.ivu-select :hover,
:focus,
.el-input input:hover,
.el-textarea textarea:hover {
    border-color: rgba(255, 87, 51, 1);
}

.el-input input:focus,
.el-textarea textarea:focus {
    color: #9C9C9C;
    border: 1px solid rgba(255, 87, 51, 1);
    border-radius: 5px;
}

.cool-text {
    position: absolute;
    z-index: 0;
    font-size: 4.5em;
    top: 0;
    left: 75px;
    color: rgba(255, 87, 51, 0.8);
}

.upload-box {
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

.upload-box-top {
    flex: 9;
    width: 100%;
    display: flex;
    margin-top: 30px;
}

.upload-box-top-left {
    flex: 1;
}

.upload-box-top-right {

    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.upload-box-top-right .line1 {

    flex: 1;
    display: flex;
    gap: 10px;
}

.line1 .data-name {
    justify-content: center;
    flex: 1;
}

.line1 .el-form-item {
    flex: 1;
    margin-top: 15px;
}

.line1 .data-type {

    flex: 1;
    margin-right: 30px;
}

.data-creator {
    width: 45%;
}

.upload-box-top-right .data-describe {
    flex: 6;
    margin-right: 30px;
}

.upload-box-top-right .data-select {
    flex: 2;

}

.data-select button {
    width: 600px;
    background-color: transparent;
    border: 1px solid #9C9C9C;
    cursor: pointer;
    border-radius: 5px;
    color: white;
    height: 35px;
}

.upload-box-bottom {
    flex: 2;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.upload-box-bottom button {
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
