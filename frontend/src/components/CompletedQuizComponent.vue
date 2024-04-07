<template>
  <div v-for="(result, quizIndex) in quizResults" :key="'quiz-' + quizIndex" class="quiz-results">
    <h1>Quiz Results</h1>
    <p>Your score is: {{ result.score }} / {{ result.userAnswers.length }} points</p>
    <div v-for="(answer, index) in result.userAnswers" :key="'answer-' + index" class="result-item">
      <h3>Question {{ index + 1 }}: {{ answer.questionText }}</h3>
      <p>Your Answer: {{ answer.choice }} - <strong :class="{ 'correct': answer.correct, 'incorrect': !answer.correct }">{{ answer.correct ? 'Correct' : 'Incorrect' }}</strong></p>
      <p>Explanation: {{ answer.explanation }}</p>
    </div>
  </div>
  <button class="button" @click="$router.push('/home')">Go to Home</button>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useStore } from "@/store/store";

const store = useStore();
const quizResults = ref([]);

onMounted(async () => {
  const quizId = 2; // Replace with dynamic ID as needed
  try {
    const response = await axios.get(
        `http://localhost:8080/api/completed-quizzes/${quizId}`,
        {
          headers: {
            'Authorization': `Bearer ${store.jwtToken.accessToken}`,
          },
        }
    );
    quizResults.value = [response.data];

  } catch (error) {
    console.error('Error fetching quiz results:', error);
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');

.quiz-results {
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  font-family: 'Karla', sans-serif;
}

.quiz-results h1 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 2.5rem;
}

.quiz-results p {
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
}

.result-item {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 1rem;
}

.result-item h3 {
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: #6320EE;
}

.result-item p {
  font-size: 1rem;
  margin-left: 1rem;
}

strong {
  font-weight: bold;
}

.correct {
  color: #2ecc71;
}

.incorrect {
  color: #f7567c;
}

.button {
  display: block;
  width: max-content;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #6320EE;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.button:hover {
  background-color: #7E41FDFF;
}

@media (max-width: 768px) {
  .quiz-results {
    padding: 20px;
  }

  .result-item {
    padding: 10px;
  }
}
</style>