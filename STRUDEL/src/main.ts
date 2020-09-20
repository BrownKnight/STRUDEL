import Vue from "vue";
import VueRouter from "vue-router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "@/App.vue";
import Home from "@/pages/Home.vue";
import Users from "@/pages/Users.vue";
import Teams from "@/pages/Teams.vue";
import Fixtures from "@/pages/Fixtures.vue";
import Predictions from "@/pages/Predictions.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const routes = [
  { path: "/index", component: Home },
  { path: "/users", component: Users },
  { path: "/teams", component: Teams },
  { path: "/fixtures", component: Fixtures },
  { path: "/predictions", component: Predictions }
];

const router = new VueRouter({
  routes: routes
});

new Vue({
  render: h => h(App),
  router: router
}).$mount("#app");
