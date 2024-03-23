<template>
    <div class="create-quiz-view">
        <navbar-component></navbar-component>
        <div class="content">
            <CreateQuizComponent />
        </div>
    </div>
</template>

<script>
import NavbarComponent from '@/components/NavBarComponent.vue';
import CreateQuizComponent from "@/components/CreateQuizComponent.vue";

export default {
    name: 'CreateQuizView',
    components: {
        CreateQuizComponent,
        NavbarComponent,
    },
}
</script>

<style scoped>
</style>
