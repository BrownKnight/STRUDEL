import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Vuex from "vuex";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import moment from "moment";

import App from "@/App.vue";
import Home from "@/pages/Home.vue";
import Users from "@/pages/Users.vue";
import Teams from "@/pages/Teams.vue";
import Fixtures from "@/pages/Fixtures.vue";
import Predictions from "@/pages/Predictions.vue";
import Login from "@/pages/Login.vue";

import { Store } from "@/authStore.ts";

// Our "weeks" start on a tuesday, so set start of week to tuesday
moment.locale("en", {
  week: {
    dow: 2
  }
});

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);

const routes: RouteConfig[] = [
  { path: "/index", component: Home },
  { path: "/", redirect: "/index" },
  { path: "/users", component: Users },
  { path: "/teams", component: Teams },
  { path: "/fixtures", component: Fixtures },
  { path: "/predictions", component: Predictions },
  { path: "/login", component: Login }
];

const router = new VueRouter({
  routes: routes
});

// Ensure user is authenticated before they are allowed to route
router.beforeEach((to, from, next) => {
  console.log("checking");
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = !!Store.state.AuthModule.token;

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

new Vue({
  render: h => h(App),
  router: router,
  store: Store
}).$mount("#app");
