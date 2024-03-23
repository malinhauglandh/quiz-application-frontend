<template>
    <div class="search-view">
        <navbar-component></navbar-component>
        <div class="content">
            <SearchComponent />
        </div>
    </div>
</template>

<script>
import NavbarComponent from '@/components/NavBarComponent.vue';
import SearchComponent from "@/components/SearchComponent.vue";

export default {
    name: 'SearchView',
    components: {
        SearchComponent,
        NavbarComponent,
    },
}
</script>

<style scoped>
</style>
