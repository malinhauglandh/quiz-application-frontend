<template>
    <div>
        <div class="add-questions">
            <h1>Add Questions</h1>
            <div class="button-container">
                <div class="add-question-button" @click="showOptions = !showOptions" v-if="!showOptions">
                    <span>+ Add</span>
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
@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap');

.add-questions {
    max-width: 800px; /* Adjust to match second file */
    margin: 50px auto;
    padding: 40px;
    background: #fff; /* Match white background */
    border-radius: 8px; /* Rounded corners as in second file */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* Shadow for depth */
    font-family: 'Karla', sans-serif; /* Use Karla font */
}

h1 {
    text-align: center; /* Center align as in second file */
    color: #333; /* Dark text for heading */
    margin-bottom: 20px; /* Space after heading */
    font-weight: 700;
    font-size: xxx-large;
    margin: 0;
    margin-bottom: 2rem;
}

.button-container, .nav-buttons {
    display: flex;
    justify-content: center; /* Center the buttons */
}

.add-question-button {
    border: none;
    background-color: #6320EE;
    padding: 15px 30px; /* Adjusted to match the nav-button padding */
    color: white;
    border-radius: 25px; /* Adjusted to match the nav-button border-radius */
    font-family: "Karla", sans-serif;
    font-weight: bold; /* Match the font-weight of nav buttons */
    cursor: pointer;
    display: flex;
    justify-content: center; /* Center the text horizontally */
    align-items: center; /* Center the text vertically */
    font-size: 16px; /* Match the font-size of nav buttons */
}

.nav-button.back-button, .nav-button.next-button {
    margin: 0 10px; /* Adjusted for a more balanced spacing */
}


/* The hover styles below are for your nav-buttons, remove them to prevent color change on hover */
.nav-button:hover, .add-question-button:hover {
    background-color: #7E41FDFF; /* Remove this line */
}

/* If you have other hover styles affecting other buttons, remove them as well */
.options-container button:hover {
    background-color: #7E41FDFF; /* Remove this line */
}

.nav-button:hover {
    background-color: #7E41FDFF; /* Hover effect to match */
}

.options-container button, .nav-button {
    padding: 15px 30px;
    background-color: #6320EE; /* Match button background color */
    color: white;
    border: none;
    border-radius: 25px; /* Rounded corners for buttons */
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin-right: 1rem;
}

.options-container button:hover {
    background-color: #7E41FDFF; /* Hover effect */
}

.nav-buttons {
    margin-top: 20px;
}

.nav-button.back-button, .nav-button.next-button {
    margin-left: 80px;
    margin-right: 80px; /* Adjust spacing around navigation buttons */
}

@media (max-width: 768px) {
    .add-questions, .nav-buttons {
        padding: 20px; /* Adjust padding for smaller screens */
    }
}
</style>
