<template>
  <div class="start-playing-quiz-component">
    <div
      v-if="!loading"
      class="content-wrapper"
    >
      <div
        v-if="currentQuiz.multimedia"
        class="quiz-image"
        :style="{ backgroundImage: `url(${getPathToQuizImage(currentQuiz.multimedia)})` }"
      />
      <div
        v-else
        class="quiz-image-placeholder"
      />
      <h3 class="quiz-title">
        {{ currentQuiz.quizName }}
      </h3>
      <p class="quiz-description">
        {{ currentQuiz.quizDescription }}
      </p>
      <p
        v-if="currentQuiz.difficultyLevel"
        class="quiz-description"
      >
        <span class="label">Difficulty level:</span> {{ currentQuiz.difficultyLevel }}
      </p>
      <p
        v-if="currentQuiz.categoryId && !categoriesLoading"
        class="quiz-description"
      >
        <span class="label">Category:</span> {{ categories.find(cat => cat.categoryId === currentQuiz.categoryId).categoryName }}
      </p>
      <button
        class="play-quiz-button"
        @click="playQuiz(currentQuiz.quizId)"
      >
        START
      </button>
      <div class="questions-wrapper">
        <h3>Questions:</h3>
        <ul>
          <li
            v-for="question in currentQuiz.questions"
            :key="question.questionId"
            class="single-question"
          >
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
});



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
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');

.start-playing-quiz-component {
  width: 100%;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 85vh;
  padding: 10px 20px;
  font-family: 'Karla', sans-serif;
  min-width: 250px;
  width: 70%;
  background-color: white;
  border-radius: 8px;
}

.quiz-box {
  margin: 10px 0;
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.quiz-image, .quiz-image-placeholder {
  width: 250px;
  height: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 10px;
}

.quiz-title {
  margin-bottom: 10px;
  font-size: 2rem;
  color: #333;
  font-weight: 700;
  background-color: transparent;
}

.quiz-description {
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 400;
  color: #666;
}

.play-quiz-button {
  padding: 10px 20px;
  background-color: #6320EE;
  color: white;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.play-quiz-button:hover {
  background-color: #7E41FDFF;
}

.label {
  font-weight: 700;
  color: #f7567c;
}

@media (max-width: 768px) {
  .quiz-box {
    width: 90%;
    padding: 20px;
  }

  .quiz-image, .quiz-image-placeholder {
    width: 80%;
    height: auto;
  }
}
</style>