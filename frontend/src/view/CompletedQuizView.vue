<template>
  <div class="completed-quiz-view">
    <navbar-component />
    <div class="content">
      <CompletedQuizComponent />
    </div>
  </div>
</template>

<script setup>
import CompletedQuizComponent from "@/components/CompletedQuizComponent.vue";
import NavbarComponent from "@/components/NavBarComponent.vue";
</script>

<style scoped>

</style>