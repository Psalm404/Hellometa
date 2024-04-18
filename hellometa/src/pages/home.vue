<template>
  <div class = "container">
  <el-container>
    <!-- ele在标签里藏了样式，优先级比css高，所以布局的高度宽度这种参数只能写在标签里，写在css样式里不生效，有哪些可以看说明文档 -->
  <el-header height="60px">
    <i class = "el-icon-user-solid" style = "font-size:40px;margin-top:6px; margin-right:10px;"></i>
    <el-button class = "logoutBT" @click = "logout" 
    type="primary" style="margin-top:6px;height:37px; background-color: rgb(22, 27, 34); color:black; border-color:gray;">退出登录</el-button>
  </el-header>
  <el-container>
    <el-aside width="280px">
      <div class = "aside_navigator">
        <div class = "navi-upload">
              <button type = "submit" @click = "selectMenu('1')"> 增添凭证 </button>  
          </div>
          <div class = "navi-record">
              <button type = "submit" @click = "selectMenu('2')"> 查看记录</button>  
          </div>
          <div class = "navi-browser">
              <button type = "submit" @click = "selectMenu('3')"> 资产浏览器 </button>  
          </div>
      </div>
      <div class = "account-message"> 
        <div class = "account-line1"> 
          <el-avatar :src = "imgUrl"> </el-avatar>
          <div class = "subname"> {{ subaccountName }}</div>
        </div>
         <div class = "account-line2">
            <el-button @click = "changeAccount()"> 切换账号 </el-button>
         </div>
      </div>
    </el-aside>
    <el-main>
      <router-view>
      Main
      </router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
export default {
  data(){
    return{
      subaccountName: this.$store.state.subaccountName,
      imgUrl:require('../assets/logo.png'),
    };
    },
  methods: {
    changeAccount(){
      this.$store.state.subaccountName = '';
      this.$store.state.subaccountid = '';
      this.$router.push('/mymessage');
    },
    logout(){
      this.$store.state.subaccountName = '';
      this.$store.state.subaccountid = '';
      this.$store.state.accountName = '';
      this.$router.push('/login');
    },
    selectMenu(index) {
      console.log(index);
      let targetRoute;
      if (index === '1') {
        targetRoute = '/home/upload';
      } else if (index === '2') {
        targetRoute = '/home/record';
      } else if (index === '3'){
        targetRoute = '/home/record';
      }
      // 检查目标路由是否与当前路由相同
      if (this.$route.path !== targetRoute) {
        this.$router.push(targetRoute);
      }
    },
  }
}
</script>

<style>
  .container{
    min-height:100vh;
    background-color:  rgb(31, 31, 31);
  }
  .el-header{
    background-color: rgb(24, 24, 24);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: flex-end;
    position: fixed;  /*用于固定home组件的，不随滚动条移动*/
    width: 100%;
    z-index: 999; 
    top:0;
  }
  
  .el-aside {
    background-color:rgb(24, 24, 24);
    color: #333;
    padding: 0;
    position: fixed;
    height:100%;
    z-index: 998; 
    top:0;
    border-right: 1px solid rgba(255, 255, 255, 0.5);
    /* border:1px solid red; */
  }
  .aside_navigator{
    display:flex;
    flex-direction: column;
    margin-top:100px;
    margin-left:40px;
    background-color: transparent;
    width: 200px;
  }
  .aside_navigator div{
    margin:15px;
  }
  .aside_navigator button{
    background-color: transparent;
    color:white;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    width: 160px;
    height:50px;
    outline:none;
    cursor:pointer;
    font-size:1em;
  }
  .aside_navigator button:hover{
    background-color: rgb(35, 40, 48);
    color:white;
  }
  .aside_navigator .el-button.is-active{
    background-color: rgb(255,255, 255);
    color:rgb(35, 40, 48);

  }
  .el-menu{
    /* box-shadow: 0px 0px 3px rgb(180, 180, 180); */
  }
  .el-menu-item{
    height:90px;
    /* margin:10px 0; */
    padding: 17px 0;
    padding-right:35px;
    flex:1;
    background-color: rgb(33, 38, 45);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  .menu_left{
    font-size:25px;
    margin:0;
    background-color: rgb(14, 14, 14);
    /* border:1px solid red; */
  }
  .el-main {
    background-color: rgb(31, 31, 31);
    color: #333;
    text-align: center;
    margin-left: 310px;
    margin-top:60px;
  }
.account-message{
  margin-top:330px;
  padding-top:30px;
  border-top:1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.account-message .account-line1{
  margin-left:50px;
  display: flex;
  width:200px;
  margin-bottom:40px;
}
.account-line1 .el-avatar{
  margin-right:20px;
}
.account-line1 .subname{
  margin-top:10px;
  color:white;
}
.account-line2 .el-button{
  width:200px;
  background-color: transparent;
  border:1px solid rgba(255, 255, 255, 0.5);
  color:white;
}
.account-line2 .el-button:hover{
  background-color: rgb(14, 14, 14);
  border:1px solid rgba(255, 255, 255, 0.5);
  color:white;
}
</style>


<!-- background-color="#6d7a91" -->