<template>
  <div class = "container">
  <el-container>
  <el-header height="80px">
    <el-button class = "logoutBT" @click = "logout" 
    type="info" style="background-color:#dbaa9b;border-color: #d09c8c; color:#39414d; margin-top:23px;height:40px;">退出登录</el-button>
  </el-header>
  <el-container>
    <el-aside width="250px">
      <el-menu @select = "selectMenu"
      default-active="1"
      class="menu_left"
      @open="handleOpen"
      @close="handleClose"
      text-color="#fff"
      active-text-color="#fff">
          <el-menu-item index = "1">增添凭证</el-menu-item>
          <el-menu-item index = "2">查看记录</el-menu-item>
    </el-menu>
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
  // data(){
  // },
  methods: {
    logout(){
      this.$router.push('/login');
    },
    async selectMenu(index) {
      console.log(index);
      let targetRoute;
      if (index === '1') {
        targetRoute = '/home/upload';
      } else if (index === '2') {
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
    height:100vh;
  }
  .el-header{
    background-color: #39414d;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: flex-end;
  }
  
  .el-aside {
    background-color: #4b566e;
    color: #333;
    padding: 0;
    /* border:1px solid red; */
  }
  .menu_left{
    font-size:25px;
    margin:0;
    /* border:1px solid red; */
  }
  .el-menu-item{
    background-color: #4b566e;
    text-align: center;
    font-size:16px;
  }
  .el-menu-item:hover {
    background-color:#d09c8c; 
  }
  .el-menu-item.is-active {
    background-color:#d09c8c;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
</style>


<!-- background-color="#6d7a91" -->