// 路由配置文件

import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './src/pages/login'
import home from './src/pages/home'
import register from './src/pages/register'
import upload from './src/components/upload'
import record from './src/components/record'
import details from './src/components/details'
import mymessage from './src/pages/mymessage'

Vue.use(VueRouter)

const router = new VueRouter({
 routes:[
  {
    path:'/login',
    component:login
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/mymessage',
    component: mymessage
  },
  {
    path: '/home',
    component:home,
    children: [
      {
        path: 'upload',
        component: upload
      },
      {
        path: 'record',
        component: record,
      },
      {
        path:'details',
        component:details
      }
    ]
  },{
    path: '/',
    redirect: '/login'
  }
  
 ]
})

export default router