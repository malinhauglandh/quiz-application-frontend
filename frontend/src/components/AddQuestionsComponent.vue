    <template>
        <div class="quiz-container">
        <div class="layout-container">
            <div class="add-questions">
            <h1>Add Questions</h1>
            <div class="button-container">
                <div v-if="!showOptions" class="add-question-button" @click="toggleOptions">
                <span>+ Add</span>
                </div>
                <div v-if="showOptions" class="options-container">
                <button @click="chooseQuestionType('multiplechoice')">Multiple Choice</button>
                <button @click="chooseQuestionType('truefalse')">True or False</button>
                <button @click="chooseQuestionType('fillintheblank')">Fill in the Blank</button>
                </div>
            </div>
            </div>
            <div class="quiz-preview">
            <h1>Quiz Preview</h1>
            <div class="quiz-info" v-if="currentQuiz">
                <h2>{{ currentQuiz.quizName }}</h2>
                <p>{{ currentQuiz.quizDescription }}</p>
                <p>Category: {{ currentQuiz.categoryName }}</p>
                <p>Difficulty Level: {{ currentQuiz.difficultyLevel }}</p>
            </div>
            <div class="question-list">
                <ul v-if="currentQuiz && currentQuiz.questions">
                <li v-for="question in currentQuiz.questions" :key="question.questionId">
                    {{ question.questionText }}
                </li>
                </ul>
            </div>
            </div>
        </div>
        <div class="nav-buttons">
            <button class="nav-button back-button" @click="showModal = true">BACK</button>
            <button class="nav-button next-button" @click="goToNextPage">NEXT</button>
        </div>
            <ConfirmModal
            :visible="showModal"
            title="Confirm Delete"
            message="You are about to delete the quiz! Are you sure you want to delete the it?"
            @confirm="handleDelete"
            @cancel="handleCancel"
        />
        </div>
    </template>
    
    <script setup>
    import { ref, watch, onBeforeMount } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useQuizStore } from "@/store/quizStore";
    import { useStore } from "@/store/store";
    import { computed } from 'vue';
    import axios from 'axios';
    import ConfirmModal from '@/components/ConfirmModal.vue';
    
    const quizStore = useQuizStore();
    const userStore = useStore();
    const route = useRoute();
    const router = useRouter();
    const showOptions = ref(false);
    const selectedFile = ref(null);

    const currentQuiz = ref(null);

    const showModal = ref(false);

    const fetchQuizDetailsAlternatively = async () => {
        try {
            const quizId = quizStore.currentQuiz.quizId;
            const data = await userStore.fetchData(`http://localhost:8080/api/quizzes/${quizId}/details`)
            console.log("this data wats fetched alternatively:", data)
        } catch (error) {
            console.error('Failed to fetch quiz details:', error);
        }
    }

    const fetchQuizDetails = async (quizId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/quizzes/${quizId}/details`, {
        headers: {
            Authorization: `Bearer ${userStore.jwtToken.accessToken}`
        }
        
        });
        if (response.data) {
        currentQuiz.value = response.data;
        console.log('Quiz details:', currentQuiz.value);
        } else {
        console.error('No quiz details were returned for quiz ID:', quizId);
        }
    } catch (error) {
        console.error('Failed to fetch quiz details:', error);
    }
};

    onBeforeMount(() => {
    if(quizStore.currentQuiz && quizStore.currentQuiz.quizId) {
        const quizId = useQuizStore().currentQuiz.quizId;
        fetchQuizDetails(quizId);
        fetchQuizDetailsAlternatively();
    } else {
        router.push('/createQuiz');
    }
    });
    
    const toggleOptions = () => {
        showOptions.value = !showOptions.value;
    };
    
    const handleCancel = () => {
        showModal.value = false;
    };


    const deleteQuiz = async (quizId) => {
    try {
        await axios.delete(`http://localhost:8080/api/quizzes/${quizId}`, {
            headers: {
                Authorization: `Bearer ${userStore.jwtToken.accessToken}`
            }
        });
        console.log('Quiz deleted successfully');
        } catch (error) {
            console.error('Failed to delete quiz:', error);
            throw error;
        }
    };

    const handleDelete = () => {
        deleteQuiz(currentQuiz.value.quizId).then(() => {
            router.push('/createQuiz');
            showModal.value = false;
        }).catch(error => {
            console.error('Failed to delete quiz:', error);
            showModal.value = false;
        });
    };
    
    const goToNextPage = () => {
        // Logic for going to the next page
    };
        
    const chooseQuestionType = (type) => {
        switch (type) {
            case 'multiplechoice':
                router.push({ path: '/addQuestions/multipleChoice'});
                break;
            case 'truefalse':
                router.push({ path: '/addQuestions/trueFalse'});
                break;
            case 'fillintheblank':
                router.push({ path: '/addQuestions/fillInTheBlank'});
                break;
            default:

                break;
        }

    };

    const handleAddQuestion = async () => {
    const questionData = {
    quizId: currentQuiz.value.quizId,
    questionText: currentQuiz.value.questionText,
    tag: currentQuiz.value.tag,
    questionTypeId: currentQuiz.value.questionTypeId,
    choices: currentQuiz.value.choices,
    file: selectedFile.value
    };

    try {
        await quizStore.addQuestionToQuiz(questionData);
        console.log('Question added successfully');
    } catch (error) {
        console.error('Failed to add question', error);
    }
};

    </script>
    
    <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap');
    
    .quiz-container {
        max-width: 1200px;
        margin: 50px auto;
        display: flex;
        flex-direction: column;
    }
    
    .layout-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    
    .add-questions, .quiz-preview {
        flex-basis: 48%;
        padding: 40px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        font-family: 'Karla', sans-serif;
        margin: 10px;
    }
    
    h1 {
        text-align: center;
        color: #333;
        font-weight: 700;
        margin-bottom: 2rem;
    }
    
    .button-container, .nav-buttons {
        display: flex;
        justify-content: center;
    }

    .options-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .add-question-button, .options-container button, .nav-button {
        border: none;
        background-color: #6320EE;
        padding: 15px 30px;
        color: white;
        border-radius: 25px;
        font-family: "Karla", sans-serif;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        margin-right: 1rem;
    }
    
    .nav-buttons {
        margin-top: 20px;
    }
    
    .nav-button.back-button, .nav-button.next-button {
        margin-left: 80px;
        margin-right: 80px;
    }

    .question-list {
        flex-direction: column;
        align-items: center;
        display: flex;
    }
    

    
    @media (max-width: 768px) {
        .layout-container {
        flex-direction: column;
        }
    
        .add-questions, .quiz-preview {
        flex-basis: 100%;
        }
        
        .nav-button.back-button, .nav-button.next-button {
        margin-left: 0;
        margin-right: 0;
        }
    }
    </style>