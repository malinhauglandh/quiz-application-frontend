<template>
    <div class="multiple-choice-component">
        <h2>New question with multiple choice answer</h2>
        <h3>Check off the correct alternative</h3>
        <div class="input-field">
            <label for="question" class="question-label">Question</label>
            <input type="text" id="question" v-model="question">
        </div>
        <div class="input-field" v-for="(alternative, index) in alternatives" :key="index">
            <label :for="'alternative-' + (index + 1)" class="alternative-label">Alternative {{ index + 1 }}</label>
            <input type="text" :id="'alternative-' + (index + 1)" v-model="alternatives[index]" class="alternative-input">
            <input type="radio" :id="'correct-' + (index + 1)" name="correct" v-model="correctAnswer" :value="index">
        </div>
        <div class="button-container">
            <button class="button" @click="cancelQuestion">CANCEL</button>
            <button class="button" @click="saveQuestion">SAVE AND GO BACK</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Data
const question = ref('');
const alternatives = ref(['', '', '', '']);
const correctAnswer = ref(null);
const router = useRouter();

// Methods
const saveQuestion = () => {
    router.push('/addquestions');
};

const cancelQuestion = () => {
    router.push('/addquestions');
};

</script>

<style scoped>
.input-field {
    margin-bottom: 30px;
}

.question-label {
    display: inline-block;
    font-weight: bold;
    margin-bottom: 30px;
    width: 80px;
    text-align: left;
}

.input-field input[type="text"] {
    width: 25%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
}

.alternative-label {
    width: 120px;
    font-weight: bold;
    margin-right: 10px;
}

.alternative-input {
    background-color: #f7567c;
    color: white;
    font-weight: bold;
    font-size: 16px;
    width: 30%;
}

.input-field input[type="radio"] {
    margin-right: 10px;
}

h3 {
    color: #676767;
    margin-top: -15px;
    margin-bottom: 30px;
}

.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    margin-right: 480px;
    margin-left: 450px;
}

.button {
    padding: 15px 30px;
    background-color: #6320EE;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
}

.button:hover {
    background-color: #7E41FDFF;
}
</style>
