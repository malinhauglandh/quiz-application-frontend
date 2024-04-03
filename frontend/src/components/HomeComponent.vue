<template>
  <div class="home-component">
    <div class="content-wrapper">
      <h1>Your recently made quizzes:</h1>
      <div class="quiz-box-container">
        <div v-for="quiz in quizzes" :key="quiz.quizId" class="quiz-box">
          <div v-if="quiz.multimedia" class="quiz-image" :style="{ backgroundImage: `url(${getPathToQuizImage(quiz.multimedia)})` }">
            <h3 class="quiz-title">{{ quiz.quizName }}</h3>
            <p class="quiz-description">{{ quiz.quizDescription }}</p> <!-- Add this line -->
          </div>
        </div>
      </div>
    </div>
    <router-link to="/createquiz" class="create-quiz-button">CREATE NEW QUIZ</router-link>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from "@/store/store";

const store = useStore();

const quizzes = ref([]);

const getPathToQuizImage = (filename) => {
  return `http://localhost:8080/api/quizzes/files/${filename}`;
};

const fetchQuizzes = async () => {
  const token = store.jwtToken;
  console.log("token:", token);

  const creatorId = token.userId;

  const accessToken = token.accessToken;

  console.log("accessToken: ", accessToken);

  console.log("Fetching quizzes for user:", creatorId);

  try {
    const response = await fetch(`http://localhost:8080/api/quizzes/user/${creatorId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.status === 401 || response.status === 403) {
      console.error("Token is invalid or expired. Please re-authenticate.");
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    quizzes.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
  }
};

onMounted(fetchQuizzes);
</script>

<style scoped>
.home-component {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures content is spaced out */
  height: 100vh; /* Full height of the viewport */
  text-align: center;
}

.content-wrapper {
  overflow-y: auto; /* Makes the content scrollable */
  margin-bottom: 20px; /* Gives some space before the button */
  margin-top: 20px;
}

.quiz-box-container {
  display: flex;
  flex-direction: row; /* Default orientation */
  justify-content: space-between;
  margin: 60px 60px 0; /* Adjusted to add margin top */
  flex-wrap: wrap; /* Adjusts boxes to wrap in smaller screens */
}

.quiz-box {
  width: calc(30% - 20px);
  background-color: white;
  height: 200px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin: 0 5px 30px; /* Added bottom margin */
}

.create-quiz-button {
  display: block;
  position: fixed;
  bottom: 20px;
  left: 50%;
  margin-left: -150px;
  width: 300px;
  padding: 20px 0;
  background-color: #6320EE;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  text-align: center;
  font-size: 22px;
}

.quiz-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.quiz-title {
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  text-align: center;
  padding: 10px 0;
  position: absolute;
  top: 0;
}

.quiz-description {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7); /* Opaque background for readability */
  color: white;
  visibility: hidden; /* Hide description initially */
  opacity: 0; /* Hide description initially */
  transition: visibility 0s, opacity 0.3s linear; /* Transition effect for smoothness */
}

.quiz-image:hover .quiz-description {
  visibility: visible; /* Show description on hover */
  opacity: 1; /* Show description on hover */
  padding: 10px 0; /* Padding to give some space around the text */
}

@media (max-width: 768px) {
  .quiz-box-container {
    flex-direction: column;
    align-items: center;
  }

  .quiz-box {
    width: 100%;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>