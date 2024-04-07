<template>
  <div class = "container">
  <el-container>
    <!-- ele在标签里藏了样式，优先级比css高，所以布局的高度宽度这种参数只能写在标签里，写在css样式里不生效，有哪些可以看说明文档 -->
  <el-header height="50px">
    <i class = "el-icon-user-solid" style = "font-size:40px;margin-top:6px; margin-right:10px;"></i>
    <el-button class = "logoutBT" @click = "logout" 
    type="primary" style="margin-top:6px;height:37px;">退出登录</el-button>
  </el-header>
  <el-container>
    <el-aside width="330px">
      <div class = "aside_navigator">
        <el-menu @select = "selectMenu"
      default-active="1"
      class="menu_left">
          <el-menu-item index = "1">
            <i style = "font-size:25px; margin: 10px;" class="el-icon-location"></i>
            <span style = "font-size:14px">增添凭证</span>
          </el-menu-item>
          <el-menu-item index = "2">
            <i style = "font-size:25px; margin: 10px;" class="el-icon-location"></i>
            <span style = "font-size:14px">查看记录</span>
          </el-menu-item>
          <el-menu-item index = "3">
            <i style = "font-size:25px; margin: 10px;" class="el-icon-location"></i>
            <span style = "font-size:14px">资产浏览器</span>
          </el-menu-item>
    </el-menu>
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
    height:100vh;
  }
  .el-header{
    background-color:#f5f5f5;
    border-bottom: 1px solid #dfe1e6;
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
    background-color:#ffffff;
    color: #333;
    padding: 0;
    position: fixed;
    height:100%;
    margin-top:70px;
    z-index: 998; 
    top:0;
    border-right:1px solid #dcdfe6;
    /* border:1px solid red; */
  }
  .aside_navigator{
    display:flex;
    flex-direction: column;
    margin-top:100px;
    margin-left:50px;
    background-color: #ffffff;
    width: 200px;
  }
  .el-menu{
    box-shadow: 0px 0px 3px rgb(180, 180, 180);
  }
  .el-menu-item{
    height:90px;
    /* margin:10px 0; */
    padding: 17px 0;
    padding-right:35px;
    flex:1;
    border-bottom: 1px solid lightgray;
  }
  .el-menu-item.is-active{
    background-color: #ecf5ff;
  }
  .el-menu-item:hover {
    background-color:#ecf5ff; 
  }
  .menu_left{
    font-size:25px;
    margin:0;
    /* border:1px solid red; */
  }
  .el-main {
    background-color:#ffffff;
    color: #333;
    text-align: center;
    margin-left: 370px;
    margin-top:60px;
  }
  
</style>


<!-- background-color="#6d7a91" -->