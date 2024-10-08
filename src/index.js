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
import guidePage from './components/guidePage.vue'
import myGas from './components/myGas.vue'
import gasRecharge from './components/gasRecharge.vue'

import store from './store.js';
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
        path: '/uploadWorks',
        name: 'uploadWorks',
        component: uploadWorks,
        meta: { requiresAccountMatch: true },
      },
      {
        path: '/recordWorks',
        name: 'recordWorks',
        component: recordWorks,
        meta: { requiresAccountMatch: true },
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
      },
      {
        path:'/guidePage',
        component:guidePage,
      }
 ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAccountMatch)) {
//       if (!store.state.isAccountMatched) {
//           // 如果账户不匹配，阻止导航并重定向
//           next('/home'); // 或者您想重定向的其他页面
//       } else {
//           next(); // 账户匹配，允许导航
//       }
//   } else {
//       next(); // 无需检查，允许导航
//   }
// });

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.isLoggedIn;

  if (!isLoggedIn && to.path !== '/intro' && to.path !=='/register') {
    next('/intro');
  } else {
    // 如果目标路由需要账户匹配验证
    if (to.matched.some(record => record.meta.requiresAccountMatch)) {
      if (!store.state.isAccountMatched) {
        // 如果账户不匹配，阻止导航并重定向
        next('/home'); // 或者您想重定向的其他页面
      } else {
        next(); // 账户匹配，允许导航
      }
    } else {
      next(); // 无需检查，允许导航
    }
  }
});

export default router