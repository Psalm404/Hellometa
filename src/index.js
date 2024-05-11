// 路由配置文件

import Vue from 'vue'
import VueRouter from 'vue-router'
import uploadWorks from './components/uploadWorks.vue'
import recordWorks from './components/recordWorks.vue'
import exhibitWorks from './components/exhibitWorks.vue'
import workDetails from './components/workDetails.vue'
import workInfo from './components/workInfo.vue'
Vue.use(VueRouter)

const router = new VueRouter({
 routes:[
    {
        path:'/uploadWorks',
        component:uploadWorks
      },
      {
        path:'/recordWorks',
        component:recordWorks
      },
      {
        path:'/exhibitWorks',
        component:exhibitWorks
      },
      {
        path:'/workDetails',
        component:workDetails
      },
      {
        path:'/workInfo',
        component:workInfo
      },
 ]
})

export default router