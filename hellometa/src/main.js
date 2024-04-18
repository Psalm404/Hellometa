import Vue from 'vue'
import Hellometa from './Hellometa.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import router from '/router'
import store from './store.js'
//  import "@/style/vue.scss";


Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(Hellometa),
  store,
  router:router
}).$mount('#app')
