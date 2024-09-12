<template>
    <div class="edit-profile-container">
        <div class="edit-profile-box">
            <div class="edit-profile-text">
                <button class="edit-profile-button" @click="editInfo" :disabled="isNavigating">编辑您的个人资料</button>
                <button class="edit-pwd-button" @click="editPwd" :disabled="isNavigating">修改你的账号密码</button>
            </div>
            <el-form :model="formData" :rules="rules" ref="formData">
                <!-- 修改个人信息表单 -->
                <div v-if="isEditingInfo" class="edit-profile-columns">
                    <!-- 第一列 -->
                    <div class="column">
                        <div class="edit-profile-input">
                            <label>用户名</label>
                            <el-form-item prop="name">
                                <el-input type="text" v-model="formData.name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="edit-profile-input">
                            <label>手机号</label>
                            <el-form-item prop="phone">
                                <el-input type="text" v-model="formData.phone"></el-input>
                            </el-form-item>
                        </div>
                        <div class="edit-profile-input">
                            <label>邮箱</label>
                            <el-form-item prop="email">
                                <el-input type="text" v-model="formData.email"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <!-- 第二列 -->
                    <div class="column">
                        <div class="edit-profile-input">
                            <label>描述</label>
                            <el-form-item prop="description">
                                <el-input type="textarea" v-model="formData.description" rows="4" autosize></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>

                <!-- 修改账号密码表单 -->
                <div v-if="!isEditingInfo" class="edit-profile-columns">
                    <!-- 第一列 -->
                    <div class="column">
                        <div class="edit-profile-input">
                            <label>*原密码</label>
                            <el-form-item prop="currentPassword">
                                <el-input type="password" v-model="formData.currentPassword" show-password></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <!-- 第二列 -->
                    <div class="column">
                        <div class="edit-profile-input">
                            <label>*新密码</label>
                            <el-form-item prop="newPassword">
                                <el-input type="password" v-model="formData.newPassword" show-password></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>

                <!-- 提交按钮 -->
                <el-form-item>
                    <button class="edit-profile-submit" @click="isEditingInfo ? updateInfo('formData') : updatePassword('formData')" :disabled="isNavigating">
                        提交修改
                    </button>
                </el-form-item>
            </el-form>
            <a class="el-icon-back back-guest" @click="backHome" :disabled="isNavigating">返回个人主页</a>
        </div>
        <div class="overlay" id="overlay" :style="{ display: isNavigating ? 'block' : 'none' }"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            isEditingInfo: true,  // 默认显示修改个人信息的表单
            isNavigating: false, // 控制遮罩层显示的状态
            formData: {
                account: '',
                name: '',
                phone: '',
                email: '',
                description: '',
                currentPassword: '',
                newPassword: '',
            },
            rules: {
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
                currentPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' },
                    { min: 8, message: '原密码至少8个字符', trigger: 'blur' },
                    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '原密码至少包含一个字母和一个数字', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
                    { min: 8, message: '新密码至少8个字符', trigger: 'blur' },
                    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '新密码至少包含一个字母和一个数字', trigger: 'blur' }
                ],
                description: [
                    { max: 100, message: '描述不能超过100个字符', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            user: state => state.user
        })
    },
    created() {
        this.fetchUserInfo();
    },
    methods: {
        fetchUserInfo() {
            if (this.user) {
                this.formData = {
                    ...this.formData,
                    account: this.user.account,
                    name: this.user.name,
                    phone: this.user.phone,
                    email: this.user.email,
                    description: this.user.description,
                };
                this.$message.info(this.formData.account);
            } else {
                this.$message.error('用户信息未找到，请重新登录。');
            }
        },
        async updateInfo(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.isNavigating = true;  // 显示遮罩层
                    try {
                        const res = await axios.post('http://localhost:28888/api/updateInfo', {
                            account: this.formData.account,
                            name: this.formData.name,
                            phone: this.formData.phone,
                            email: this.formData.email,
                            description: this.formData.description,
                        });

                        if (res.data.code === 200) {
                            // 更新 Vuex 存储的用户信息
                            this.$store.commit('setUser', {
                                ...this.user,
                                name: this.formData.name,
                                phone: this.formData.phone,
                                email: this.formData.email,
                                description: this.formData.description,
                            });
                            this.$message.success('个人信息修改成功!2s后返回个人主页');
                            setTimeout(() => {
                                this.$router.push('/home');
                            }, 2000);

                        } else {
                            this.$message.error('修改失败');
                        }
                    } catch (error) {
                        console.error('Error updating info:', error);
                        this.$message.error('修改失败，请稍后重试');
                    } finally {
                        this.isNavigating = false;  // 隐藏遮罩层
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async updatePassword(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.isNavigating = true;  // 显示遮罩层
                    try {
                        const res = await axios.post('http://localhost:28888/api/updatePassword', {
                            account: this.formData.account,
                            old_password: this.formData.currentPassword,
                            new_password: this.formData.newPassword,
                            repeat_password: this.formData.newPassword
                        });

                        if (res.data.code === 200) {
                            this.$message.success('密码修改成功!2s后返回个人主页');
                            setTimeout(() => {
                                this.$router.push('/home');
                            }, 2000);
                        } else {
                            this.$message.error(res.data.status);
                        }
                    } catch (error) {
                        console.error('Error updating password:', error);
                        this.$message.error('修改失败，请稍后重试');
                    } finally {
                        this.isNavigating = false;  // 隐藏遮罩层
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        editInfo() {
            this.isEditingInfo = true;  // 切换到编辑个人信息表单
        },
        editPwd() {
            this.isEditingInfo = false;  // 切换到编辑密码表单
        },
        backHome() {
            this.isNavigating = true;  // 显示遮罩层
            this.$router.push('/home');
        }
    }
};
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

.edit-profile-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
}

.edit-profile-box {
    margin-top: 70px;
    width: 1200px;
    height: 700px;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    justify-content: center;
}

.edit-profile-text {
    align-self: flex-start;
    font-size: large;
    text-align: left;
    padding-top: 10px;
    padding-left: 50px;
    line-height: 35px;
}

.user-id {
    font-size: medium;
    margin-left: 20px;
    color: #ffd700;
}

.edit-profile-input {
    display: flex;
    width: 500px;
    margin: 20px 0; /* 为每个输入框添加垂直间距 */
}

.edit-profile-columns {
    display: flex; /* 将两列并排显示 */
    justify-content: space-between; /* 在两列之间添加空间 */
    width: 100%; /* 宽度为容器的100% */
}

.column {
    flex: 1; /* 使每一列占据相等的空间 */
    margin: 0 10px; /* 给列之间添加一些间距 */
}

.edit-profile-input input[type="textarea"] {
    width: 100%; /* 宽度为100% */
    max-width: 100%; /* 最大宽度为100% */
    resize: none; /* 禁止手动调整大小 */
    word-break: break-all; /* 长字自动换行 */
}

.edit-profile-input label {
    margin-top: 10px;
    width: 160px;
    font-size: 15px;
    color: white;
}

.edit-profile-container .el-form-item {
    width: 100%;
    height: 40px;
}

.edit-profile-input input {
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

.edit-profile-submit {
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

.edit-profile-submit:hover {
    background: #ff5733;
}

.back-guest {
    position: absolute;
    left: 13%;
    top: 14%;
    margin-top: 10px;
    margin-right: 350px;
    color: rgb(255, 244, 94);
    cursor: pointer;
}

.back-guest:hover {
    color: #ff5733;
}

.edit-profile-button {
    position: absolute;
    top:20%;
    left: 13%;
    background-color: rgba(255, 255, 255, 0.303); /* 设置为半透明 */
    color:  #ffffffb0;
    font-weight: 700; /* 设置字体粗细，500 为中等粗细 */
    border: 1px solid  #ffffff00; 
    border-radius: 10px; /* 设置圆角 */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s; /* 添加边框颜色过渡 */
    margin-top: 10px;
    margin-right: 10px; /* 增加一个右边距 */
    text-align: center; /* 文字居中 */
    width: 200px; /* 设置按钮的宽度 */
    height: 60px; /* 设置按钮的高度 */
}

.edit-pwd-button  {
    position: absolute;
    top:20%;
    left: 27%;
    background-color: rgba(255, 255, 255, 0.303); /* 设置为半透明 */
    color:  #ffffffb0;
    font-weight: 700; /* 设置字体粗细，500 为中等粗细 */
    border: 1px solid  #ffffff00; 
    border-radius: 10px; /* 设置圆角 */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s; /* 添加边框颜色过渡 */
    margin-top: 10px;
    margin-right: 10px; /* 增加一个右边距 */
    text-align: center; /* 文字居中 */
    width: 200px; /* 设置按钮的宽度 */
    height: 60px; /* 设置按钮的高度 */
}

.edit-profile-button,.edit-pwd-button:hover {
    background-color: #ff5900;
    border-color: #ff5900; /* 修改hover状态下的边框颜色 */
}
</style>