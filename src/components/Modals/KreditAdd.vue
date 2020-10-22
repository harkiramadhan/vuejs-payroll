<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="relative w-auto my-6 mx-auto max-w-sm modal-container">
            <!--content-->
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <!--header-->
                <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t bg-gray-100">
                    <h4 class="text-lg font-semibold">
                        Tambah Kredit {{data.nama}}
                    </h4>
                    <button @click="close" class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
                        <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                        </span>
                    </button>
                </div>
                <!--body-->
                <form class="mt-10" @submit.prevent="save(data)">
                    <div class="relative p-6 flex-auto">
                        <div class="flex-auto px-4 lg:px-5 py-5 pt-0">
                            <label htmlfor="grid-password" class="block uppercase text-gray-700 text-xs font-bold mb-2 text-left ml-3"> Kredit </label>
                            <div class="relative flex w-full flex-wrap items-stretch mb-3">
                                <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3 ml-3">
                                    Rp.
                                </span>
                                <input type="text" @input="handleInput(data.idguru)" v-model="total" class="px-3 py-3 mr-3 ml-3 pl-3 text-gray-700 relative bg-gray-200 text-gray-700 rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10" required />
                            </div>
                        </div>
                    </div>
                    <!--footer-->
                    <div class="flex items-start justify-between p-5 border-t border-solid border-gray-300 rounded bg-gray-100">
                        <button @click="close" class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                            <i class="fas fa-times mr-2"></i>Batal
                        </button>
                        <button class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="submit">
                            <i class="fas fa-save mr-2"></i>Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const apiurl = process.env.VUE_APP_APIURL

export default {
    props: ['data'],
    data() {
        return {
            total: ''
        }
    },
    watch: {
        value: {
            handler(after) {
                this.total = this.format(after)
            },
            immediate: true
        }
    },
    mounted: function () {
        document.addEventListener("keydown", (e) => {
            if (this.show && e.keyCode == 27) {
                this.close()
            }
        })
    },
    methods: {
        format: value => (value + '').replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "."),

        handleInput(id) {
            console.log(id)
            this.total = this.format(this.total)
            this.$emit('input', (this.total + '').replace(/[^0-9]/g, ""))
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
        save() {
            const postData = {
                idpegawai: this.data.idguru,
                total: this.total,
            };
            axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios
                .post(apiurl + 'kredit', postData)
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire(
                            'Success!',
                            'Kredit ' + this.data.nama + ' Sejumlah Rp.' + this.total + ' Berhasil Di Simpan',
                            'success'
                        )
                    }
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire(
                        'Error',
                        'Kredit ' + this.data.nama + ' Sejumlah Rp.' + this.total + ' Gagal Di Simpan',
                        'error'
                    )
                })
            this.close()
        }
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
        width: 40%;
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
