<template>
    <div class="register-container">
      <div class="register-box">
        <div class="register-text">
          <h2>欢迎来到HelloMeta!</h2>
          从这里注册账号，将您的作品上传至以太坊：
        </div>
        <el-form :model="formData" :rules="rules" ref="formData" >
          <div class="register-input">
            <label>设置用户名</label>
            <el-form-item prop = "username"> 
                <el-input type="text" v-model="formData.username" ></el-input>
            </el-form-item>
          </div>
          <div class="register-input">
            <label>设置密码</label>
            <el-form-item prop = "password"> 
                <el-input type="password" v-model="formData.password" show-password></el-input>
            </el-form-item>
          </div>
          <div class="register-input">
            <label>确认密码</label>
            <el-form-item prop = "confirmPassword"> 
                <el-input type="password" v-model="formData.confirmPassword" show-password></el-input>
            </el-form-item>
          </div>
        <el-form-item>
          <button  class = "register-submit" @click="register('formData')">注册</button>
        </el-form-item>
        </el-form>
        <a  class = "el-icon-back back-login" @click = "backLogin"> 返回登录</a>
      </div>
      <div class="overlay" id="overlay" style="display: none;"></div>
    </div>
  </template>
  
  <script>
    import axios from 'axios'
    export default {
        name: 'register',
    data() {
      return {
        formData:{
            username: '',
            password: '',
            confirmPassword: '',
        },
        rules:{ 
            username: [
           { required: true, 
            message: '用户名不能为空', },
          { max: 10, message: '用户名不能超过10个字符',},
          { pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, 
            message: '用户名只能包含字母、汉字、数字或下划线',}
        ],
            password: [
          { required: true, message: '密码不能为空',},
          { pattern: /^[a-zA-Z0-9]{6,18}$/, message: '密码必须为6-18位字母或数字', }
        ],
            confirmPassword: [
          { required: true, message: '确认密码不能为空', },
          { pattern: /^[a-zA-Z0-9]{6,18}$/, message: '确认密码必须为6-18位字母或数字',},
          {
            validator: (rule, value, callback) => {
              if (value !== this.formData.password) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            },
          }
        ]}
      };
    },
    methods: {
        register(formName) {
            this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://127.0.0.1:4523/m1/4236807-0-default/login/register', { token: 'test'})
        .then(res => {
            console.log('登录',res.data); // 返回的数据
            if (res.data.status === true){
                document.getElementById('overlay').style.display = 'block';
                this.$message({
                    showClose: true,
                    message: '注册成功! 将在五秒后跳转回登录页',
                    type: 'success'
                    });
                let self = this;
                setTimeout(function() {
                    document.getElementById('overlay').style.display = 'none';
                    self.$router.push('/login');
                }, 5000);
            }
            else{
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'error'
                    });
            }
         })
        .catch(error => {
            console.error('Error creating user:', error);
        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    backLogin(){
        this.$router.push('/login');
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999; /* 确保覆盖在页面上方 */
  }
.register-container{
    position: relative;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    min-height: 100vh;
    background-color: rgb(31, 31, 31);
}
.register-box{
    margin-top:100px;
    width: 580px;
    height: 570px;
    color:white;
    /* background-color:rgba(255, 255, 255, 0.05); */
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    display:flex;
    flex-direction: column;
    align-items:center;
    padding-top:10px;
    justify-content: center;
}
.register-text{
    align-self: self-start;
    text-align: left;
    padding-left:50px;
    line-height:35px;
}
.register-input{
    display: flex;
    width: 500px;
    margin:30px 0;
}
.register-input label{
    margin-top:10px;
    width:160px;
    font-size:15px;
    color:white;
}
.register-container .el-form-item{
    width: 100%;
    height:40px;
}
.register-input input{
  -webkit-text-fill-color: white;
  width: 100%;
  height:40px;
  background-color: transparent;
  outline: none;
  font-size:1em;
  color:white;
}
input:-webkit-autofill{
  transition:background-color 5000s ease-in-out 0s;
}

.register-submit{
  width: 400px;
  height:40px;
  background: #fff;
  border:none;
  outline:none;
  border-radius:40px;
  cursor:pointer;
  font-size:1em;
  color:black;
  font-weight:500;
}
.back-login{
    margin-top:10px;
    margin-right:350px;
    color:white;
}
</style>