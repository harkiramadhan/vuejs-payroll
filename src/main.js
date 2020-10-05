import Vue from "vue";
import VueRouter from "vue-router";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

import App from "@/App.vue";
import Auth from "@/layouts/Auth.vue";
import Login from "@/views/auth/Login.vue";
import Admin from "@/layouts/Admin.vue";
import Dashboard from "@/views/admin/Dashboard.vue";

const routes = [
  {
    path: "/",
    component: Auth,
    children: [
      {
        path: "/",
        component: Login,
      },
    ]
  },
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      }
    ],
  },
  { path: "*", redirect: "/" },
];

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
