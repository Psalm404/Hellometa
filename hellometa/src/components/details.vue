<template>
  <div class = "detail-container">
    <transition name="el-fade-in-linear" >
      <a  class = "el-icon-back back-login" @click = "backLogin" v-show = "show"> 返回</a>
    </transition>
       <transition name="el-fade-in-linear" >
      <div class = "top" v-show = "show"> 
        <div class = "top-left">
          <img v-if = "detail_data.data_type === 1" src="../assets/txt_default.png" alt="加载失败" style="object-fit:cover;margin:20px;">
          <img v-if = "detail_data.data_type === 2" src="../assets/pic_default.png" alt="加载失败" style="object-fit:cover;margin:20px;">
        </div>
        <div class = "top-right">
          <div class = "name-box top-right-box"><strong>作品名称:</strong> &emsp;{{detail_data.data_name}}</div>
          <div class = "time-box top-right-box"><strong>上传时间:</strong> &emsp;{{detail_data.data_createTime}}</div>
          <div class = "intro-box"><strong>作品介绍:</strong> &emsp;{{detail_data.data_introduction}}</div>
        </div>
      </div>
      </transition>
      <transition name="el-fade-in-linear">
      <div class = "bottom" v-show = "show">
        <div class = "bottom-left">
          <div class = "file-name bottom-left-box">文件名: {{ detail_data.data_originalName }}</div>
          <div class = "file-size bottom-left-box">文件大小: {{ detail_data.data_size }}</div>
          <div class = "block-name bottom-left-box">区块链名称:  xxxx链 </div>
          <div class = "file-hash bottom-left-box"> 文件哈希: {{ detail_data.data_hash }}</div>
          <div class = "block-height bottom-left-box"> 区块高度: {{ detail_data.data_hashHeight }}</div>
        </div>
        <div class = "bottom-right">
          <div class = "file-download">
            <el-button type = "primary" >下载文件</el-button>
          </div>
        </div> 
      </div>
      </transition>
    </div>
  </template>
  <script>
  import axios from 'axios';
  export default{
    name:'details',
    mounted(){
      setTimeout(()=>{
        this.show = true;
      },200)
      axios.post('http://127.0.0.1:4523/m1/4236807-0-default/data/details', { token: 'test', data_id:1})
        .then(res => {
          console.log(res.data); // 返回的数据
          this.detail_data = res.data;
         })
        .catch(error => {
          console.error('Error creating user:', error);
        });
    },
    data(){
      return{
        show:false,
        detail_data:{
          data_picture:null,
          data_name:null,
          data_introduction:null,
          data_createTime:null,
          data_type:null,
          data_originalName:null,
          data_size:null,
          data_creatorName:null,
          data_hash:null,
          data_hashHeight:null,
        }  
      }
    },
    methods:{
      backLogin(){
        this.$router.push('/home/record');
      }
    }
  }
  </script>
  <style>
  .detail-container{
    min-height:100vh;
    display:flex;
    margin-right:20px;
    flex-direction:column;
    /* box-shadow: 0px 0px 4px silver; */
  }
  .detail-container .back-login{
    align-self: flex-start;
  }
  .top{
    display:flex;
    flex:1;
    border: 2px solid rgba(255, 255, 255, 0.5);
    margin-bottom:30px;
    padding:20px;
  }
  .top-left{
    flex:2;
    margin:20px 25px;
    padding:30px;
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  .top-right{
    display:flex;
    /* border:1px solid red; */
    flex-direction: column;
    flex:4;
    margin:10px 20px;
    margin-left:70px;
    padding-left:30px;
    color:white;
  }
  .top-right-box{
    flex:1;
    margin:10px 0;
    border-bottom: 1px solid #e4e4e4;
    padding-left:10px;
    text-align: left;
    font-size:16px;
    display: flex; 
    align-items: center; /* 在垂直方向上居中 */
    line-height:32px;
  }
  .intro-box{
    flex:5;
    font-size:16px;
    margin:10px 0;
    padding-left:10px;
    padding:10px;
    line-height:30px;
    text-align: left;
  }
  .bottom{
    display: flex;
    flex:1;
    border: 2px solid rgba(255, 255, 255, 0.5);
    padding:20px;
  }
  .bottom-left{
    display: flex;
    flex-direction: column;
    flex:1;
    border-right:1px solid rgba(255, 255, 255, 0.5);
    /* border:1px solid red; */
  }
  .bottom-right{
    padding:20px;
    flex:1;
    /* border:1px solid red; */
  }
  .bottom-left-box{
    display: flex;
    text-align:left;
    align-items: center; /* 在垂直方向上居中 */
    line-height:32px;
    padding-left:10px;
    font-size:16px;
    margin:20px;
    border-bottom: 1px solid #e4e4e4;
    flex:1;
    color:white;
  }
  .file-download{
    display:flex;
    align-items:center;
    text-align:left;
  }
  </style>