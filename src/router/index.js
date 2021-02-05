import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/combat",
      name: "Combat",
      component: () => import("@/views/combat")
    },
    {
      path: "/intertwine",
      name: "Intertwine",
      component: () => import("@/views/intertwine")
    },
    {
      path: "/",
      redirect: "/combat"
    }
  ]
});
