<template>
  <div class="true-or-false-question">
    <div class="question-display">
      <p class="question-text">
        Copenhagen is the capital of Denmark.
      </p>
    </div>
    <div class="alternatives-container">
      <button
        v-for="(alternative, index) in alternatives"
        :key="alternative"
        class="alternative-button"
        :class="{ 'selected': selectedAnswer === index }"
        @click="selectAlternative(index)"
      >
        {{ alternative }}
      </button>
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

const alternatives = ['True', 'False'];
const selectedAnswer = ref(null);
const router = useRouter();

const selectAlternative = (n) => {
    selectedAnswer.value = n;
};

const submitAnswer = () => {
    console.log('Submitted alternative:', selectedAnswer.value);
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
