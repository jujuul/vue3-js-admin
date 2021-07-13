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
    component: () => import( /* webpackChunkName: "about" */ '../views/account/Register.vue'),
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
