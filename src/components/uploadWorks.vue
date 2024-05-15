<template>
<div class="container">
    <transition name="el-fade-in-linear">
<<<<<<< HEAD
        <div class="content" v-show="show">
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
=======
        <div class="content" v-show = "show">
            <el-form ref="form" :model="form" label-width="100px">
>>>>>>> 9633f9128941749de620a797008ad4fe608c29cf
                <div class="upload-box">
                    <div class="upload-box-top">
                        <div class="upload-box-top-left" style="color:white">
                            这里会有一个头像上传
                        </div>
                        <div class="upload-box-top-right">
                            <div class="line1">
                                <div class="data-name">
<<<<<<< HEAD
                                    <el-form-item required label="作品名称" class="upload-form-item" prop="name">
=======
                                    <el-form-item required label="作品名称" class="upload-form-item">
>>>>>>> 9633f9128941749de620a797008ad4fe608c29cf
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="data-type">
<<<<<<< HEAD
                                    <el-form-item style="flex: 1" required label="作品类别" prop="type">
=======
                                    <el-form-item style="flex: 1" required label="作品类别">
>>>>>>> 9633f9128941749de620a797008ad4fe608c29cf
                                        <Select style="width: 100%;" size="large" v-model="form.region">
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
<<<<<<< HEAD
                                <el-upload class="upload-demo" ref="upload" multiple:false limit:1 action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false">
=======
                                <el-upload class="upload-demo" ref="upload" multiple:false limit:1 action="https://jsonplaceholder.typicode.com/posts/"  :auto-upload="false">
>>>>>>> 9633f9128941749de620a797008ad4fe608c29cf
                                    <button slot="trigger" size="small" type="primary">选取文件</button>
                                </el-upload>
                            </div>
                        </div>
                    </div>
                    <div class="upload-box-bottom">
                        <div class="submitt-button">
<<<<<<< HEAD
                            <button @click="submit('form')"> 提交 </button>
=======
                            <button> 提交 </button>
>>>>>>> 9633f9128941749de620a797008ad4fe608c29cf
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
export default {
<<<<<<< HEAD
    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 100)
    },
    data() {
        return {
            show: false,
            form: {
                name: '',
                time: '',
                type: '',
                desc: '',
                creator: ' ',
            },
            rules: {
                name: [{
                        required: true,
                        message: '请输入用户名',
                    },
                    {
                        max: 12,
                        message: '用户名不能超过12个字符',
                    },
                ],
                type: [{
                    required: true,
                    message: '请选择类别',
                }, ],
            },
        }

    },

    methods: {
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({
                        showClose: true,
                        message: '验证通过',
                        type: 'success'
                    });
                }
            })
        }
    }
=======
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
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                creator: ' ',
            }
        }
    },
    methods: {}
>>>>>>> 9633f9128941749de620a797008ad4fe608c29cf
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
