// 路由配置文件

import Vue from 'vue'
import VueRouter from 'vue-router'
import myAccount from './components/myAccount.vue'
import uploadWorks from './components/uploadWorks.vue'
import recordWorks from './components/recordWorks.vue'
import exhibitWorks from './components/exhibitWorks.vue'
import workDetails from './components/workDetails.vue'
import workInfo from './components/workInfo.vue'
import homePage from './components/homePage.vue'
import blockBrowser from './components/blockBrowser.vue'
import transactionDetail from './components/transactionDetail.vue'
import loginPage from './components/loginPage.vue'
import registerPage from './components/registerPage.vue'
import myGas from './components/myGas.vue'
import gasRecharge from './components/gasRecharge.vue'
Vue.use(VueRouter)

const router = new VueRouter({
 routes:[
      {
        path: '/',
        redirect: '/home'
      },
      {
        path:'/register',
        component: registerPage
      },
      {
        path:'/login',
        component: loginPage
      },
      {
        path: '/home',
        component: homePage
      },
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
      {
        path: '/blockBrowser',
        component:blockBrowser
      },
      {
        path: '/blockBrowser/transactionDetail',
        component:transactionDetail
      },
      {
        path: '/myAccount',
        component:myAccount
      },
      {
        path:'/myGas',
        component:myGas
      },
      {
        path:'/myGas/gasRecharge',
        component:gasRecharge,
      }
 ]
})

export default router