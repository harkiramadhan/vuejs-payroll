<template>
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded" :class="[color === 'light' ? 'bg-white' : 'bg-green-900 text-white']">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
            <div class="relative w-5/12 px-4 flex-grow flex-1 my-2">
                <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-gray-800' : 'text-white']">
                    Pegawai Darul Qur'an Mulia
                </h3>
            </div>
            <div class="relative w-2/12 px-4 my-2">
                <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                    <i class="fas fa-search"></i>
                </span>
                <input type="text" v-model="searchQuery" placeholder="Cari Pegawai" class="px-2 py-1 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
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
                        Nama Pegawai
                    </th>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Lembaga
                    </th>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-center" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in resultQuery" :key="user.idguru">
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center items-center">
                        {{index+1}}
                    </th>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left items-center">
                        {{user.nama}}
                    </th>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        {{user.nama_lembaga}}
                    </th>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap text-center">
                        <UserKreditDetail v-if="showModal(user.idguru)" v-bind:data="(user)" @close="toggleModal(user.idguru)" />
                        <button @click.stop="toggleModal(user.idguru)" class="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-2 py-1 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            <i class="fas fa-eye mr-2 ml-1"></i><span class="mr-2">Detail</span>
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
import UserKreditDetail from '@/components/Modals/UserKreditDetail.vue';
// const apiurl = process.env.VUE_APP_APIURL

export default {
    data() {
        return {
            users: [],
            searchQuery: null,
            no: 1,
            activeModal: 0
        };
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios.get('http://kepegawaian.dqakses.id/api/pegawai_kompleks').then(response => {
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
    },
    components: {
        UserKreditDetail
    },
    computed: {
        resultQuery() {
            if (this.searchQuery) {
                return this.users.filter((user) => {
                    return this.searchQuery.toLowerCase().split(' ').every(v => user.nama.toLowerCase().includes(v))
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
