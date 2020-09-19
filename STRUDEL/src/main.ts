import Vue from "vue";
import VueRouter from "vue-router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "@/App.vue";
import Home from "@/pages/Home.vue";
import Users from "@/pages/Users.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const routes = [
  { path: "/index", component: Home },
  { path: "/users", component: Users }
];

const router = new VueRouter({
  routes: routes
});

new Vue({
  render: h => h(App),
  router: router
}).$mount("#app");
