<template>
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded" :class="[color === 'light' ? 'bg-white' : 'bg-green-900 text-white']">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
            <div class="relative w-5/12 px-4 flex-grow flex-1 my-2">
                <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-gray-800' : 'text-white']">
                    Users
                </h3>
            </div>
            <div class="relative w-2/12 px-4 my-2">
                <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                    <i class="fas fa-search"></i>
                </span>
                <input type="text" v-model="searchQuery" placeholder="Search User" class="px-2 py-1 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
            </div>
            <div class="relative w-2/12 px-4 text-right my-2">
                <UserAdd :show="showAddModal()" @close="toggleAddModal()" />
                <button @click.stop="toggleAddModal()" class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    <i class="fas fa-plus-circle"></i> User
                </button>
            </div>
        </div>
    </div>
    <div class="block w-full overflow-x-auto" style="max-height: 650px">
        <table class="table-auto items-center w-full bg-transparent border-collapse">
            <thead>
                <tr>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        No
                    </th>
                    <th class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Username
                    </th>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Roles
                    </th>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-center" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Created At
                    </th>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-center" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Updated At
                    </th>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-center" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in resultQuery" :key="user.id">
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left items-center">
                        {{user.id}}
                    </th>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left items-center">
                        {{user.email}}
                    </th>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {{user.role}}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {{user.created_at}}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {{user.updated_at}}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap text-center">
                        <UserDetail v-bind:data="(user)" :show="showModal(user.id)" @close="toggleModal(user.id)" />
                        <button @click.stop="toggleModal(user.id)" class="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-2 py-1 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            <i class="fas fa-pencil-alt mr-2 ml-1"></i><span class="mr-2">Edit</span>
                        </button>
                        <button class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-2 py-1 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ml-1" type="button">
                            <i class="fas fa-trash mr-2 ml-1"></i><span class="mr-2">Delete</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import UserDetail from '@/components/Modals/UserDetail.vue';
import UserAdd from '@/components/Modals/UserAdd.vue';

export default {
    data() {
        return {
            users: [],
            activeModal: 0,
            activeModalAdd: 0,
            searchQuery: null,
        };
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            const apiurl = process.env.VUE_APP_APIURL
            console.log(apiurl);
            axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios.get(apiurl + 'user').then(response => {
                this.users = response.data
            }).catch((err) => {
                console.log(err);
                localStorage.clear()
                this.$router.push("/")
            })
        },
        showModal: function (id) {
            return this.activeModal === id
        },
        toggleModal: function (id) {
            if (this.activeModal !== 0) {
                this.load();
                this.activeModal = 0
                return false
            }
            this.activeModal = id
        },
        showAddModal: function () {
            return this.activeModalAdd === 1
        },
        toggleAddModal: function () {
            if (this.activeModalAdd !== 0) {
                this.load();
                this.activeModalAdd = 0
                return false
            }
            this.activeModalAdd = 1
        }
    },
    components: {
        UserDetail,
        UserAdd
    },
    computed: {
        resultQuery() {
            if (this.searchQuery) {
                return this.users.filter((user) => {
                    return this.searchQuery.toLowerCase().split(' ').every(v => user.email.toLowerCase().includes(v))
                })
            } else {
                return this.users;
            }
        }
    },
    props: {
        color: {
            default: "light",
            validator: function (value) {
                return ["light", "dark"].indexOf(value) !== -1;
            },
        },
    },
    variants: {
        tableLayout: ['responsive', 'hover', 'focus'],
    }

};
</script>
