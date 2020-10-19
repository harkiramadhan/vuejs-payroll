<template>
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded" :class="[color === 'light' ? 'bg-white' : 'bg-green-900 text-white']">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
            <div class="relative w-5/12 px-4 flex-grow flex-1 my-2">
                <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-gray-800' : 'text-white']">
                    Kredit Pegawai Darul Qur'an Mulia
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
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Nama Pegawai
                    </th>
                    <th class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Lembaga
                    </th>
                    <th width="200px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Total Kredit
                    </th>
                    <th width="5px" class="px-6 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-center" :class="[color === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-800 text-green-300 border-green-700']">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in resultQuery" :key="user.id">
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center items-center">
                        {{index+1}}
                    </th>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left items-center">
                        {{user.nama}}
                    </th>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        {{user.nama_lembaga}}
                    </th>
                    <th v-if="user.total" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        Rp. {{user.total}}
                        <input type="text" v-model="user.total" v-show="onType(index)" disabled>
                    </th>
                    <th v-else class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        -
                    </th>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap text-center">
                        <kredit-add v-bind:data="(user)" :show="showModal(user.idguru)" @close="toggleModal(user.idguru)" />
                        <button @click.stop="toggleModal(user.idguru)" class="bg-green-600 text-white active:bg-indigo-600 font-bold uppercase text-xs px-2 py-1 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            <i class="fas fa-plus mr-2 ml-1"></i><span class="mr-2">Kredit</span>
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
import KreditAdd from '@/components/Modals/KreditAdd.vue';
const apiurl = process.env.VUE_APP_APIURL

export default {
    data() {
        return {
            users: [],
            searchQuery: null,
            activeModal: 0,
            no: 1
        };
    },
    mounted() {
        this.load()
        for (let i = 0; i < this.users.length; i++)
            this.onType(i)
    },
    methods: {
        load() {
            axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios.get(apiurl + 'kredit').then(response => {
                this.users = response.data
            }).catch((err) => {
                console.log(err);
                localStorage.clear()
                this.$router.push("/")
            })
        },
        onType(i) {
            this.users[i].total = String(this.users[i].total).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
        KreditAdd
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
