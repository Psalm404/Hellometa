<template>
  <div class = "container">
    <div class = "form_left">
      <div class = "title"> 增添凭证 </div> 
      <el-form ref="form" :model="form" label-width="80px"  >
          <div class = "message">
            <div class = "subtitle"> 数据信息</div>
            <div class = "intro">填写数据信息有助于您查看和管理您上传的数据。</div>
            <div style = "display: flex;">
            <el-form-item style="flex: 1; margin-right:35px;" required label="数据名称" >
              <el-input v-model="form.name" placeholder="请填写数据名称"></el-input>
           </el-form-item>
           <el-form-item style="flex: 1" required label="数据类别">
            <el-select style="width: 100%;" v-model="form.region" placeholder="请选择数据类别">
              <el-option  el-option label="文本" value="txt"></el-option>
              <el-option label="图片" value="pic"></el-option>
             </el-select>
           </el-form-item>
           </div>
           <el-form-item required label="数据介绍">
              <el-input type="textarea" :rows="5" v-model="form.desc" placeholder="请简要介绍您的数据信息，将会展示在上传记录中"></el-input>
            </el-form-item>
          </div>
          <div class = "message">
            <div class = "subtitle"> 数据上传 </div>
            <div class = "intro"> 请选择您要上链的数据。目前支持xxxxxxxx（后缀名）格式的文件，文件大小不得超过（）一次最多上传三个文件。</div>
            <el-upload 
              class="upload-demo"
              drag
              :limit = "3"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple style="line-height: 40px">
                  <div style = "margin:0; padding:0;" class="el-icon-upload"></div>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </div>
    </el-form>
    </div>
    <div class = "form_right">
      
      </div>
  </div>
</template>

  <script>
  export default {
    name: 'upload',
    data(){
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    }
  }
  </script>
  <style>
  .title{
    font-size: 23px; 
    font-weight: bold; 
    line-height: normal; 
    margin: 30px; 
    margin-bottom: 40px; 
    text-align: left;
  }
  .subtitle{
    line-height: 30px; 
    margin-top: 30px;
    text-align: left;
  }
  .intro{
    line-height: 35px; 
    margin-bottom: 30px; 
    font-size: 13px; 
    text-align: left; 
    color:gray;
  }
  .message{
    background-color: #ffffff; 
    padding: 50px; 
    padding-top: 20px; 
    border-radius: 10px;
    margin:15px;
    margin-bottom:30px;
  }
  /* element组件的样式写的还不错，但是文档写得也太烂了吧！！！里面封装了什么是一点也不知道，
  文档里已说明的可调整参数极少，还得自己去翻网页源码看它在里面装了啥，
  如果不看源码，谁知道它还往里面装了↓这个类啊？？？组件标签也没有，说明文档也没有，想要调整的参数半天找不到，你搁这藏啥呢？？OvO */
  .el-upload-dragger{
    padding:40px;
    line-height:30px;
  }
  .container{
    display: flex;
    /* justify-items: flex-end; */
  }
  .form_left{
    flex:3;
  }
  .form_right{
    flex:1;
  }
  .el-input{
    /* border:1px solid #4b566e; */
    border-radius:5px;
    margin:0;
    padding:0;
  }
  .el-input:is-active{
    border-color: #4b566e;
  }
  </style>