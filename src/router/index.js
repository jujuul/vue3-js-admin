import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [{
    path: '/',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/account/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( /* webpackChunkName: "register" */ '../views/account/Register.vue'),
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import( /* webpackChunkName: "forget" */ '../views/account/Forget.vue'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import( /* webpackChunkName: "news" */ '../views/News.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
