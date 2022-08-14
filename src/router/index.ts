import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/draw",
  },
  {
    path: "/draw",
    name: "draw",
    component: () => import(/* webpackChunkName: "home" */ "../views/DrawView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
