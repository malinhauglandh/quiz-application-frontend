<template>
    <div class="search-component">
        <div class="search-bar-container">
            <input type="text" v-model="searchQuery" placeholder="Search among all quizzes" class="search-bar">
            <font-awesome-icon icon="search" class="search-image" @click="searchQuizzes" />
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const searchQuery = ref('');

const searchQuizzes = () => {
    console.log("Searching quizzes...");
};
</script>

<style scoped>
.search-component {
    margin-top: 20px;
}

.search-bar-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-bar {
    width: 400px;
    height: 30px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-right: 10px;
    font-size: 16px;
}

.search-image {
    cursor: pointer;
    color: white;
  font-size: 30px;
}

@media screen and (max-width: 600px) {
    .search-bar {
        width: 70%;
    }
}
</style>
