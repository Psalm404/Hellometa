const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭驼峰命名法
  lintOnSave:false 
})


 
// module.exports = {
//     module: {
//       rules: [
//         {
//           test: /\.s[ac]ss$/i,
//           use: ['sass-loader', 'sass'],
//         },
//       ],
//     },
// };