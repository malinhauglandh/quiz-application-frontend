<template>
  <div class="create-quiz-details">
    <h1>Create Quiz</h1>
    <div class="input-field">
      <label for="quizName">Quiz Name</label>
      <input type="text" id="quizName" v-model="quizName" placeholder="Enter Quiz Name">
    </div>
    <div class="input-field">
      <label for="quizDescription">Quiz Description</label>
      <input type="text" id="quizDescription" v-model="quizDescription" placeholder="Enter Quiz Description">
    </div>
    <div class="input-field">
      <label for="category">Category</label>
      <select v-model="selectedCategory">
        <option value="" disabled selected>Select Category</option>
        <option v-for="category in categories" :value="category.category_id" :key="category.category_id">{{ category.categoryName }}</option>
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
import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const quizName = ref('');
const quizDescription = ref('');
const multimedia = ref('');
const difficulty = ref('');
const fileUploaded = ref(false);
const router = useRouter();

const categories = ref([]);
const selectedCategory = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/categories/allCategories');
    categories.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

const saveQuiz = async () => {
  // Construct the quiz data
  const quizData = {
    quizName: quizName.value,
    quizDescription: quizDescription.value, // This assumes you have a way to set quizDescription
    multimedia: multimedia.value, // This assumes you have a way to set multimedia, e.g., after file upload
    difficultyLevel: difficulty.value,
    categoryId: selectedCategory.value, // Assuming this is the ID of the selected category
    // Add other fields as necessary
  };

  try {
    // Send a POST request to the backend to create a new quiz
    const response = await axios.post('http://localhost:8080/quizzes/createquiz', quizData);
    // Handle the response, e.g., navigate to another page or show a success message
    console.log('Quiz created:', response.data);
    router.push('/some-success-page');
  } catch (error) {
    console.error('Error creating quiz:', error);
  }
};

// Add the `saveQuiz` function to the "Next" button's click event

// eslint-disable-next-line no-unused-vars
const handleFileUpload = (event) => {
  fileUploaded.value = true;
};

const goToNextPage = () => {
  router.push('/addquestions');
  saveQuiz();
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
