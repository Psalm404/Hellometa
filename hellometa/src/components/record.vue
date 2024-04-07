<template>
  <div class="container">
    <div class="record_message">
      <div class="message_box">
        <div class="search_box">
          <div style="margin:0 10px; flex:1; font-size:16px;">搜索：</div>
          <Input placeholder="按名称搜索" v-model = "searchName" style="margin:0 10px; flex:6;"/>
          <Select filterable placeholder="选择类型" style="margin:0 10px; flex:6;" v-model = "searchType">
            <Option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></Option>
          </Select>
          <el-button class="searchBT" type="primary" @click = "search">搜索</el-button>
        </div>
        <div class="message_list" v-for="(item, index) in data" :key="index">
          <div v-if="index >= beginId && index <= endId" class="message_item">
            <div class="message_item_left" style="display:flex; flex:3;">
              <div class="img-box" >
                <img class = "img" v-if = "item.data_type === 1" src="../assets/txt_default.png">
                <img class = "img" v-if = "item.data_type === 2" src="../assets/pic_default.png">
              </div>
              <div class="text" style="display:flex; flex-direction:column; flex:3;">
                <div class="name">{{item.data_name}}</div>
                <div class="introduction">{{item.data_introduction}}</div>
                <div class="create_time">
                  创建时间：{{new Date(item.data_createTime).getFullYear()}}.{{new Date(item.data_createTime).getMonth()+1}}.{{new Date(item.data_createTime).getDate()}}
                  &emsp;{{new Date(item.data_createTime).getHours()}}:{{new Date(item.data_createTime).getMinutes()}}
                </div>
              </div>
            </div>
            <div class="message_item_mid">
              <div style="flex:1; line-height:50px; padding:10px;">{{item.data_originalName}}</div>
              <div style="flex:1; line-height:50px;"> <el-button  type="primary" @click = "details">查看详细凭证</el-button></div>
            </div>
            <div class="message_item_right" style="flex:2;"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="block" style = "flex:1">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      layout="prev, pager, next, jumper"
      :total="dataLength"
      background>
    </el-pagination>
  </div>
  </div>
</template>

  <script>
  import datas from '@/commons/data.js';
  import axios from 'axios'
  export default {
    name: 'record',
    beforeMount(){
        axios.post('http://127.0.0.1:4523/m1/4236807-0-default/data/record', { token: 'test'})
        .then(res => {
          console.log(res.data); // 返回的数据
          this.data = res.data.dataArray;
          this.dataLength = this.data.length;
          console.log('data[]=', this.data)
         })
        .catch(error => {
          console.error('Error creating user:', error);
        });
      },
    data(){
      return{
        data:[],
        dataLength:0,
        options:[{
          value:1,
          label:"文本"
        },{
          value:2,
          label:"图片"
        }],
        currentPage3: 1,
        beginId: 1,
        endId: 5,
        searchName:null,
        searchType:null,
      }
    },
    methods:{
      details(){
        this.$router.push('/home/details');
      },
      search(){   
        //console.log(this.searchName, this.searchType)
        if (this.searchName === null && this.searchType === null){
          return;
        }
        axios.post('http://127.0.0.1:4523/m1/4236807-0-default/data/search', { token: 'test', search_name:this.searchName, search_type:this.searchType})
        .then(res => {
          console.log(res.data); // 返回的数据
          this.data = res.data.dataArray;
          this.dataLength = this.data.length;
          console.log('data[]=', this.data)
         })
        .catch(error => {
          console.error('Error creating user:', error);
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.beginId = val * 5 - 4;
        this.endId = val * 5;
      },
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
    display:flex; 
    flex-direction:column
  }
  .search_box{
    flex: 1;
    height:60px;
    align-items: center;
    background-color: white;
    display:flex;
    padding:10px;
    margin:10px;
    box-shadow: 0px 0px 2px rgb(180, 180, 180);
  }
  .record_message{
    display:flex;
    padding:0;
    overflow-y: hidden;
    flex:40;
    background-color:#ffffff;
  }
  .message_box{
    flex:5;
  }
  .change_pages{
    flex:1;
  } 
  .message_list{
    overflow-y: hidden;
    }
  .message_item{
    padding:10px;
    margin:7px;
    background-color: white; 
    box-shadow: 0px 0px 2px rgb(180, 180, 180);
    display:flex;
    height:210px;
  }
  .message_item:hover{
    box-shadow: 0px 0px 6px rgb(180, 180, 180);
  }
  .message_item_left{
    display: flex;  
    border-right:1.5px solid #cdcdcd; 
    flex:1;
    padding-right:10px;
    margin-left:14px;
  }
  .img-box{
    flex:2; 
    margin: 5px 10px; 
    height:180px;
    width:180px;
    padding:20px;
    box-shadow: 0px 0px 2px gray;
  }
  .img{
    object-fit: cover; 
    max-width: 100%; 
    max-height: 100%;
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
    border-right:1px solid #cdcdcd; 
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
.searchBT{
  flex:1;
  padding:10px;
  margin-right:15px;
}
.block{
  padding:30px;
  text-align: center;
}
  </style>
  