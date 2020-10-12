<template>
<transition name="modal">
    <div class="modal-mask" v-show="show">
        <div class="relative w-auto my-6 mx-auto max-w-sm modal-container">
            <!--content-->
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <!--header-->
                <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t bg-gray-100">
                    <h3 class="text-xl font-semibold">
                        Detail User {{data.name}}
                    </h3>
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
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-left">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Username
                                </label>
                                <input name="email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" v-model="data.email" required>
                            </div>
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-left">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Role
                                </label>
                                <select class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:outline-none focus:shadow-outline" v-model="data.role" required>
                                    <option disabled>- Select Role -</option>
                                    <option :selected="data.role === 'admin'" value="admin">Admin</option>
                                    <option :selected="data.role === 'sdm'" value="sdm">SDM</option>
                                    <option :selected="data.role === 'keuangan'" value="keuangan">Keuangan</option>
                                    <option :selected="data.role === 'dqmart'" value="dqmart">DQ Mart</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-left">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Password
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="password" v-model="data.password">
                            </div>
                        </div>
                    </div>
                    <!--footer-->
                    <div class="flex items-start justify-between p-5 border-t border-solid border-gray-300 rounded bg-gray-100">
                        <button @click="close" class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                            Close
                        </button>
                        <button class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="submit">
                            Save Changes
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

export default {
    props: ['show', 'data'],
    data() {
        return {

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
            const apiurl = process.env.VUE_APP_APIURL
            const postData = {
                id: this.data.id,
                email: this.data.email,
                role: this.data.role,
                password: this.data.password,
                _method: "PUT"
            };
            axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios
                .put(apiurl + 'user', postData)
                .then(response => {
                    console.log(response.data);
                    if (this.data.id == localStorage.userid) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
                        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
                        axios
                            .post(apiurl + 'api/logout/')
                            .then(response => {
                                console.log(response)
                                localStorage.clear()
                                this.$router.push("/")
                            })
                    } else {
                        this.close()
                    }
                })
                .catch(err => {
                    console.log(err);
                })
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
