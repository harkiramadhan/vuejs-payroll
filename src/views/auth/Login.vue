<template>
<div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full pt-10 mt-20">
        <div class="w-full lg:w-4/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form class="mt-10" @submit.prevent="login">
                        <p class="text-center mb-5 text-red-500" v-if="errors">
                            <b>Username atau Password Tidak Cocok</b>
                        </p>
                        <div class="relative w-full mb-3">
                            <label class="txt block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Username
                            </label>
                            <input v-model="email" type="text" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" placeholder="Username" required />
                        </div>

                        <div class="relative w-full mb-3">
                            <label class="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Password
                            </label>
                            <input v-model="password" type="password" class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" placeholder="Password" required />
                        </div>

                        <div class="text-center mt-6">
                            <button class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="submit">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            errors: ''
        }
    },
    mounted() {
        if (localStorage.token) {
            this.token = localStorage.token;
            console.log(this.token)
            this.$router.push("/dashboard");
        }
    },
    methods: {
        login() {
            const postData = {
                email: this.email,
                password: this.password
            };
            axios
                .post('http://127.0.0.1:8000/api/login', postData)
                .then(response => {
                    console.log(response.data.success.token);
                    const token = response.data.success.token;
                    localStorage.token = token
                    this.$router.push("/dashboard");

                })
                .catch(error => {
                    console.log(error)
                    this.errors = true
                })
        }
    }
}
</script>
