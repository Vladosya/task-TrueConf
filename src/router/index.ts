import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../components/Home.vue";
import Green from "../components/Green.vue";
import Yellow from "../components/Yellow.vue";
import Red from "../components/Red.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/green",
        name: "Green",
        component: Green,
      },
      {
        path: "/yellow",
        name: "Yellow",
        component: Yellow,
      },
      {
        path: "/red",
        name: "Red",
        component: Red,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
