<template>
  <div class="start-playing-quiz-view">
    <navbar-component />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavbarComponent from '@/components/NavBarComponent.vue';

</script>

<style scoped>
</style>