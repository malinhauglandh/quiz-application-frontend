<template>
    <div class="multiple-choice-question" v-if="currentQuestion">
        <div class="question-display">
            <p class="question-text">{{ currentQuestion.questionText }}</p>
        </div>
        <div class="alternatives-container">
            <button v-for="(choice, index) in currentQuestion.choices"
                    :key="choice.quizChoiceId"
                    class="alternative-button"
                    :class="{ 'selected': selectedAnswer === index }"
                    @click="selectAlternative(index, choice.quizChoiceId)">
                {{ choice.choice }}
            </button>
        </div>
        <div class="submit-container">
            <button class="button submit-button" @click="submitAnswer">SUBMIT ANSWER AND GO TO NEXT QUESTION</button>
        </div>
    </div>
    <div v-else>No question available.</div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from "@/store/userStore";
import { useQuizStore } from "@/store/quizStore";
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const quizStore = useQuizStore();
const quizId = quizStore.currentQuiz.quizId;

const selectedAnswer = ref(null);

const currentQuestion = computed(() => {
    return store.quizDetails.questions[store.quizDetails.currentQuestionIndex];
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
