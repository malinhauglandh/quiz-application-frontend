<template>
  <div class="multiple-choice-question">
    <div class="question-display">
      <p class="question-text">{{ currentQuestionText }}</p>
    </div>
    <div class="alternatives-container">
      <button
          v-for="(choice, index) in currentChoices"
          :key="choice.id"
          class="alternative-button"
          :class="{ 'selected': selectedAnswer === index }"
          @click="selectAlternative(index, choice.id)"
      >
        {{ choice.text }}
      </button>
    </div>
    <div class="submit-container">
      <button class="button submit-button" @click="submitAnswer">SUBMIT ANSWER AND GO TO NEXT QUESTION</button>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "@/store/store";

const store = useStore();
const route = useRoute();
const currentQuestionText = ref('');
const currentChoices = ref([]);
const selectedAnswer = ref(null);

// These should be reactive references if they are expected to change
const quizId = ref(route.params.quizId);
const questionId = ref(route.params.questionId);

// Define a method for selecting an alternative
const selectedChoiceId = ref(null);

const selectAlternative = (index, choiceId) => {
  selectedAnswer.value = index;
  selectedChoiceId.value = choiceId; // Store the choiceId
  // Additional logic if needed
}


async function fetchQuestionDetails() {
  const accessToken = store.jwtToken.accessToken;

  // Make sure to use the reactive variables' value here
  const url = `http://localhost:8080/api/quizzes/${quizId.value}/question/${questionId.value}`;
  console.log(`Fetching: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const questionDetails = await response.json();
    currentQuestionText.value = questionDetails.questionText;

    // If the object keys are 'choiceId' and 'text', then use those.
    // Adjust if the API returns different keys
    currentChoices.value = questionDetails.choices.map(choice => ({
      id: choice.quizChoiceId, // Assuming this is the correct key
      text: choice.choice // Assuming this is the correct key
    }));

  } catch (error) {
    console.error("Failed to fetch question details:", error);
  }
}

// Use the router parameters to fetch the question details
onMounted(() => {
  if (quizId.value && questionId.value) {
    fetchQuestionDetails();
  }
});
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
