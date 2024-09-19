// 路由配置文件

import Vue from 'vue'
import VueRouter from 'vue-router'
import myAccount from './components/myAccount.vue'
import uploadWorks from './components/uploadWorks.vue'
import recordWorks from './components/recordWorks.vue'
import exhibitWorks from './components/exhibitWorks.vue'
import workDetails from './components/workDetails.vue'
import workInfo from './components/workInfo.vue'
import homePage from './components/userHomePage.vue'
// import blockBrowser from './components/原blockBrowser.vue'
import transactionDetail from './components/transactionDetail.vue'
import loginPage from './components/loginPage.vue'
import registerPage from './components/registerPage.vue'
import userIntroPage from './components/userIntroPage.vue'
import guestIntroPage from './components/guestIntroPage.vue'
import editProfile from './components/editProfile.vue'

import myGas from './components/myGas.vue'
import gasRecharge from './components/gasRecharge.vue'
Vue.use(VueRouter)

const router = new VueRouter({
 routes:[
      {
        path: '/',
        redirect: '/intro'
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
        path:'/editProfile',
        component: editProfile
      },
      {
        path: '/intro',
        component: guestIntroPage
      },
      {
        path: '/blockBrowse',
        component: userIntroPage
      },
      {
        path: '/blockBrowse/transactionDetail',
        component:transactionDetail
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
      // {
      //   path: '/blockBrowser',
      //   component:blockBrowser
      // },
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