<template>
    <div class="fill-in-the-blank-question" v-if="currentQuestion">
        <div class="question-display">
            <p class="question-text">{{ currentQuestion.questionText }}</p>
        </div>
        <div class="input-container">
            <input
                type="text"
                class="answer-input"
                placeholder="Type your answer here..."
                v-model="userAnswer"
            />
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
import { useStore } from "@/store/userStore";

const router = useRouter();
const route = useRoute();
const store = useStore();
const userAnswer = ref('');

const quizId = route.params.quizId;

const currentQuestion = computed(() => {
    return store.quizDetails.questions[store.quizDetails.currentQuestionIndex];
});

const updateUserAnswerForFillInTheBlank = () => {
    const answer = {
        questionId: currentQuestion.value.questionId,
        answerText: userAnswer.value, // Directly using the user's input
        // Optionally use a dummy choiceId if needed
        choiceId: 'dummy-choice-id'
    };
    // Update the store with this answer
    store.updateAnswer(answer.questionId, answer.choiceId, answer.answerText);
};
const submitAnswer = async () => {
    updateUserAnswerForFillInTheBlank();

    if (store.quizDetails.currentQuestionIndex < store.quizDetails.questions.length - 1) {
        store.incrementQuestionIndex();
        const nextQuestion = store.quizDetails.questions[store.quizDetails.currentQuestionIndex];
        router.push({
            name: getRouteNameByQuestionTypeId(nextQuestion.questionTypeId),
            params: { quizId, questionId: nextQuestion.questionId }
        });
    } else {
        await store.submitAnswers(quizId);
        router.push({ name: 'QuizCompletion', params: { quizId } });
    }
};


const getRouteNameByQuestionTypeId = (questionTypeId) => {
    switch(questionTypeId) {
        case 1: return 'MultipleChoiceQuestion';
        case 2: return 'TrueOrFalseQuestion';
        case 3: return 'FillInTheBlankQuestion';
        default: return null;
    }
};
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

.input-container {
    display: flex;
    justify-content: center;
}

.answer-input {
    width: 250px;
    padding: 10px;
    margin-bottom: 30px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
}

.answer-input:focus {
    outline: none;
    border-color: #6320EE;
    box-shadow: 0 0 5px #6320EE;
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
