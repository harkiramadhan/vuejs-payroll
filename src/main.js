import Vue from "vue";
import VueRouter from "vue-router";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

import App from "@/App.vue";
import Auth from "@/layouts/Auth.vue";
import Login from "@/views/auth/Login.vue";
import Admin from "@/layouts/Admin.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Users from "@/views/admin/Users.vue";
import VueSweetalert2 from 'vue-sweetalert2';

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
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/users",
        component: Users,
      },
    ],
  },
  { path: "*", redirect: "/" },
];

Vue.config.productionTip = false;

Vue.use(VueRouter, VueSweetalert2);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
