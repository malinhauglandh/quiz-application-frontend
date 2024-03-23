<template>
    <div class="home-view">
        <navbar-component></navbar-component>
        <div class="content">
            <HomeComponent />
        </div>
    </div>
</template>

<script>
import NavbarComponent from '@/components/NavBarComponent.vue';
import HomeComponent from '@/components/HomeComponent.vue';

export default {
    name: 'HomeView',
    components: {
        NavbarComponent,
        HomeComponent
    },
}
</script>

<style scoped>
</style>
