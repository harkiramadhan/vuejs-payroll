<template>
<transition name="modal">
    <div class="modal-mask" v-show="show">
        <div class="relative w-auto my-6 mx-auto max-w-sm modal-container">
            <!--content-->
            <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-red-500">
                <!--header-->
                <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t text-white">
                    <h3 class="text-xl font-semibold">
                        Delete Confirmation
                    </h3>
                </div>
                <!--body-->
                <div class="relative p-6 flex-auto bg-red-500">
                    <div class="flex-auto px-4 lg:px-5 py-5 pt-0">
                        <div class="w-full md:w-12/12 px-3 mb-6 md:mb-0 text-center">
                            <h3 class="text-white text-xl">Delete User</h3>
                            <h1 class="text-white text-2xl"><strong>{{data.email}}</strong></h1>
                            <h3 class="text-white text-xl">- {{data.role}}</h3>
                        </div>
                    </div>
                </div>
                <!--footer-->
                <div class="flex items-start justify-between p-5 border-t border-solid border-gray-300 rounded bg-red-500">
                    <button @click="close" class="bg-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                        Close
                    </button>
                    <button @click="deleteData" class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                        Delete
                    </button>
                </div>
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
            if (this.activeModalDelete !== 0) {
                this.activeModalDelete = 0
                return false
            }
            this.activeModalDelete = id
        },
        deleteData() {
            const apiurl = process.env.VUE_APP_APIURL

            axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios
                .delete(apiurl + 'user/' + this.data.id)
                .then(response => {
                    console.log(response);
                    this.close()
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
