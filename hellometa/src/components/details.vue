<template>
  <div class = "detail-container">
      <div class = "top"> 
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
      <div class = "bottom">
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
    </div>
  </template>
  <script>
  import axios from 'axios';
  export default{
    name:'details',
    mounted(){
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

    }
  }
  </script>
  <style>
  .detail-container{
    height:90vh;
    display:flex;
    margin-top:35px;
    margin-right:20px;
    flex-direction:column;
    /* box-shadow: 0px 0px 4px silver; */
  }
  .top{
    display:flex;
    flex:1;
    box-shadow: 0px 0px 4px silver;
    margin-bottom:30px;
    padding:20px;
  }
  .top-left{
    flex:2;
    margin:20px 25px;
    padding:30px;
    box-shadow:0px 0px 2px silver;
  }
  .top-right{
    display:flex;
    /* border:1px solid red; */
    flex-direction: column;
    flex:4;
    margin:10px 20px;
    margin-left:70px;
    padding-left:30px;
    color:#808080;
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
    box-shadow: 0px 0px 4px silver;
    padding:20px;
  }
  .bottom-left{
    display: flex;
    flex-direction: column;
    flex:1;
    border-right:2px solid #e4e4e4;
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
    color:#808080
  }
  .file-download{
    display:flex;
    align-items:center;
    text-align:left;
  }
  </style>