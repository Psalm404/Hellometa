import Vue from 'vue';
import helloMeta from './helloMeta.vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import router from '@/index'; // 导入 router 实例
import store from '@/store';
import axios from 'axios';

// 关闭生产提示
Vue.config.productionTip = false;

// 使用 VueRouter
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(ViewUI);

// 设置 Axios 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token && !config.url.includes('/login') && !config.url.includes('/register') && !config.url.includes('pinata')) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 重写 Router 的 push 方法, 重复跳转时报错而非崩溃
const originalPush = VueRouter.prototype.push; // 正确引用 VueRouter.prototype
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 创建 Vue 实例
new Vue({
  el: '#app',
  render: h => h(helloMeta),
  router,  // 将 router 添加到 Vue 实例
  store,   // 将 store 添加到 Vue 实例
}).$mount('#app');