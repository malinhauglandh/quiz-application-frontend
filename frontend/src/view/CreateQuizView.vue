<template>
    <div class="create-quiz-view">
        <navbar-component></navbar-component>
        <div class="content">
            <router-view v-if="!showAddQuestions"></router-view>
            <router-view v-else></router-view>
        </div>
    </div>
</template>

<script setup>
import NavbarComponent from '@/components/NavBarComponent.vue';
import { ref } from 'vue';

const showAddQuestions = ref(false);

</script>

<style scoped>
</style>
