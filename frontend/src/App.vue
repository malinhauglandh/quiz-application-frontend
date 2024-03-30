<template>
  <body>
  <main>
    <router-view />
  </main>
  </body>
</template>

<script setup>
import { defineComponent} from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  /*background-image: linear-gradient(120deg, #bcb6ff 20%, #6320EE 80%);*/
  background-color: #BCB6FF;
}

body {
    background-color: #BCB6FF;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #211a1d;
    margin: 0;
    padding: 0;
}
</style>
