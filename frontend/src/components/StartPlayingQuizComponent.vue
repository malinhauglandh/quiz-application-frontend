<template>
  <div class="start-playing-quiz-component">
    <div class="content-wrapper">
      <div v-for="quizItem in quiz" :key="quizItem.quizId" class="quiz-box">
        <div v-if="quizItem.multimedia" class="quiz-image" :style="{ backgroundImage: `url(${getPathToQuizImage(quizItem.multimedia)})` }"></div>
        <div v-else class="quiz-image-placeholder"></div>
        <h3 class="quiz-title">{{ quizItem.quizName }}</h3>
        <p class="quiz-description">{{ quizItem.quizDescription }}</p>
        <p class="quiz-description" v-if="quizItem.difficultyLevel">
          <span class="label">Difficulty level:</span> {{ quizItem.difficultyLevel }}
        </p>
        <p class="quiz-description" v-if="quizItem.categoryName">
          <span class="label">Category:</span> {{ quizItem.categoryName }}
        </p>
        <button class="play-quiz-button" @click="playQuiz(quizItem.quizId)">START</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from "@/store/store";
import router from "@/router/router";

const store = useStore();
const quiz = ref([]);
const categories = ref([]);

const quizId = router.currentRoute.value.params.quizId;

onMounted(async () => {
  await fetchCategories();
  await fetchQuiz();
});

async function fetchCategories() {
  try {
    const catResponse = await fetch('http://localhost:8080/api/categories/allCategories');
    if (!catResponse.ok) {
      throw new Error(`HTTP error! status: ${catResponse.status}`);
    }
    categories.value = await catResponse.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
}

async function fetchQuiz() {
  const token = store.jwtToken;
  const creatorId = token.userId;
  const accessToken = token.accessToken;

  try {
    const response = await fetch(`http://localhost:8080/api/quizzes/user/${creatorId}/${quizId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const fetchedQuiz = await response.json();

    quiz.value = fetchedQuiz.map(q => {
      const categoryName = categories.value.find(c => c.categoryId === q.categoryId)?.categoryName;
      return { ...q, categoryName };
    });
  } catch (error) {
    console.error("Failed to fetch quiz:", error);
  }
}

const getPathToQuizImage = (filename) => {
  return `http://localhost:8080/api/quizzes/files/${filename}`;
};

const determineFirstQuestionRoute = (questionTypeId) => {
  switch(questionTypeId) {
    case 1: return 'MultipleChoiceQuestion';
    case 2: return 'TrueOrFalseQuestion';
    case 3: return 'FillInTheBlankQuestion';
    default: return null;
  }
};


const playQuiz = async (quizId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/quizzes/${quizId}/details`, {
      headers: {
        'Authorization': `Bearer ${store.jwtToken.accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const quizDetails = await response.json();

    if (quizDetails.questions && quizDetails.questions.length > 0) {
      const firstQuestion = quizDetails.questions[0];
      const routeName = determineFirstQuestionRoute(firstQuestion.questionTypeId);

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
  } catch (error) {
    console.error("Failed to fetch quiz details:", error);
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