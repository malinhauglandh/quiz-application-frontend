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
    <label for="fileUpload" id="uploadFileLabel" v-if="!fileUploaded">
      <p>Upload File</p>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
    </label>
    <div id="fileUploaded" v-else>
      <p>{{ multimedia.name }}</p>
      <button @click="removeMedia">
        Remove
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-800 200 200-56 58-104-104v92l-80-80-63-63 103-103Zm-40 480v-200l80 80v120h-80ZM791-55 686-160H240q-33 0-56.5-23.5T160-240v-120h80v120h366L55-791l57-57 736 736-57 57Zm9-219-80-80v-6h80v86Z"/></svg>
      </button>
    </div>
    <input type="file" id="fileUpload" @change="handleFileUpload" accept="image/*, video/*" :style="{ backgroundColor: fileUploaded ? 'white' : 'transparent' }" hidden>
    <button class="next-button" @click="saveQuiz" :disabled="!isFormValid">NEXT</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import  {useStore } from "/src/store/store";
import { computed } from 'vue';

const quizName = ref('');
const quizDescription = ref('');
const multimedia = ref('');
const difficulty = ref('');
const fileUploaded = ref(false);
const router = useRouter();

const categories = ref([]);
const selectedCategory = ref(null);

const isFormValid = computed(() => {
  return quizName.value.trim() !== '' &&
          quizDescription.value.trim() !== '' &&
         selectedCategory.value !== null &&
         difficulty.value.trim() !== '';
});


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
        const response = await axios.post('http://localhost:8080/api/quizzes/createQuiz', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + store.jwtToken.accessToken
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

const removeMedia = () => {
    multimedia.value = null;
    fileUploaded.value = false;
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap');
.create-quiz-details {
  max-width: 800px; /* Adjust based on your preference */
  margin: 50px auto;
  padding: 40px;
  background: #fff; /* White background */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* Soft shadow for depth */
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Sleek font */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-quiz-details h1 {
  text-align: center;
  color: #333; /* Dark text for the heading */
  margin-bottom: 20px; /* Space after the heading */
  font-family: "Karla", sans-serif; /* Use Karla font for the heading */
  font-weight: 700;
  font-size: xxx-large;
  margin: 0;
  margin-bottom: 2rem;
}

.input-field {
  margin-bottom: 20px; /* Space between input fields */
  display: flex; /* Align label and input side by side */
  align-items: center; /* Center items vertically */
  font-family: "Karla", sans-serif; /* Use Karla font for the input fields */
  width: 100%;
}

.input-field input[type="text"] {
  font-family: "Karla", sans-serif; /* Use Karla font for the input fields */
}

.input-field select {
  font-family: "Karla", sans-serif; /* Use Karla font for the input fields */
}

.input-field label {
  flex: 0 0 120px; /* Fixed width for labels */
  margin-right: 20px; /* Space between label and input field */
  color: #666; /* Medium gray color for text */
  font-weight: bold;
}

.input-field span {
  display: flex;
  justify-content: flex-start;
  justify-items: flex-start;
  text-align: start;
  margin-left: 0.25rem;

}

.input-field input,
.input-field select {
  width: 100%;
  padding: 15px 20px;
  border: 1px solid transparent; /* Hide the border */
  border-bottom: 2px solid #ddd; /* Subtle underline for the input */
  border-radius: 4px; /* Slightly rounded corners for the input field */
  background-color: #f8f8f8; /* Light background to distinguish the input */
  font-size: 16px;
  color: #333;
  transition: all 0.3s ease-in-out; /* Smooth transition for focus */
  box-sizing: border-box;
}

.input-field input:focus,
.input-field select:focus {
  outline: none; /* Remove the default focus outline */
  border-bottom-color: #6320ee; /* Highlight the bottom border on focus */
  box-shadow: 0 1px 6px -2px rgba(99, 32, 238, 0.5); /* Subtle shadow to "lift" the input */
  background-color: #fff; /* Change to white background on focus */
}

/* Style the file input to match */
.input-field input[type="file"] {
  background-color: #fff; /* White background for the file input */
  border: none;
  padding: 10px 20px;
}

/* Adjust the look of the placeholder to match */
.input-field input::placeholder,
.input-field select .placeholder-grey {
  color: #aaa;
  font-style: italic; /* A touch of style for the placeholder */
}

/* Modernize the button as well */
button.next-button {
  padding: 15px 30px;
  background-color: #6320ee;
  color: #fff;
  border: none;
  border-radius: 25px; /* More pronounced rounded corners for the button */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase; /* Uppercase text for a bolder button */
  letter-spacing: 1px; /* Spacing out the letters for a more modern feel */
  transition: background-color 0.2s ease-in-out;
  margin-top: 2rem;
}

button.next-button:hover,
button.next-button:focus {
  background-color: #7e41fd;
  box-shadow: 0 4px 12px rgba(225, 219, 237, 0.5); /* Shadow effect for depth */
}

button.next-button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

/* Additional styles for character count */
.input-field span.character-count {
  margin-left: auto; /* Push to the right side */
  color: #999; /* Light gray color */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .input-field {
    flex-direction: column; /* Stack label and input on smaller screens */
    align-items: stretch;
  }

  .input-field label {
    margin-bottom: 5px;
    flex: 0 0 auto; /* Allow the label to shrink on smaller screens */
  }

  .create-quiz-details {
    padding: 20px;
  }

  button.next-button {
    padding: 10px; /* Smaller padding on smaller screens */
  }
}

#uploadFileLabel {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  cursor: pointer;
  border-radius: 1rem;
  border: #007ACC 3px solid;
  background-color: #007ACC;
  width: fit-content;
  font-family: "Karla", sans-serif;
  font-weight: 500;
}

#uploadFileLabel p {
  color: white;
  padding: 0;
}

#uploadFileLabel svg {
  fill: white;
  width: 2rem;
  height: 2rem;
}

#uploadFileLabel:hover {
  background-color: white;
  transition: all 0.3s ease-in-out;
}

#uploadFileLabel:hover p {
  color: #007ACC;
}

#uploadFileLabel:hover svg {
  fill: #007ACC;
}

#fileUploaded {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  cursor: pointer;
  border-radius: 1rem;
  border: #007ACC 3px solid;
  background-color: #007ACC;
  width: fit-content;
  color: white;
  font-family: "Karla", sans-serif;
  font-weight: 500;
}

#fileUploaded p {
  padding: 0;
}

#fileUploaded svg {
  fill: white;
  width: 2rem;
  height: 2rem;
}

#fileUploaded button {
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 1rem;
  font-family: "Karla", sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}

#fileUploaded button svg {
  fill: white;
  width: 2rem;
  height: 2rem;
}

#fileUploaded:hover {
  background-color: white;
  transition: all 0.3s ease-in-out;
}

#fileUploaded:hover p {
  color: #007ACC;
}

#fileUploaded:hover svg {
  fill: #007ACC;
}

#fileUploaded:hover button {
  color: #007ACC;
}



</style>
