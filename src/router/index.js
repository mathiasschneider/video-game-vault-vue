import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import ListsIndex from "../views/lists/Index.vue";
import ListsNew from "../views/lists/New.vue";
import ListsShow from "../views/lists/Show.vue";
import ListsEdit from "../views/lists/Edit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/lists",
    name: "Lists-index",
    component: ListsIndex,
  },
  {
    path: "/lists/new",
    name: "Lists-new",
    component: ListsNew,
  },
  {
    path: "/lists/:id",
    name: "Lists-show",
    component: ListsShow,
  },
  {
    path: "/lists/:id/edit",
    name: "Lists-edit",
    component: ListsEdit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
