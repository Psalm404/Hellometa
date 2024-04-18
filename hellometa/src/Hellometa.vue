
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'Hellometa',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
   /* 设置背景图片的URL */
   /* background-image: url('assets/background.png'); */
  
  /* 设置背景图片的大小 */
  background-size: cover;
  
  /* 设置背景图片的位置 */
  background-position: center;
}
</style>