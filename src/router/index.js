import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/account/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import(/* webpackChunkName: "news" */ "../views/News.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
