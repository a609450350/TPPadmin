import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cs',
    name: 'cs',
    component: () => import('../views/cs'),
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('../views/index'),
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login'),
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import('../views/Admin'),
    redirect:'/Admin/admin',
    children:[
      {
        path: 'hall',
        name: 'hall',
        component: () => import('../views/Hall'),
      },
      {
        path: 'cinema',
        name: 'cinema',
        component: () => import('../views/Cinema'),
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: () => import('../views/Schedule'),
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('../views/Comment'),
      },
      {
        path: 'movie',
        name: 'movie',
        component: () => import('../views/Movie'),
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('../views/admin1'),
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/Order'),
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to,from,next)=>{
//   if(to.path==='/'){
//       next()
//   }else{
//     const token = window.sessionStorage.getItem('token');
//     if(!token){
//         next('/')
//     }else{
//         next()
//     }
//   }
// })
export default router
