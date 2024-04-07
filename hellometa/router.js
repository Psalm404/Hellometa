// 路由配置文件

import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './src/pages/login'
import home from './src/pages/home'
import upload from './src/components/upload'
import record from './src/components/record'
import details from './src/components/details'

Vue.use(VueRouter)

const router = new VueRouter({
 routes:[
  {
    path:'/login',
    component:login
  },{
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