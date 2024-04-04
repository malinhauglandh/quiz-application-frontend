<template>
  <div class="create-quiz-details">
    <h1>Create Quiz</h1>
    <div class="input-field">
      <label for="quizName">Quiz Name</label>
      <input type="text" id="quizName" v-model="quizName" placeholder="Enter Quiz Name" maxlength="50">
      <span>{{ 50 - quizName.length }} characters left</span>
    </div>
    <div class="input-field">
      <label for="quizDescription">Quiz Description</label>
      <input type="text" id="quizDescription" v-model="quizDescription" placeholder="Enter Quiz Description" maxlength="80">
      <span>{{ 80 - quizDescription.length }} characters left</span>
    </div>
    <div class="input-field">
      <label for="category">Category</label>
      <select v-model="selectedCategory">
        <option value="" disabled selected>Select Category</option>
        <option v-for="category in categories" :value="category.categoryId" :key="category.categoryId">
          {{ category.categoryName }}
        </option>
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
    <button class="next-button" @click="saveQuiz">NEXT</button>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import {useStore} from "@/store/store";

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
    const store = useStore();
    const creatorId = store.jwtToken.userId;

    let formData = new FormData();
    formData.append('quizName', quizName.value);
    formData.append('quizDescription', quizDescription.value);
    formData.append('difficultyLevel', difficulty.value);
    formData.append('category', selectedCategory.value);
    formData.append('creator', creatorId);

    console.log('Creator ID:', creatorId);
    console.log('Category:', selectedCategory.value);

    try {
        const response = await axios.post('http://localhost:8080/api/quizzes/createquiz', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (multimedia.value) {
          const quizId = response.data.quizId;
          let fileFormData = new FormData();
          fileFormData.append('file', multimedia.value);

          console.log("multimedia :" + multimedia.value)

          await axios.post(`http://localhost:8080/api/quizzes/upload/${quizId}`, fileFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        }

        await router.push('/addquestions');
        console.log('Quiz created:', response.data);
    } catch (error) {
        console.error('Error creating quiz:', error.response.data);
    }
};

const handleFileUpload = (event) => {
    multimedia.value = event.target.files[0];
    fileUploaded.value = true;
};

</script>

<style scoped>
.create-quiz-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.input-field {
  margin-bottom: 35px;
  position: relative;
}

.input-field span {
  color: #f7567c;
  position: absolute; /* Absolute position for the counter */
  bottom: -20px; /* Adjust as needed to place it at the bottom of the input field */
  right: 15px; /* Adjust as needed to place it to the right */
  font-size: 12px;
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
