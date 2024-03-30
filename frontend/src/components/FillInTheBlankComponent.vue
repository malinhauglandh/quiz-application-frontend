<template>
    <div class="fill-in-the-blank-component">
        <h2>New question with fill in the blank answer</h2>
        <h4>Fill in the first part of the question in the first field.</h4>
        <h4>Fill in the blank word in the second field.</h4>
        <h4>Fill in the rest of the question in the third field.</h4>
        <div class="input-field">
            <label for="first-part" class="question-label">First part</label>
            <input type="text" id="first-part" v-model="firstPart">
        </div>
        <div class="input-field">
            <label for="fill-in-the-blank" class="question-label">Fill in the blank</label>
            <input type="text" id="fill-in-the-blank" v-model="fillInTheBlank" class="pink-input">
        </div>
        <div class="input-field">
            <label for="rest-of-the-question" class="question-label">Remaining part</label>
            <input type="text" id="rest-of-the-question" v-model="restOfTheQuestion">
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

const firstPart = ref('');
const fillInTheBlank = ref('');
const restOfTheQuestion = ref('');
const router = useRouter();

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
    width: 150px;
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

.pink-input {
    background-color: #f7567c;
    color: white;
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

h4 {
    color: #676767;
    margin-top: -15px;
}
</style>
