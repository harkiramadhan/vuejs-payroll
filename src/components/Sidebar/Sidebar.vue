<template>
<nav class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
    <div class="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <!-- Toggler -->
        <button class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" type="button" v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')">
            <i class="fas fa-bars"></i>
        </button>
        <!-- Brand -->
        <router-link class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0" to="/">
            DQM - Payroll
        </router-link>
        <!-- User -->
        <ul class="md:hidden items-center flex flex-wrap list-none">
            <li class="inline-block relative">
                <user-dropdown />
            </li>
        </ul>
        <!-- Collapse -->
        <div class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded" v-bind:class="collapseShow">
            <!-- Collapse header -->
            <div class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
                <div class="flex flex-wrap">
                    <div class="w-6/12">
                        <router-link class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0" to="/">
                            DQM - Payroll
                        </router-link>
                    </div>
                    <div class="w-6/12 flex justify-end">
                        <button type="button" class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" v-on:click="toggleCollapseShow('hidden')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                <li class="items-center">
                    <router-link to="/admin/dashboard" v-slot="{ href, route, navigate, isActive }">
                        <a :href="href" @click="navigate" class="text-xs uppercase py-3 font-bold block" :class="[
                  isActive
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]">
                            <i class="fas fa-tv mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-gray-400']"></i>
                            Dashboard
                        </a>
                    </router-link>
                </li>

                <li class="items-center">
                    <router-link to="/admin/users" v-slot="{ href, route, navigate, isActive }">
                        <a :href="href" @click="navigate" class="text-xs uppercase py-3 font-bold block" :class="[
                  isActive
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]">
                            <i class="fas fa-users mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-gray-400']"></i>
                            Users
                        </a>
                    </router-link>
                </li>

                <li class="items-center">
                    <router-link to="/admin/settings" v-slot="{ href, route, navigate, isActive }">
                        <a :href="href" @click="navigate" class="text-xs uppercase py-3 font-bold block" :class="[
                  isActive
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]">
                            <i class="fas fa-tools mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-gray-400']"></i>
                            Settings
                        </a>
                    </router-link>
                </li>

                <li class="items-center">
                    <router-link to="/admin/tables" v-slot="{ href, route, navigate, isActive }">
                        <a :href="href" @click="navigate" class="text-xs uppercase py-3 font-bold block" :class="[
                  isActive
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]">
                            <i class="fas fa-table mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-gray-400']"></i>
                            Tables
                        </a>
                    </router-link>
                </li>

                <li class="items-center">
                    <router-link to="/admin/maps" v-slot="{ href, route, navigate, isActive }">
                        <a :href="href" @click="navigate" class="text-xs uppercase py-3 font-bold block" :class="[
                  isActive
                    ? 'text-green-500 hover:text-green-600'
                    : 'text-gray-800 hover:text-gray-600',
                ]">
                            <i class="fas fa-map-marked mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-gray-400']"></i>
                            Maps
                        </a>
                    </router-link>
                </li>

                <div class="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25"></div>

                <li class="items-center">
                    <a href="javascript:void(0);" v-on:click="logout($event)" class="text-xs uppercase py-3 font-bold block">
                        <i class="fas fa-sign-out-alt mr-3 text-sm"></i>
                        Logout
                    </a>
                </li>

            </ul>
        </div>
    </div>
</nav>
</template>

); }

<script>
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
import axios from 'axios';

const apiurl = process.env.VUE_APP_APIURL

export default {
    data() {
        return {
            collapseShow: "hidden",
        };
    },
    methods: {
        toggleCollapseShow: function (classes) {
            this.collapseShow = classes;
        },
        logout(event) {
            event.preventDefault()
            axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios
                .post(apiurl + 'logout/')
                .then(response => {
                    if (response.status === 200) {
                        localStorage.clear()
                        this.$router.push("/")
                    }
                })

        }
    },
    components: {
        UserDropdown,
    },
};
</script>
