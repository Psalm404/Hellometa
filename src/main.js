import Vue from 'vue'
import helloMeta from './helloMeta.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import router from '@/index'
import store from '@/store'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(helloMeta),
  router:router,
  store:store
}).$mount('#app')
