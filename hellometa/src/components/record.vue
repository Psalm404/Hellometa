<template>
  <div class = "container" style=" display:flex; flex-direction: column">  
    <div class = "search_box"> 
      <div style="margin:0 10px; flex:1; font-size:16px;">搜索：</div>
      <Input  placeholder="按名称搜索" style="margin:0 10px; flex:6;"/>
      <Select  filterable placeholder="选择类型" style="margin:0 10px; flex:6;">
    <Option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </Option>
  </Select>
    </div>
    <div class = "record_message">
    <div class = "message_list" v-for="(item, index) in data" :key = "index" >
      <div v-if="item.id <= 4" class = "message_item" >
      <div class = "message_item_left" style = "display:flex; flex:3; ">
        <div class = "img" style= "flex:2; margin: 5px 10px; border:1px solid green;">
        <img src = "../assets/logo.png"  style="object-fit: cover; max-width: 100%; max-height: 100%;"> </img>
        </div>
        <div class = "text" style = " display:flex; flex-direction:column; flex:3;">
          <div class = "name ">{{item.name}}</div> 
          <div class = "introduction">{{item.intro}}</div>
          <div class = "create_time ">
            创建时间：{{new Date(item.date).getFullYear()}}.{{new Date(item.date).getMonth()+1}}.{{new Date(item.date).getDate()}}&emsp;{{new Date(item.date).getHours()}}:{{new Date(item.date).getMinutes()}}</div>
      </div>
    </div>
      <div class = "message_item_mid" >
        <div style = "flex:1; line-height:50px; padding:10px;">{{item.origin_name}} </div>
        <div style = "flex:1; line-height:50px; "> <a href="http:\\www.bilibili.com">查看上传凭证</a></div>
      </div>
      <div class = "message_item_right" style = "flex:2;"> </div>
    </div>
  </div>
</div>

  </div>
</template>

  <script>
  import datas from '@/commons/data.js';
  export default {
    name: 'record',
    beforeMount(){
      this.getData();
    },
    data(){
      return{
        data:[],
        options:[{
          value:1,
          label:"图片"
        },{
          value:2,
          label:"文本"
        }]
      }
    },
    methods:{
      getData(){
        this.data = datas.data();
        console.log("已挂载完毕");
        console.log(this.data);
      }
    }
  }
  </script>

  <style>
  .container{
    overflow-y: auto; 
    overflow-x: hidden;
  }
  .search_box{
    flex: 1;
    height:60px;
    width:100%;
    align-items: center;
    background-color: white;
    /* border:1px solid red; */
    display:flex;
    padding:10px;
    margin:10px;
    border-radius: 8px;
    box-shadow: 0px 0px 1px #39414d;
  }
  .record_message{
    padding:0;
    overflow-y: hidden;
    flex:100;
    background-color: #e9eef3;
  }
  .message_list{
    overflow-y: hidden;
    }
  .message_item{
    padding:10px;
    margin:7px;
    background-color: white; 
    box-shadow: 0px 0px 2px #39414d;
    border-radius: 10px;
    display:flex;
    height:195px;
  }
  .message_item_left{
    display: flex;  
    border-right:1.5px solid #cdcdcd; 
    flex:1;
    padding-right:10px;
  }
  .name{
    flex:1;
    font-size:15px; 
    font-weight:bold; 
    color:gray; 
    border-bottom:1.5px solid #cdcdcd; 
    line-height:50px; 
    margin:5px;
  }
  .create_time{
   flex:1; 
   font-size:13px; 
   line-height:18px; 
   color:gray; 
   margin:5px;
  }
  .message_item_mid{
    flex:2; 
    display: flex; 
    flex-direction: column;
    border-right:1.5px solid #cdcdcd; 
  }
  .message_item.right{

  }
  .introduction{
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 设置为希望显示的最大行数 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex:2; 
    font-size:13px; 
    line-height:21px;  
    color:gray; margin:5px;
}

  </style>
  