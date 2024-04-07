<template>
    <div class="true-or-false-question" v-if="currentQuestion">
        <div class="question-display">
            <p class="question-text">{{ currentQuestion.questionText }}</p>
        </div>
        <div class="alternatives-container">
            <button
                    class="alternative-button"
                    :class="{ 'selected': selectedAnswer === true }"
                    @click="selectAlternative(true)"
            >
                true
            </button>
            <button
                    class="alternative-button"
                    :class="{ 'selected': selectedAnswer === false }"
                    @click="selectAlternative(false)"
            >
                false
            </button>
        </div>
        <div class="submit-container">
            <button class="button submit-button" @click="submitAnswer">SUBMIT ANSWER AND GO TO NEXT QUESTION</button>
        </div>
    </div>
    <div v-else>No question available.</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from "@/store/store";

const store = useStore();
const router = useRouter();
const route = useRoute();
const quizId = route.params.quizId;
const selectedAnswer = ref(null);

const currentQuestion = computed(() => {
    return store.quizDetails.questions[store.quizDetails.currentQuestionIndex];
});

const selectAlternative = (answer) => {
    selectedAnswer.value = answer;
    const trueChoice = currentQuestion.value.choices.find(c => c.choice === 'true');
    const falseChoice = currentQuestion.value.choices.find(c => c.choice === 'false');

    let choiceId = null;
    if (answer && trueChoice) {
        choiceId = trueChoice.quizChoiceId;
    } else if (!answer && falseChoice) {
        choiceId = falseChoice.quizChoiceId;
    }

    if (choiceId !== null) {
        store.updateAnswer(currentQuestion.value.questionId, choiceId);
    } else {
        console.error('Could not find a matching choice for the answer.');
    }
};

const submitAnswer = async () => {
    if (store.quizDetails.currentQuestionIndex < store.quizDetails.questions.length - 1) {
        store.incrementQuestionIndex();
        router.push({
            name: getRouteNameByQuestionTypeId(currentQuestion.value.questionTypeId),
            params: { quizId, questionId: currentQuestion.value.questionId }
        });
    } else {
        await store.submitAnswers(quizId);
        router.push({ name: 'QuizCompletion', params: { quizId } });
    }
};

function getRouteNameByQuestionTypeId(questionTypeId) {
    switch(questionTypeId) {
        case 1: return 'MultipleChoiceQuestion';
        case 2: return 'TrueOrFalseQuestion';
        case 3: return 'FillInTheBlankQuestion';
        default: return null;
    }
}
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