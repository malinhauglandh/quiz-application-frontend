<template>
  <div class="start-playing-quiz-component">
    <div class="content-wrapper" v-if="!loading">
      <div v-if="currentQuiz.multimedia" class="quiz-image" :style="{ backgroundImage: `url(${getPathToQuizImage(currentQuiz.multimedia)})` }"></div>
      <div v-else class="quiz-image-placeholder"></div>
      <h3 class="quiz-title">{{ currentQuiz.quizName }}</h3>
      <p class="quiz-description">{{ currentQuiz.quizDescription }}</p>
      <p class="quiz-description" v-if="currentQuiz.difficultyLevel">
        <span class="label">Difficulty level:</span> {{ currentQuiz.difficultyLevel }}
      </p>
      <p class="quiz-description" v-if="currentQuiz.categoryId && !categoriesLoading">
        <span class="label">Category:</span> {{ categories.find(cat => cat.categoryId === currentQuiz.categoryId).categoryName }}
      </p>
      <button class="play-quiz-button" @click="playQuiz(currentQuiz.quizId)">START</button>
      <div class="questions-wrapper">
        <h3>Questions:</h3>
        <ul>
          <li v-for="question in currentQuiz.questions" :key="question.questionId" class="single-question">
            {{ question.questionText }}
            {{ question.questionTypeId }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeMount } from 'vue';
import { useStore } from "@/store/userStore";
import { useQuizStore } from "@/store/quizStore";
import router from "@/router/router";
import axios from 'axios';

const userStore = useStore();
const quizStore = useQuizStore();
const quiz = ref([]);
const categories = ref([]);
const currentQuiz = ref(null);
const quizId = router.currentRoute.value.params.quizId;
const multimedia = ref(null);
const loading = ref(true);
const categoriesLoading = ref(true);


onBeforeMount(async () => {
  try{
    const data = await quizStore.fetchQuizDetails(quizId);
    currentQuiz.value = data;
    console.log("this data was fetched:", data);
    if(data.multimedia){
      multimedia.value = data.multimedia;
    }
  } catch(error) {
    console.error('Failed to fetch quizzes:', error);
    router.push({ path: '/home' })
  } finally {
    loading.value = false;
  }
});

onMounted(() => {
  fetchCategories();
  setTimeout(() => {
    const questionIds = currentQuiz.value.questions.map(q => getQuestionType(q));
    console.log("Question IDs:", questionIds)
  }, 1000);
});

const getQuestionType = (question) => {
  switch (question.questionTypeId) {
    case 1:
      return 'multiplechoice';
    case 2:
      return 'blanks';
    case 3:
      return 'true/false';
    default:
      return null;
  }
};


const getPathToQuizImage = (filename) => {
  return `http://localhost:8080/api/quizzes/files/${filename}`;
};

async function fetchCategories() {
    try {
        const catResponse = await userStore.fetchData('http://localhost:8080/api/categories/allCategories');
        if (catResponse.status !== 200) {
            throw new Error(`HTTP error! status: ${catResponse.status}`);
        }
        categories.value = await catResponse.data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    } finally {
        categoriesLoading.value = false;
    }
}

const playQuiz = async (quizId) => {
    if (currentQuiz.value.questions.length > 0){
        const firstQuestion = currentQuiz.value.questions[0];
        quizStore.currentQuestion = firstQuestion;
        const routeName = quizStore.getQuestionRouteName(firstQuestion.questionTypeId);
        if (routeName) {
            await router.push({
                name: routeName,
                params: {
                    quizId: quizId.toString(),
                    questionId: firstQuestion.questionId.toString(),
                }
            });
        } else {
            console.error("Invalid question type ID or route name not found.");
        }
    } else {
        console.error("Quiz has no questions.");
    }
};
</script>

<style scoped>
.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
}

.quiz-box {
  margin-top: -200px;
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.quiz-image, .quiz-image-placeholder {
  width: 300px;
  height: 300px;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
}

.quiz-title {
  margin-bottom: 10px;
  font-size: 24px;
  color: black;
  font-weight: bold;
  background-color: transparent;
}

.quiz-description {
  margin-bottom: 20px;
  font-size: 18px;
}

.play-quiz-button {
  padding: 15px 30px;
  transform: translateX(-50%);
  background-color: #f7567c;
  color: white;
  position: absolute;
  border-radius: 5px;
  border: none;
  bottom: 10px;
  left: 50%;
  cursor: pointer;
  font-size: 16px;
}

.label {
  font-weight: bold;
  color: #f7567c;
}
</style>