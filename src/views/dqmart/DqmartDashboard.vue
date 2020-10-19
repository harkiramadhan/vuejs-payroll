<template>
<div>
    <div class="flex flex-wrap items-center justify-center">
        <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 class="text-gray-500 uppercase font-bold text-xs"> NEW USERS </h5><span class="font-semibold text-xl text-gray-800"> 2,356 </span>
                        </div>
                        <div class="relative w-auto pl-4 flex-initial">
                            <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"><i class="fas fa-chart-pie"></i></div>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 mt-4"><span class="mr-2 text-red-500"><i class="fas fa-arrow-down"></i> 3.48% </span><span class="whitespace-no-wrap">Since last week</span></p>
                </div>
            </div>
        </div>
        <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 class="text-gray-500 uppercase font-bold text-xs"> Total Kredit </h5>
                            <span class="font-semibold text-xl text-gray-800">
                                Rp. {{data.total}}
                                <input type="text" v-model="data.total" v-show="onType()" disabled>
                            </span>
                        </div>
                        <div class="relative w-auto pl-4 flex-initial">
                            <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"><i class="fas fa-coins"></i></div>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 mt-4"><span class="whitespace-no-wrap">Bulan {{data.bulan}}</span></p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
const apiurl = process.env.VUE_APP_APIURL

export default {
    data() {
        return {
            data: [],
        };
    },
    components: {

    },
    mounted() {
        this.load()
        this.onType()

        if (!localStorage.token) {
            this.$router.push("/")
        }

        if (localStorage.role != 'dqmart') {
            this.$router.push("/" + localStorage.role + "/dashboard")
        }
    },
    methods: {
        load() {
            axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            axios.get(apiurl + 'kredit/all').then(response => {
                this.data = response.data
            }).catch((err) => {
                console.log(err);
                localStorage.clear()
                this.$router.push("/")
            })
        },
        onType() {
            this.data.total = String(this.data.total).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
};
</script>
