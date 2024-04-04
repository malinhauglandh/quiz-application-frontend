<template>
    <div class="multiple-choice-component">
        <h2>New question with multiple choice answer</h2>
        <h3>Check off the correct alternative</h3>
        <div class="input-field">
            <label for="question" class="question-label">Question</label>
            <input type="text" id="question" v-model="questionText">
        </div>
        <div class="input-field" v-for="(alternative, index) in alternatives" :key="index">
            <label :for="'alternative-' + (index + 1)" class="alternative-label">Alternative {{ index + 1 }}</label>
            <input type="text" :id="'alternative-' + (index + 1)" v-model="alternatives[index]"
                   class="alternative-input">
            <input type="radio" :id="'correct-' + (index + 1)" name="correct" v-model="correctAnswer"
                   :value="index.toString()">
        </div>
        <div class="input-field">
            <label for="tag" class="tag-label">Add tag</label>
            <input type="text" id="tag" v-model="tag">
        </div>
        <div class="input-field">
            <label for="fileUpload">Upload File</label>
            <input type="file" id="fileUpload" @change="handleFileUpload" accept="image/*, video/*"
                   :style="{ backgroundColor: fileUploaded ? 'white' : 'transparent' }">
        </div>
        <div class="button-container">
            <button class="button cancel-button" @click="cancelQuestion">CANCEL</button>
            <button class="button save-button" @click="saveQuestion">SAVE AND GO BACK</button>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';

const questionText = ref('');
const alternatives = ref(['', '', '', '']);
const correctAnswer = ref(null);
const router = useRouter();
const tag = ref('');
const multimedia = ref('');
const fileUploaded = ref(false);

const quizId = computed(() => router.currentRoute.value.query.quizId || localStorage.getItem('createdQuizId'));

const saveQuestion = async () => {

    let formData = new FormData();
    formData.append('questionText', questionText.value);
    formData.append('tag', tag.value);
    formData.append('quizId', Number(quizId.value));
    formData.append('questionTypeId', 1);
    formData.append('choices', JSON.stringify(alternatives.value.map((alt, index) => {
        const isCorrect = correctAnswer.value === index.toString();
        return {
            choice: alt,
            explanation: '',
            isCorrectChoice: isCorrect,
        };
    })));

    if (multimedia.value) {
        formData.append('file', multimedia.value);
    }

    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const response = await axios.post('http://localhost:8080/api/questions/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        await router.push('/addquestions');
        console.log('Question created:', response.data);

    } catch (error) {
        console.error('Error creating question:', error.response.data);
    }
};

const cancelQuestion = () => {
    router.push('/addquestions');
};

const handleFileUpload = (event) => {
    multimedia.value = event.target.files[0];
    fileUploaded.value = true;
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
    justify-content: center;
    margin-top: 20px;
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

.cancel-button {
    margin-right: 80px;
}

.save-button {
    margin-left: 80px;
}

.tag-label {
    display: inline-block;
    font-weight: bold;
    margin-bottom: 5px;
    margin-right: 10px;
    text-align: left;
}

.input-field input[type="file"] {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
    background-color: white;
}
</style>