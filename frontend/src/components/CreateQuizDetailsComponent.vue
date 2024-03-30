<template>
    <div class="create-quiz-details">
        <h1>Create Quiz</h1>
        <div class="input-field">
            <label for="quizName">Quiz Name</label>
            <input type="text" id="quizName" v-model="quizName" placeholder="Enter Quiz Name">
        </div>
        <div class="input-field">
            <label for="category">Category</label>
            <select id="category" v-model="category" class="placeholder-grey">
                <option value="" disabled selected>Select Category</option>
                <option value="history">History</option>
                <option value="sport">Sport</option>
                <option value="music">Music</option>
                <option value="random">Random</option>
            </select>
        </div>
        <div class="input-field">
            <label for="difficulty">Difficulty</label>
            <select id="difficulty" v-model="difficulty" class="placeholder-grey">
                <option value="" disabled selected>Select Difficulty Level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
        <div class="input-field">
            <label for="fileUpload">Upload File</label>
            <input type="file" id="fileUpload" @change="handleFileUpload" accept="image/*, video/*" :style="{ backgroundColor: fileUploaded ? 'white' : 'transparent' }">
        </div>
        <button class="next-button" @click="goToNextPage">NEXT</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const quizName = ref('');
const category = ref('');
const difficulty = ref('');
const fileUploaded = ref(false);
const router = useRouter();

// eslint-disable-next-line no-unused-vars
const handleFileUpload = (event) => {
    fileUploaded.value = true;
};

const goToNextPage = () => {
    router.push('/addquestions');
};
</script>

<style scoped>
.create-quiz-details {
    max-width: 600px;
    margin: 0 auto;
}

.input-field {
    margin-bottom: 50px;
}

.input-field label {
    display: block;
    margin-bottom: 3px;
    font-weight: bold;
    text-align: left;
    padding-left: 12px;
}

.input-field input,
.input-field select {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
}


button.next-button {
    padding: 15px 30px;
    background-color: #6320EE;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 22px;
    margin-left: calc(100% - 140px);
}

button.next-button:hover {
    background-color: #7E41FDFF;
}
</style>
