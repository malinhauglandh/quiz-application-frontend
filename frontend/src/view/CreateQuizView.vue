<template>
    <div class="create-quiz-view">
        <navbar-component></navbar-component>
        <div class="content">
            <CreateQuizComponent />
        </div>
    </div>
</template>

<script setup>
import NavbarComponent from '@/components/NavBarComponent.vue';
import CreateQuizComponent from "@/components/CreateQuizComponent.vue";

</script>

<style scoped>
</style>
