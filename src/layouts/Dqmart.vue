<template>
<div>
    <dqmart-sidebar />
    <div class="relative md:ml-64 bg-gray-200">
        <admin-navbar />
        <header-stats />
        <div class="px-4 md:px-10 mx-auto w-full -m-24">
            <router-view />
            <footer-admin />
        </div>
    </div>
</div>
</template>

<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import DqmartSidebar from "@/components/Sidebar/DqmartSidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
export default {
    name: "admin-layout",
    components: {
        AdminNavbar,
        DqmartSidebar,
        HeaderStats,
        FooterAdmin,
    },
};
</script>
