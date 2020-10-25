<template>
<div>
    <div class="flex flex-wrap">
        <div class="w-full w-12 mb-12 px-4">
            <card-line-kredit />
        </div>
        <div class="w-full xl:w-4/12 px-4">
            <card-bar-chart />
        </div>
    </div>
    <div class="flex flex-wrap mt-4">
        <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <card-page-visits />
        </div>
        <div class="w-full xl:w-4/12 px-4">
            <card-social-traffic />
        </div>
    </div>
</div>
</template>

<script>
import CardLineKredit from "@/components/Cards/CardLineKredit.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
export default {
    name: "dashboard-page",
    components: {
        CardLineKredit,
        CardBarChart,
        CardPageVisits,
        CardSocialTraffic,
    },
    mounted() {
        if (!localStorage.token) {
            this.$router.push("/")
        }

        if (localStorage.role != 'admin') {
            this.$router.push("/" + localStorage.role + "/dashboard")
        }
    },
};
</script>
