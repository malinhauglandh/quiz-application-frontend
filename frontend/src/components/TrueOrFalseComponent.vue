<template>
    <div class="true-or-false-component">
        <h2>New question with True or False answer</h2>
        <h3>Check off for true or false</h3>
        <div class="input-field">
            <label for="question" class="question-label">Question</label>
            <input type="text" id="question" v-model="question">
        </div>
        <div class="input-field">
            <input type="radio" id="true-option" v-model="selectedOption" value="true">
            <label for="true-option" class="option-label"><span class="option-box">True</span></label>
        </div>
        <div class="input-field">
            <input type="radio" id="false-option" v-model="selectedOption" value="false">
            <label for="false-option" class="option-label"><span class="option-box">False</span></label>
        </div>
        <div class="button-container">
            <button class="button cancel-button" @click="cancelQuestion">CANCEL</button>
            <button class="button save-button" @click="saveQuestion">SAVE AND GO BACK</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const question = ref('');
const selectedOption = ref(null);
const router = useRouter();

const saveQuestion = () => {
    router.push('/addQuestions');
};

const cancelQuestion = () => {
    router.push('/addQuestions');
};

</script>

<style scoped>
.input-field {
    margin-bottom: 40px;
}

.question-label, .option-label {
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

.input-field input[type="radio"] {
    margin-right: 10px;
}

.option-box {
    border: 2px solid #f7567c;
    padding: 10px 20px;
    font-size: 24px;
    color: #f7567c;
}

.option-box:hover {
    background-color: #f7567c;
    color: white;
}

h3 {
    color: #676767;
    margin-top: -15px;
    margin-bottom: 30px;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.cancel-button {
    margin-right: 80px;
}

.save-button {
    margin-left: 80px;
}

.button {
    padding: 15px 30px;
    background-color: #6320EE;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
}

.button:hover {
    background-color: #7E41FDFF;
}
</style>
