<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="relative w-auto my-6 mx-auto max-w-sm modal-container">
            <!--content-->
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <!--header-->
                <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t bg-gray-100 pb-2">
                    <h4 class="text-lg font-semibold text-left">
                        Detail Kredit {{data.nama}}
                    </h4>
                    <button @click="close" class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
                        <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                        </span>
                    </button>
                </div>
                <!--body-->
                <div v-if="kredits.length > 0" class="relative p-6 flex-auto">
                    <div class="flex flex-wrap justify-between py-4 pt-4">
                        <div class="mr-4 p-3 text-left">
                            <span class="text-sm text-gray-500">Bulan</span>
                            <span class="text-xl font-bold block uppercase tracking-wide text-gray-700"> {{detail.bulan}} </span>
                        </div>
                        <div class="p-3 text-right">
                            <span class="text-sm text-gray-500">Total Kredit</span>
                            <span class="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                Rp. {{detail.total}}
                                <input type="text" v-model="data.total" v-show="onChange()" disabled>
                            </span>
                        </div>
                    </div>
                    <div class="block w-full overflow-x-auto pb-6" style="max-height: 650px">
                        <table class="table-auto items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th width="5px" class="px-3 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left bg-green-800 text-white border-green-700">
                                        No
                                    </th>
                                    <th class="px-3 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left bg-green-800 text-white border-green-700">
                                        Nominal
                                    </th>
                                    <th class="px-3 border border-solid py-2 text-xs uppercase border-l-0 border-r-0 font-semibold text-left bg-green-800 text-white border-green-700">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(kredit, index) in kredits" :key="kredit.id">
                                    <th class="border border-solid px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-3 text-center items-center">
                                        {{index+1}}
                                    </th>
                                    <th class="border border-solid px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-3 text-left items-center">
                                        Rp. {{kredit.total}}
                                    </th>
                                    <th class="border border-solid px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-3 text-left items-center">
                                        {{kredit.date}}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else class="relative px-6 py-4 flex-auto text-white bg-green-500">
                    <span class="text-4xl inline-block mr-5 align-middle">
                        <i class="fas fa-bell"></i>
                    </span> <br>
                    <span class="inline-block align-middle mr-8 mt-2">
                        <strong class="text-lg">Belum Ada Kredit Yang Di Ajukan</strong>
                    </span>
                </div>
                <!--footer-->
                <div class="flex items-start justify-between p-5 border-t border-solid border-gray-300 rounded bg-gray-100">
                    <button @click="close" class="ml-auto bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import axios from 'axios';
// import Swal from 'sweetalert2';

const apiurl = process.env.VUE_APP_APIURL

export default {
    props: ['data'],
    data() {
        return {
            detail: [],
            kredits: []
        }
    },
    mounted() {
        this.load()
        this.onChange()
    },
    methods: {
        load() {
            axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios.get(apiurl + 'kredit/detail/' + this.data.idguru).then(response => {
                this.detail = response.data
                this.kredits = response.data.kredit
            }).catch((err) => {
                console.log(err);
            })
        },
        close: function () {
            this.$emit('close')
        },
        toggleModal: function (id) {
            if (this.activeModal !== 0) {
                this.activeModal = 0
                return false
            }
            this.activeModal = id
        },
        onChange() {
            this.detail.total = String(this.detail.total).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
    overflow-x: auto;
}

@media only screen and (max-width: 700px) {
    .modal-container {
        width: 100%;
        height: 75%;
        margin: 50px auto;
        padding: 20px 30px;
        transition: all .3s ease;
    }
}

@media only screen and (min-width: 700px) {
    .modal-container {
        width: 60%;
        height: 75%;
        margin: 50px auto;
        padding: 20px 30px;
        transition: all .3s ease;
    }
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
