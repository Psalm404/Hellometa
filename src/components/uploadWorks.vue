<template>
<div class="container">
    <div id="loading-overlay" style="display: none;">
        <div class="spinner"></div>
        <div class="loading-message">正在上传文件，请稍候...</div>
    </div>
    <div class="content">
        <el-form ref="form" :model="form" :rules="rules">
            <transition name="el-fade-in-linear">
                <div class="upload-box" v-show="show[1]">
                    <el-steps :active="1" align-center>
                        <el-step title="步骤1" description="填写公司名称"></el-step>
                        <el-step title="步骤2" description="选择资产类别"></el-step>
                        <el-step title="步骤3" description="填写资产信息"></el-step>
                        <el-step title="步骤4" description="上传资产"></el-step>
                    </el-steps>
                    <div class="upload-text1">请填写公司名称:</div>
                    <div class="data-creator">
                        <el-form-item prop="creator">
                            <el-input v-model="form.creator" resize="none"></el-input>
                        </el-form-item>
                    </div>
                    <div class="arrow-box">
                        <a></a>
                        <div style="width:90%; display:inline-block"> </div>
                        <a class="el-icon-right" @click="toUpload(1, 2, 'creator')"></a>
                    </div>
                </div>
            </transition>

            <transition name="el-fade-in-linear">
                <div class="upload-box" v-show="show[2]">
                    <el-steps :active="2" align-center>
                        <el-step title="步骤1" description="填写公司名称"></el-step>
                        <el-step title="步骤2" description="选择资产类别"></el-step>
                        <el-step title="步骤3" description="填写资产信息"></el-step>
                        <el-step title="步骤4" description="上传资产"></el-step>
                    </el-steps>
                    <div class="upload-text1">请选择资产类别:</div>
                    <div class="data-type">
                        <el-form-item prop="type" required>
                            <Select style="width: 100%;" size="large" v-model="form.type">
                                <Option el-option label="文本(.txt/.md/.doc/.docx)" value="txt"></Option>
                                <Option label="图片(.jpg/.jpeg/.png)" value="pic"></Option>
                            </Select>
                        </el-form-item>
                    </div>
                    <div style="display:flex; gap: 25px;">
                        <div class="upload-text1">是否上架市场:</div>
                        <div class="data-sell">
                            <el-form-item required>
                                <el-radio v-model="form.radio" label="1">是</el-radio>
                                <el-radio v-model="form.radio" label="2">否</el-radio>
                            </el-form-item>
                        </div>
                    </div>
                    <div v-if="form.radio === '1'">
                        <div style="display:flex; gap: 25px;">
                            <div class="upload-text1">定价(单位:wei):</div>
                            <el-form-item prop="price" required>
                                <el-input v-model="form.price" resize="none" placeholder="请输入定价"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <div class="arrow-box">
                        <a class="el-icon-back" @click="toUpload(2, 1,'')"></a>
                        <div style="width:90%; display:inline-block"> </div>
                        <a class="el-icon-right" @click="toUpload(2, 3,'type')"></a>
                    </div>
                </div>
            </transition>

            <transition name="el-fade-in-linear">
                <div class="upload-box" v-show="show[3]">
                    <el-steps :active="3" align-center>
                        <el-step title="步骤1" description="填写公司名称"></el-step>
                        <el-step title="步骤2" description="选择资产类别"></el-step>
                        <el-step title="步骤3" description="填写资产信息"></el-step>
                        <el-step title="步骤4" description="上传资产"></el-step>
                    </el-steps>
                    <div class="upload-text1">请填写资产信息:</div>
                    <div class="data-message" style="width:70%;height:100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="data-creator">
                            <el-form-item label="资产名称" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="data-describe">
                            <el-form-item label="资产介绍" prop="desc">
                                <el-input type="textarea" :rows="6" v-model="form.desc" resize="none"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="arrow-box">
                        <a class="el-icon-back" @click="toUpload(3, 2,'')"></a>
                        <div style="width:90%; display:inline-block"> </div>
                        <a class="el-icon-right" @click="toUpload(3, 4,'name')"></a>
                    </div>
                </div>
            </transition>

            <transition name="el-fade-in-linear">
                <div class="upload-box" v-show="show[4]">
                    <el-steps :active="4" align-center>
                        <el-step title="步骤1" description="填写公司名称"></el-step>
                        <el-step title="步骤2" description="选择资产类别"></el-step>
                        <el-step title="步骤3" description="填写资产信息"></el-step>
                        <el-step title="步骤4" description="上传资产"></el-step>
                    </el-steps>
                    <div class="upload-text1">请上传资产:</div>
                    <div class="data-select">
                        <el-upload class="upload-demo" ref="upload" multiple:false limit:1 :auto-upload="false" :on-change="onChangeFile" :before-remove="() => false">
                            <button slot="trigger" size="small" id="list-button" @click.prevent type="primary" style="color:#9C9C9C">选取文件</button>
                        </el-upload>
                    </div>
                    <div class="arrow-box">
                        <a class="el-icon-back disabled" style="color:transparent"></a>
                        <div style="width:90%; display:inline-block"> </div>
                        <a style="font-size:17px" @click="mintNFT()">铸造 </a>

                    </div>
                </div>
            </transition>

        </el-form>
        <div class="cool-text">UPLOAD</div>
    </div>

</div>
<!-- <div class="container">
    <transition name="el-fade-in-linear">
        <div class="content" v-show = "show">
            <el-form ref="form" :model="form" label-width="100px">
                <div class="upload-box">
                    <div class="upload-box-top">
                        <div class="upload-box-top-left" style="color:white">
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
</div> -->
</template>

<script>
import {
    uploadFileToIPFS,
    uploadJSONToIPFS,
    deletePinFromPinata,
} from '@/commons/pinata';

import {
    getAccountAddr
} from '@/commons/getAccountAddr';

import mint from '@/commons/mint';

export default {
    mounted() {
        setTimeout(() => {
            this.$set(this.show, 1, true);
            console.log('show1', this.show[1])
        }, 200)
    },
    data() {
        return {
            show: [false, false, false, false, false],
            form: {
                name: '',
                type: '',
                creator: '',
                desc: '',
                radio: '2',
                price: 0,
            },
            uploadedStatus: '',
            fileURL: null,
            rules: {
                name: [{
                        required: true,
                        message: '请输入数据名称',
                        trigger: 'blur'
                    },
                    {
                        max: 15,
                        message: '长度不超过15个字符',
                        trigger: 'blur'
                    }
                ],
                type: [{
                    required: true,
                    message: '请选择类型',
                }],
                price:[{
                    required: true,
                    message: '请输入定价',
                }],
                creator: [{
                        required: true,
                        message: '请输入公司名称',
                        trigger: 'blur'
                    },
                    {
                        max: 15,
                        message: '长度不超过15个字符',
                        trigger: 'blur'
                    }
                ],
                desc: [{
                        required: true,
                        message: '请输入作品描述',
                        trigger: 'blur'
                    },
                    {
                        max: 50,
                        message: '长度不超过120个字符',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        toUpload(from, to, field) {
            let isPass = false;
            if (!field) {
                isPass = true;
            }
            if (from != 3 && field) {
                this.$refs.form.validateField(field, (valid) => {
                    console.log('valid：', valid)
                    if (!valid) {
                        isPass = true;
                        console.log('field:', this.form.creator)
                    }
                });
            } else if (from == 3 && field) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        isPass = true;
                    } else {
                        this.$message.error('提交失败，请检查表单项');
                        return false;
                    }
                });
            }
            if (isPass) {
                console.log(this.form.type)
                console.log('switch')
                this.$set(this.show, from, false);
                setTimeout(() => {
                    this.$set(this.show, to, true);
                }, 400);
            }

        },
        //选择文件，选择即上传IPFS
        async onChangeFile(file) {
            try {
                const validTextTypes = ['txt', 'md', 'doc', 'docx'];
                const validImgTypes = ['jpg', 'jpeg', 'png'];
                const isValidText = validTextTypes.includes(file.name.split('.').pop().toLowerCase());
                const isValidImg = validImgTypes.includes(file.name.split('.').pop().toLowerCase());

                if (file == null) {
                    return this.$message.error("请先选取文件！");
                }
                if ((this.form.type == 'txt' && !isValidText) || (this.form.type == 'pic' && !isValidImg)) {
                    this.$message.error("请选择符合资产类别的文件")
                    this.$refs.upload.clearFiles(); // 清除已选取的文件
                    return;
                }

                this.disableButton();
                this.file = file;
                console.log(file.name);
                const response = await uploadFileToIPFS(this.file); //上传IPFS
                if (response.success === true) {
                    this.$message.success("文件成功上传至pinata")
                    document.getElementById('loading-overlay').style.display = 'none';
                    this.fileURL = response.pinataURL;
                    console.log('该文件的url', this.fileURL);
                } else {
                    this.$message.error("文件在上传至Pinata失败")
                    this.enableButton();
                    console.log(response.message);
                }
            } catch (e) {
                console.log("Error during file upload", e);
            }

        },
        async mintNFT() {
            try {
                //Upload metadata to IPFS
                const metadataURL = await this.uploadMetadataToIPFS();
                if (metadataURL === -1) {
                    this.$message.error('文件上传未完成');
                    return;
                }
                //mint metadata to the chain
                document.querySelector('#loading-overlay .loading-message').textContent = '资产凭证铸造中，请稍后......';
                document.getElementById('loading-overlay').style.display = 'flex';
                const addr = await getAccountAddr();
                console.log('用户地址', addr);
                let isSuccess = await mint(addr, metadataURL,this.form.price);
                if (isSuccess) {
                    document.querySelector('#loading-overlay .loading-message').textContent = '资产凭证铸造成功！\n即将跳转至您的凭证记录界面......';
                    document.getElementById('loading-overlay').style.display = 'none';
                    setTimeout(() => {
                        this.$router.push('/recordWorks');
                    }, 500)

                } else {
                    let delete_meta_res;
                    let delete_file_res;

                    document.querySelector('#loading-overlay .loading-message').textContent = '资产凭证铸造失败！\n开始将文件与文件源数据从Pinata删除......';
                    // 从pinata删除刚上传的文件
                    delete_meta_res = await deletePinFromPinata(metadataURL);
                    delete_file_res = await deletePinFromPinata(this.fileURL);
                    // 成功删除原文件
                    if (delete_meta_res == 200 & delete_file_res == 200) {
                        document.querySelector('#loading-overlay .loading-message').textContent = '删除完成，即将刷新界面......';
                        this.$router.go(0);
                    } else {
                        if (delete_meta_res != 200) {
                            document.querySelector('#loading-overlay .loading-message').textContent = "删除元数据错误\nMetaData unpinned Error, status code: " + delete_meta_res + "\n即将跳转至错误报告界面......";
                        }
                        if (delete_file_res != 200) {
                            document.querySelector('#loading-overlay .loading-message').textContent = "删除源文件错误\nOriginal file unpinned Error, status code: " + delete_file_res + "\n即将跳转至错误报告界面......";
                        }
                        setTimeout(() => {
                            document.getElementById('loading-overlay').style.display = 'none';
                            //设置一个错误报告界面？连接开发人员什么的
                            this.$router.push('/home');
                        }, 500)
                    }
                }
            } catch (e) {
                console.log("Upload error" + e)
            }
        },
        async uploadMetadataToIPFS() {
            const {
                name,
                type,
                creator,
                desc,
                price,
            } = this.form;
            if (!name || !type || !creator || !desc || !this.fileURL) {
                // this.$message.info("Please fill all the fields!");
                return -1;
            }

            const nftJSON = {
                name,
                type,
                creator,
                desc,
                image: this.fileURL,
                price,
                timestamp: Date.now(), // 添加当前时间戳
            }

            try {
                //upload the metadata JSON to IPFS
                const response = await uploadJSONToIPFS(nftJSON);
                if (response.success === true) {
                    // console.log("Uploaded JSON to Pinata: ", response)
                    console.log("Uploaded JSON to Pinata: " + response.pinataURL)
                    return response.pinataURL;
                }
            } catch (e) {
                console.log("error uploading JSON metadata:", e)
            }
        },
        //用来使能/禁止选择文件按钮的两个函数
        async disableButton() {
            document.getElementById('loading-overlay').style.display = 'flex';
            const listButton = document.getElementById('list-button');
            if (listButton) {
                listButton.disabled = true;
                listButton.style.backgroundColor = 'grey';
                listButton.style.opacity = 0.3;
            }
        },
        async enableButton() {
            document.getElementById('loading-overlay').style.display = 'none';
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

.el-steps {
    width: 100%;
    margin-top: 60px;
    margin-bottom: 40px;
}

.content {
    max-width: 90%;
    height: 80vh;
    border: 1px solid rex;
    margin-left: 10%;
    position: relative;
    display: flex;
    flex-direction: column;
}

.el-step__head.is-finish,
.el-step__title.is-finish,
.el-step__description.is-finish {
    color: rgba(255, 87, 51, 1);
    border-color: rgba(255, 87, 51, 1);
}

.el-step__head.is-process,
.el-step__title.is-process,
.el-step__description.is-process {
    color: rgba(255, 87, 51, 1);
    border-color: rgba(255, 87, 51, 1);
}

.el-step__icon.is-text {
    background-color: rgb(41, 41, 41);
}

.arrow-box {
    position: absolute;
    align-self: center;
    top: 40vh;
    width: 100%;
    z-index: -1;
}

.arrow-box a {
    font-size: 40px;
    color: #9C9C9C;

}

.arrow-box a:hover {
    font-size: 40px;
    color: rgba(255, 87, 51, 1);
}

.arrow-box a.disabled {
    pointer-events: none;

    opacity: 0.5;
}

.upload-text1 {
    font-size: 25px;
    color: #9C9C9C;
}

.data-type {
    width: 30%;
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
    z-index: 999;
    font-size: 4.5em;
    top: 0;
    left: 75px;
    color: rgba(255, 87, 51, 0.8);
}

.upload-box {
    margin: 60px 60px;
    background-color: transparent;
    height: 80vh;
    align-items: center;
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 30px;

}

.data-creator,
.data-describe {
    width: 50%;
    align-items: center;
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
</style>
