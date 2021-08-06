import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Login'
    // component: () => import ('../views/Login.vue')

  },
  {
    path: '/Login',
    component: () => import ('../views/Login.vue')
  },
  {
    path: '/Logout',
    component: () => import ('../views/Login.vue')
  },
  // {
  //   path: '/admin/:id',
  //   component: () => import ('../views/Folder.vue')
  // }
  {
    path: '/dashboard',
    component: () => import ('../views/Dashboard.vue')
  },
  {
    path: '/suratmasuk',
    component: () => import ('../views/SuratMasuk.vue')
  },
  {
    path: '/suratkeluar',
    component: () => import ('../views/SuratKeluar.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
