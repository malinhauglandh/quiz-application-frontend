<template>
  <div class="true-or-false-question">
    <div class="question-display">
      <p class="question-text">{{ currentQuestionText }}</p>
    </div>
    <div class="alternatives-container">
      <button
          v-for="(alternative, index) in alternatives"
          :key="alternative.choiceId"
          class="alternative-button"
          :class="{ 'selected': selectedAnswer === index }"
          @click="selectAlternative(index, alternative.choiceId)"
      >
        {{ alternative.text }}
      </button>
    </div>
    <div class="submit-container">
      <button class="button submit-button" @click="submitAnswer">SUBMIT ANSWER AND GO TO NEXT QUESTION</button>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { useStore } from "@/store/store";
import axios from "axios";

const store = useStore();
const route = useRoute();
const router = useRouter();

const currentQuestionText = ref('');
const alternatives = ref([]);
const selectedAnswer = ref(null);
const selectedChoiceId = ref(null);
const currentQuestionIndex = ref(0);
const totalQuestions = ref(null);
const quizDetails = ref(null);
const userAnswers = ref([]);
const questionId = route.params.questionId;

const quizId = ref(route.params.quizId);

onMounted(async () => {
  await fetchQuizDetails();
});

async function fetchQuizDetails() {
  const accessToken = store.jwtToken.accessToken;
  try {
    const response = await axios.get(`http://localhost:8080/api/quizzes/${quizId.value}/details`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    quizDetails.value = response.data;
    totalQuestions.value = response.data.questions.length;

    await fetchQuestionDetails();
  } catch (error) {
    console.error('Failed to fetch quiz details:', error);
  }
}

async function fetchQuestionDetails() {

  const accessToken = store.jwtToken.accessToken;
  console.log(`Fetching: http://localhost:8080/api/quizzes/${quizId.value}/question/${questionId}`);
  try {
    const response = await fetch(`http://localhost:8080/api/quizzes/${quizId.value}/question/${questionId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const questionDetails = await response.json();
    currentQuestionText.value = questionDetails.questionText;

    alternatives.value = questionDetails.choices.map((choice) => ({
      choiceId: choice.quizChoiceId,
      text: choice.choice
    }));

    console.log("choices: ", questionDetails.choices);

  } catch (error) {
    console.error("Failed to fetch question details:", error);
  }
}

const goToNextQuestion = () => {
  if (currentQuestionIndex.value < totalQuestions.value - 1) {
    // Increment to go to the next question
    currentQuestionIndex.value++;
    // Fetch the next question's details
    fetchQuestionDetails();
  } else {
    // If it's the last question, submit all answers
    submitAllAnswers();
  }
};

const selectAlternative = (index, choiceId) => {
  // Save the selected answer to the userAnswers array
  userAnswers.value[currentQuestionIndex.value] = {
    questionId: quizDetails.value.questions[currentQuestionIndex.value].id,
    questionChoiceId: choiceId,
  };
  selectedAnswer.value = index;
  // Go to the next question or submit if this was the last one
  goToNextQuestion();
};


const submitAllAnswers = async () => {
  // Submit all answers to the backend
  try {
    await axios.post(
        `http://localhost:8080/api/completed-quizzes/${quizId.value}/submit`,
        userAnswers,
        {
          headers: {
            'Authorization': `Bearer ${store.jwtToken.accessToken}`,
          },
        }
    );

    // Redirect to a 'quiz completed' page or handle the response as needed
    await router.push({ name: 'QuizCompletion', params: { quizId: quizId.value } });
  } catch (error) {
    console.error('Failed to submit all answers:', error);
    // Handle the error here
  }
};

const submitAnswer = async () => {
  // Store the selected choiceId for the current question
  userAnswers.value.push({ questionChoiceId: selectedChoiceId.value });

  // If it's not the last question, save the answer and move to the next question
  if (currentQuestionIndex.value < totalQuestions.value - 1) {
    goToNextQuestion();
  } else {
    // If it's the last question, submit all answers
    await submitAllAnswers();
  }
};

watch(currentQuestionIndex, async (newIndex) => {
  if (newIndex < totalQuestions.value) {
    await fetchQuestionDetails();
  }
}, { immediate: true });
</script>


<style scoped>
.question-display {
  text-align: center;
  margin-bottom: 20px;
}

.question-text {
  font-size: 28px;
  font-weight: bold;
}

.alternatives-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.alternative-button {
  width: 250px;
  height: 100px;
  padding: 10px;
  margin-bottom: 30px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
}

.alternative-button:hover {
  background-color: #e0e0e0;
}

.alternative-button.selected {
  background-color: #f7567c;
  color: white;
}

.submit-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button.submit-button {
  padding: 15px 30px;
  background-color: #6320EE;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
}

.button.submit-button:hover {
  background-color: #7E41FDFF;
}
</style>