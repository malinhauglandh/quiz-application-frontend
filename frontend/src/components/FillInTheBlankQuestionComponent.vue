<template>
  <div class="quiz-play-component" v-if="options">
    <h2>Quiz Question</h2>
    <p v-html="formattedQuestion"></p>
    <div class="options-container">
      <div class="option" v-for="(option, index) in options" :key="index">
        <input type="checkbox" :id="option" v-model="selectedOption" :value="option" @change="updateQuestion">
        <label :for="option">{{ option }}</label>
      </div>
    </div>
    </div>
    <div v-else>No question available.</div>
</template>

<script setup>
import { computed, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from "@/store/userStore";
import { useQuizStore } from "@/store/quizStore";

const question = "";
const selectedOption = ref();
const formattedQuestion = computed(() => question.replace("____", `<strong>${selectedOption.value}</strong>`));

const router = useRouter();
const store = useStore();
const quizStore = useQuizStore();
const userAnswer = ref('');
const loading = ref(true);

const quizId = quizStore.currentQuiz.quizId;

const currentQuestion = computed(() => {
  return quizStore.currentQuestion;
});

const options = computed(() => {
  console.log("choices: ", currentQuestion.value.choices);
  return currentQuestion.value.choices.map(choice => choice.choice);
});

const updateUserAnswerForFillInTheBlank = () => {
  const answer = {
      questionId: currentQuestion.value.questionId,
      answerText: userAnswer.value, // Directly using the user's input
      // Optionally use a dummy choiceId if needed
      choiceId: 'dummy-choice-id'
  };
  // Update the store with this answer
  quizStore.updateAnswer(answer.choiceId);
};

const submitAnswer = async () => {
  updateUserAnswerForFillInTheBlank();
  if(quizStore.nextQuestion !== null) {
    console.log('Next question is:');
  } else {
      router.push({ name: 'QuizCompletion', params: { quizId } });
  }
  if (quizStore.currentQuestion) {
      userAnswer.value = '';
      quizStore.nextQuestion();
      await userStore.submitAnswers(quizId);
  } else {
      router.push({ name: 'QuizCompletion', params: { quizId } });
  }
};


</script>


<style scoped>
.quiz-play-component {
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  font-family: 'Karla', sans-serif;
}

.options-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.option {
  margin: 10px;
}

input[type="checkbox"] {
  margin-right: 10px;
}

input[type="checkbox"]:checked + label {
  font-weight: bold;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 2rem;
}

p {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
}

label {
  font-size: 1rem;
}
</style>