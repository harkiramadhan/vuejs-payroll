<template>
<div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
        <card-table />
    </div>
</div>
</template>

<script>
import CardTable from "@/components/AdminTables/UsersTables.vue";

export default {
    components: {
        CardTable,
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
