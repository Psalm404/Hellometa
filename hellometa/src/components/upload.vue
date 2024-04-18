<template>
  <div class = "container">
    <transition name="el-fade-in-linear">
    <div class = "form_left" v-show = "show1">
      <div class = "title"> 增添凭证 </div> 
      <el-form ref="form" :model="form" label-width="80px"  >
          <div class = "message">
            <div class = "subtitle"> 数据信息</div>                        
            <div class = "intro">填写数据信息有助于您查看和管理上传的数据。</div>
            <div style = "display: flex;">
            <el-form-item style="flex: 1; margin-right:35px;" required label="数据名称" class = "upload-form-item">
              <el-input v-model="form.name" placeholder="请填写数据名称"></el-input>
           </el-form-item>
           <el-form-item style="flex: 1" required label="数据类别" class = "upload-form-item">
            <el-select style="width: 100%;" v-model="form.region" placeholder="请选择数据类别"class = "upload-form-item">
              <el-option  el-option label="文本" value="txt"></el-option>
              <el-option label="图片" value="pic"></el-option>
             </el-select>
           </el-form-item>
           </div>
           <el-form-item class = "upload-form-item" required label="数据介绍">
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
            <div class = "message">
            <div class = "subtitle"> 封面上传（可选择） </div>
            <div class = "intro">上传的封面将展示在历史记录中，若选择不上传则使用默认图片。</div>
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
             
               :limit="1">
                <i class="el-icon-plus"></i>
                </el-upload>
                  <el-dialog >
                <img width="100%"  alt="">
                </el-dialog>
            </div>
            
    </el-form>
    </div>
    </transition>
  </div>
</template>

  <script>
  export default {
    name: 'upload',
    mounted(){
      setTimeout(() => {
          this.show1 = true;
        },  200); 
    },
    data(){
      return {
        show1: false,
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
    color:white;
  }
  .subtitle{
    line-height: 30px; 
    margin-top: 30px;
    text-align: left;
    color:white;
  }
  .intro{
    line-height: 35px; 
    margin-bottom: 30px; 
    font-size: 13px; 
    text-align: left; 
    color:white;
  }
  .message{
    color:white;
    background-color: rgb(31, 31, 31);
    border-radius: 10px;
    min-height:400px;
    padding: 50px; 
    padding-top: 20px; 
    margin:15px;
    margin-bottom:30px;
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  .upload-form-item label{
    color:white;
  }
  .upload-form-item .el-input input{
    color:white;
    background: transparent;
    border:1px solid gray;
  }
  .upload-form-item .el-textarea textarea{
    color:white;
    background: transparent;
    border:1px solid gray;
  }
  .el-upload-dragger{
    background-color:transparent;
    padding:40px;
    line-height:30px;
  }
  .container{
    display: flex;
    overflow-y: hidden;
    height:100%
  }
  .form_left{
    flex:7;
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
  .el-upload__text{
    color:white;

  }
  </style>