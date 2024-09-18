<template>
    <div class="register-container">
        <div class="register-box">
            <div class="register-text">
                <h2>👋欢迎来到HelloMeta!</h2>
                <h3>注册账号，为您的作品进行数字确权:</h3>
                ❕：标有 * 的为必填项
            </div>
            <el-form :model="formData" :rules="rules" ref="formData">
                <div class="register-columns">
                    <!-- 第一列 -->
                    <div class="column">
                        <div class="register-input">
                            <label>*设置用户id</label>
                            <el-form-item prop="account">
                                <el-input type="text" v-model="formData.account"></el-input>
                            </el-form-item>
                        </div>
                        <div class="register-input">
                            <label>*设置用户名</label>
                            <el-form-item prop="name">
                                <el-input type="text" v-model="formData.name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="register-input">
                            <label>*设置密码</label>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="formData.password" show-password></el-input>
                            </el-form-item>
                        </div>
                        <div class="register-input">
                            <label>*确认密码</label>
                            <el-form-item prop="confirmPassword">
                                <el-input type="password" v-model="formData.confirmPassword" show-password></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <!-- 第二列 -->
                    <div class="column">
                        <div class="register-input">
                            <label>设置手机号</label>
                            <el-form-item prop="phone">
                                <el-input type="text" v-model="formData.phone"></el-input>
                            </el-form-item>
                        </div>
                        <div class="register-input">
                            <label>设置邮箱</label>
                            <el-form-item prop="email">
                                <el-input type="text" v-model="formData.email"></el-input>
                            </el-form-item>
                        </div>
                        <div class="register-input">
                            <label>设置描述</label>
                            <el-form-item prop="description">
                                <el-input type="textarea" v-model="formData.description" rows="4" autosize></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <el-form-item>
                    <button class="register-submit" @click="register('formData')">注册</button>
                </el-form-item>
            </el-form>
            <!-- <a class="el-icon-back back-login" @click="backLogin"> 已有账号，点此登录</a> -->
            <a class="el-icon-back back-guest" @click="backGuest"> 返回游客浏览</a>
        </div>
        <div class="overlay" id="overlay" style="display: none;"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: {
                account: '',            // 绑定到后端的 account 字段
                name: '',               // 绑定到后端的 name 字段
                phone: '',              // 绑定到后端的 phone 字段
                email: '',              // 绑定到后端的 email 字段
                description: '',        // 绑定到后端的 description 字段
                password: '',           // 绑定到后端的 password 字段
                confirmPassword: '',    // 用于确认密码匹配
            },
            rules: {
                account: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 6, message: '用户名至少需要6个字符', trigger: 'blur' },
                    { pattern: /^[A-Za-z0-9_]{6,}$/, message: '用户名只允许字母、数字和下划线', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '公司名称不能为空', trigger: 'blur' },
                    { min: 3, message: '公司名称至少需要3个字符', trigger: 'blur' },
                    { pattern: /^[A-Za-z0-9_\u4e00-\u9fa5]{3,}$/, message: '公司名称只允许字母、数字、下划线和中文字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 8, message: '密码至少需要8个字符', trigger: 'blur' },
                    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码至少包含一个字母和一个数字，只能包含字母和数字，不能包含特殊字符', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '确认密码不能为空', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.formData.password) {
                                callback(new Error('两次输入的密码不一致'));
                            } else {
                                callback();
                            }
                        }, 
                        trigger: 'blur'
                    }
                ],
                description: [
                    { max: 100, message: '描述不能超过100个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        async register(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    document.getElementById('overlay').style.display = 'block';
                    axios.post('http://localhost:28888/api/register', {
                        account: this.formData.account,
                        password: this.formData.password,
                        repeat_password: this.formData.confirmPassword, // 传递确认密码以进行匹配验证
                        name: this.formData.name,
                        phone: this.formData.phone,
                        email: this.formData.email,
                        description: this.formData.description,
                    })
                    .then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                showClose: true,
                                message: '注册成功! 将在2秒后跳转至登陆页',
                                type: 'success'
                            });
                            
                            let self = this;
                            setTimeout(() => {
                                this.$emit('trigger-login'); 
                                self.$router.push('/intro');
                            }, 5000);
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.status,
                                type: 'error'
                            });
                            document.getElementById('overlay').style.display = 'none';  // 确保overlay被隐藏
                        }
                    })
                    .catch(error => {
                        console.error('Error creating user:', error);
                        this.$message({
                            showClose: true,
                            message: '注册失败，请稍后重试',
                            type: 'error'
                        });
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        backLogin() {
            this.$emit('trigger-login'); // 触发登录事件
        },
        backGuest() {
            this.$router.push('/intro');
        }
    }
}
</script>

<style>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    /* 确保覆盖在页面上方 */
}

.register-container {
    position: relative;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
}

.register-box {
    margin-top: 100px;
    width: 1200px;
    height: 700px;
    color: white;
    /* background-color:rgba(255, 255, 255, 0.05); */
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    justify-content: center;
}

.register-text {
    align-self:flex-start;
    font-size: large;
    text-align: left;
    padding-top: 10px;
    padding-left: 50px;
    line-height: 35px;
}

.register-input {
    display: flex;
    width: 500px;
    margin: 20px 0; /* 为每个输入框添加垂直间距 */
}

.register-columns {
    display: flex; /* 将两列并排显示 */
    justify-content: space-between; /* 在两列之间添加空间 */
    width: 100%; /* 宽度为容器的100% */
}

.column {
    flex: 1; /* 使每一列占据相等的空间 */
    margin: 0 10px; /* 给列之间添加一些间距 */
}

.register-input input[type="textarea"] {
    width: 100%; /* 宽度为100% */
    max-width: 100%; /* 最大宽度为100% */
    resize: none; /* 禁止手动调整大小 */
    word-break: break-all; /* 长字自动换行 */
}

.register-input label {
    margin-top: 10px;
    width: 160px;
    font-size: 15px;
    color: white;
}

.register-container .el-form-item {
    width: 100%;
    height: 40px;
}

.register-input input {
    -webkit-text-fill-color: white;
    width: 100%;
    height: 40px;
    background-color: transparent;
    outline: none;
    font-size: 1em;
    color: white;
}

input:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
}

.register-submit {
    width: 400px;
    height: 40px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1em;
    color: black;
    font-weight: 500;
}

.register-submit:hover {
    background: #ff5733;
    /* color: #ff5733; */
}

/* .back-login {
    position: absolute;
    left: 34%;
    top: 75%;
    margin-top: 10px;
    margin-right: 350px;
    color: white;
} */

.back-guest {
    position: absolute;
    left: 13%;
    top:14%;
    margin-top: 10px;
    margin-right: 350px;
    color: rgb(255, 244, 94);
    cursor: pointer;
}

.back-guest:hover {
    color: #ff5733;
}
</style>
