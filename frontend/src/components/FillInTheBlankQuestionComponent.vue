<template>
  <div class="fill-in-the-blank-question">
    <div class="question-display">
      <p class="question-text">
        What is the capital of Finland?
      </p>
    </div>
    <div class="input-container">
      <input
        v-model="userAnswer"
        type="text"
        class="answer-input"
        placeholder="Answer"
      >
    </div>
    <div class="submit-container">
      <button
        class="button submit-button"
        @click="submitAnswer"
      >
        SUBMIT ANSWER AND GO TO NEXT QUESTION
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userAnswer = ref('');
const router = useRouter();

const submitAnswer = () => {
    console.log('Submitted answer:', userAnswer.value);
    router.push('/home');
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
