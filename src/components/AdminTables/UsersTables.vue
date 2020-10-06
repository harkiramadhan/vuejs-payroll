<template>
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded" :class="[color === 'light' ? 'bg-white' : 'bg-green-900 text-white']">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
            <div class="relative w-full px-2 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-gray-800' : 'text-white']">
                    Users
                </h3>
            </div>
        </div>
    </div>
    <div class="block w-full overflow-x-auto">
        <table class="table-auto items-center w-full bg-transparent border-collapse">
            <thead>
                <tr>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        No
                    </th>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Username
                    </th>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Email
                    </th>
                    <th class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Roles
                    </th>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-center" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left items-center">
                        1
                    </th>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left items-center">
                        {{user.name}}
                    </th>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {{user.email}}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {{user.role}}
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

export default {
    data() {
        return {
            users: [],
            activeModal: 0,
        };
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios.get('http://127.0.0.1:8000/api/users').then(response => {
                console.log(response.data);
                this.users = response.data
            }).catch((err) => {
                console.log(err);
            })
        },
        showModal: function (id) {
            return this.activeModal === id
        },
        toggleModal: function (id) {
            if (this.activeModal !== 0) {
                this.activeModal = 0
                return false
            }
            this.activeModal = id
        }
    },
    components: {
        UserDetail,
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
