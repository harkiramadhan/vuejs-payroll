<template>
<!-- Navbar -->
<nav class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
    <div class="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
        <!-- Brand -->
        <a class="text-white text-sm uppercase hidden lg:inline-block font-semibold" href="javascript:void(0)">
            {{ this.to }}
        </a>
        <!-- User -->
        <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
            <user-dropdown />
        </ul>
    </div>
</nav>
<!-- End Navbar -->
</template>

<script>
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

export default {
    data() {
        return {
            to: this.$route.name,
            from: ''
        }
    },
    watch: {
        $route(to, from) {
            this.to = to.name
            this.from = from.name
        }
    },
    components: {
        UserDropdown,
    },
};
</script>
