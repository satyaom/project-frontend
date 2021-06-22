import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Overview" */ '../views/Dashboard.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Overview" */ '../views/Overview.vue')
      },  
      {
      path: '/files',
      name: 'Files',
      component: () => import(/* webpackChunkName: "Messages" */ '../views/Files.vue')
      },
      {
      path: '/uploadFile',
      name: 'UploadFile',
      component: () => import(/* webpackChunkName: "Profile" */ '../views/Uploadfile.vue')
      },
      {
        path: '/changeFile',
        name: 'ChangeFile',
        component: () => import(/* webpackChunkName: "Settings" */ '../views/Changefile.vue')
      }
    ],  
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
