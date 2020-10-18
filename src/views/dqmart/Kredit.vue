<template>
<div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
        <kredit-table />
    </div>
</div>
</template>

<script>
import KreditTable from "@/components/AdminTables/KreditTable.vue";

export default {
    components: {
        KreditTable,
    },
    mounted() {
        if (!localStorage.token) {
            this.$router.push("/")
        }

        if (localStorage.role != 'dqmart') {
            this.$router.push("/" + localStorage.role + "/dashboard")
        }
    },
};
</script>
