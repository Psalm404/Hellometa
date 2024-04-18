<template>
    <div class= "mymessage-container"> 
        <transition name="el-fade-in-linear">
            <div v-show = "show3" class = "createAccount-box"> 
                <div class = "line1">  
                    <div class = "guide-text"> 为账户起一个昵称:</div>
                    <el-form :model="formData" :rules="rules" ref="formData"> 
                        <el-form-item prop = "subaccountName">
                            <el-input type="text" class = "nickname" v-model = "formData.subaccountName"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class = "line2">
                    <button @click = "back1"> <i  class = "el-icon-arrow-left" style = "text-align: right;"> </i> 返回</button>
                    <button @click = "next1('formData')">下一步 <i  class = "el-icon-arrow-right" style = "text-align: right;"> </i></button>
                </div>
            </div>

        </transition>
        <transition name="el-fade-in-linear" >
            <div v-show = "show4" class = "createAccount-box">
                <div class = "line1" >
                    <div class = "guide-text" style = "margin-bottom:10px;">  请选择一个头像:  </div>
                </div>
                <dl class = "portrait-list"> 
                    <dd v-for = "(item, row) in 4">
                        <div v-for = "(item, col) in 4"  @click = "confirmImg(row, col)">
                            <el-avatar  shape="square" fit="fill" :src="imgUrl" alt="'头像'+'index'"></el-avatar>
                        </div>
                    </dd>
                </dl>
                <el-avatar  shape="square" fit="fill" :src="finalUrl" alt="'头像'+'index'" class = "finalImg"></el-avatar>
                <div class = "line2">
                    <button @click = "back2"> <i  class = "el-icon-arrow-left" style = "text-align: right;"> </i> 返回</button>
                    <button @click = "next2">完成 <i  class = "el-icon-arrow-right" style = "text-align: right;"> </i></button>
                </div>
            </div>
        </transition>
        <transition name="el-fade-in-linear">
            <div class = "welcome-user" v-show ="show5"> 
                    <div>创建成功！</div>
                </div>
            </transition>
        <transition name="el-fade-in-linear">
            <div  v-show="show1" class = "mymessage-box"> 
                <div class = "welcome-user"> 
                    <div>{{ welcomeContent }}</div>
                </div>
                    <div class = "guide-text"> 接下来，请选择你要使用的以太坊账户:</div>
                        <div class = "subaccount-box">
                            <div  class = "subaccount-list" v-for = "(item, index) in subaccountArray" :key = "index" @click = "toHome(index)">
                                <transition  name="el-zoom-in-top">
                                    <div class = "subaccount-item" v-show = "show2">
                                        <div class = "subaccount-img subaccount-element"> </div>
                                        <div class = "subaccount-name subaccount-element">  {{ item.account_name }} </div>
                                        <div class = "subaccount-id subaccount-element">  {{ item.account_id }} </div>
                                    </div>
                                </transition>
                            </div>
                            <div class = "subaccount-create subaccount-item" @click = "createSubaccount"> 
                                <i class = "el-icon-plus"> </i>
                            </div>
                        </div>
                        <a  class = "el-icon-back back-login" @click = "backLogin"> 返回登录</a>
                    </div>
            </transition>
    </div>
</template>

<script>
import axios from 'axios';
    export default{
        name: 'mymessage',
        mounted(){
            
            axios.post('http://127.0.0.1:4523/m1/4236807-0-default/user/userInfo', {token:'test'})
            .then(res => {
                console.log('获取的以太坊账户', res.data.accountArray);
                this.subaccountArray = res.data.accountArray; 
            })
            setTimeout(() => {
                this.show1 = true;
                // this.show2 = true;
                }, 200); 
            setTimeout(() => {
                this.show2 = true;
            },  200); 
        },
        data(){
            return{
                formData:{subaccountName: '',},
                welcomeContent:'你好，' + this.$store.state.accountName + ' !',
                show1: false,
                show2: false,
                show3: false,
                show4: false,
                show5: false,
                subaccountArray:'',
                arrayLength:null,
                imgUrl: require('../assets/logo.png'),
                finalUrl:'',
                rules:{ 
                    subaccountName:[{
                        required:true,
                        message:'昵称不得为空'
                    },{
                        max: 10, 
                        message: '昵称不能超过10个字符',
                    },
                    { 
                        pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, 
                        message: '昵称只能包含字母、汉字、数字或下划线',
                    }]
                    
                }
            }
        },
        methods:{
            toHome(index){
                this.$store.state.subaccountId = this.subaccountArray[index].account_id;
                this.$store.state.subaccountName = this.subaccountArray[index].account_name;
                this.$router.push('/home/upload');
            },
            backLogin(){
                this.$router.push('/login');
            },
            confirmImg(row, col){
                console.log(row, col);
                this.finalUrl = require('../assets/logo.png');
                // console.log(this.finalUrl)
            },
            createSubaccount(){
                this.show1 = false;
                this.show2 = false;
                setTimeout(() => {
                    this.show3 = true;
            },  500); 
            },
            back1(){
                this.show3 = false;
                setTimeout(() => {
                    this.show1 = true;
                    this.show2 = true;
                }, 500)
         },
            next1(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        this.show3 = false;
                        setTimeout(() => {
                            this.show4 = true;
                        }, 300)
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                })
         },  
            back2(){
                this.show4 = false;
                setTimeout(() => {
                    this.show3 = true;
                }, 500)
         },
            next2(formName){
                axios.post("http://127.0.0.1:4523/m1/4236807-0-default/user/createAccount", {token:'test', account_name:'formData.subaccountName', account_picture:'2'})
                    .then(res => {
                        if (res.data.status === true){
                            this.show4 = false;
                            setTimeout(() => {
                                this.show5 = true;
                            }, 300)
                            setTimeout(() => {
                                this.show5 = false;
                                    setTimeout(() => {
                                        this.show1 = true;
                                        this.show2 = true;
                                }, 300)
                            }, 2000)
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    })
            }  
        }, 
        
    }
</script>
<style>
.mymessage-container{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: rgb(31, 31, 31);
}
.mymessage-box{
    width: 600px;
    /* height: 800px; */
    background-color:transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    align-items:center;
}
.welcome-user{
    color:white;
    font-size:35px;
    text-align: center;
    margin-top:35px;
}
.guide-text{
    color:white;
    font-size:20px;
    text-align:center;
    margin: 15px 0px;
    margin-bottom:30px;
}
.subaccount-list{
    /* margin:5px; */
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
.subaccount-item{
    color:white;
    height:65px;
    padding:15px;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.subaccount-item:hover{
    background-color: rgb(14, 14, 14);
}
.subaccount-item .subaccount-element{
    flex:1;
}
.subaccount-box{
    margin-top:10px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: rgb(26, 26, 26);
    margin:5px 60px;
    max-height:600px;
    margin-bottom:20px;
    /* border-radius:15px; */
}
.back-login{
    margin-bottom:30px;
    margin-right:420px;
}
.subaccount-box .el-icon-plus{
    font-size:25px;
    color:white;
}
.createAccount-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.createAccount-box .line1{
    flex:1;
    display: flex;
    width: 500px;
    align-items: center;
    
}
.createAccount-box .line2{
    flex:1;
    display: flex;
    width: 450px;
    align-items: center;
}
.createAccount-box .line2 button{
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.5);
    color:white;
    flex:1;
    height:40px;
    margin:30px;
    cursor: pointer;
    border-radius: 10px;
    text-align: center;
}
.createAccount-box .line2 button:hover{
    background-color: rgb(14, 14, 14);
}
.createAccount-box .guide-text{
    flex:2;
    text-align: center;
    margin-top:25px;
}
.createAccount-box .nickname{
    text-align:right;
}
.createAccount-box .el-form{
    margin-left: 30px;
    flex:3;
    height:40px;
}
.createAccount-box .nickname input{
    -webkit-text-fill-color: white;
    height:40px;
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.5);
    outline: none;
    font-size:1em;
    color:white;
}
.portrait-list{
    height:400px;
}
.portrait-list dd div{
    display: inline-block;
    cursor: pointer;
    height: 60px;
    width: 60px;
    margin:20px;
}
.portrait-list dd .el-avatar{
    height: 70px;
    width: 70px;
}
.portrait-list dd .el-avatar:hover{
    transform:scale(1.1); 
}
.finalImg{
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin-top:15px;
    height: 70px;
    width: 70px;
}
</style>