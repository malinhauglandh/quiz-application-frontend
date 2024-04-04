<template>
    <div>
        <div class="add-questions">
            <h1>Add Questions</h1>
            <div class="button-container">
                <div class="add-question-button" @click="showOptions = !showOptions">
                    <span>+</span>
                </div>
                <div v-if="showOptions" class="options-container">
                    <button @click="addQuestion('multiplechoice')">Multiple Choice</button>
                    <button @click="addQuestion('truefalse')">True or False</button>
                    <button @click="addQuestion('fillintheblank')">Fill in the Blank</button>
                </div>
            </div>
        </div>
        <div class="nav-buttons">
            <button class="nav-button back-button" @click="goBack">BACK</button>
            <button class="nav-button next-button" @click="goToNextPage">NEXT</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showOptions = ref(false);

const goBack = () => {
    router.push('/createQuiz');
};

const goToNextPage = () => {
};

const addQuestion = (type) => {
    switch (type) {
        case 'multiplechoice':
            router.push('/addQuestions/multipleChoice');
            break;
        case 'truefalse':
            router.push('/addQuestions/trueFalse');
            break;
        case 'fillintheblank':
            router.push('/addQuestions/fillInTheBlank');
            break;
        default:
            break;
    }
};
</script>

<style scoped>
.add-questions {
    max-width: 600px;
    margin: 0 auto;
}

h1 {
    margin-bottom: 20px;
}

.button-container {
    display: flex;
    align-items: center;
}

.add-question-button {
    width: 60px;
    height: 60px;
    background-color: #f7567c;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
}

.add-question-button:hover {
    background-color: #F8809AFF;
}

.options-container {
    display: flex;
}

.options-container button {
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #6320EE;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 18px;
}

.options-container button:last-child {
    margin-right: 0;
}

.options-container button:hover {
    background-color: #7E41FDFF;
}

.nav-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.nav-button {
    padding: 15px 30px;
    background-color: #6320EE;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 22px;
    margin-top: 390px;
}

.nav-button:hover {
    background-color: #7E41FDFF;
}

.back-button {
    margin-right: 80px;
}

.next-button {
    margin-left: 80px;
}
</style>
