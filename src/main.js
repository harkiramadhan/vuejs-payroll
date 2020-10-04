import Vue from "vue";
import VueRouter from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

import App from "@/App.vue";
import Auth from "@/layouts/Auth.vue";
import Login from "@/views/auth/Login.vue";

const routes = [
  {
    path: "/",
    component: Auth,
    children: [
      {
        path: "/",
        component: Login,
      },
    ],
  },
];

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
