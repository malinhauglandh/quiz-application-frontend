<template>
    <div class="start-playing-quiz-component">
        <div class="content-wrapper">
            <div v-for="quiz in quiz" :key="quiz.quizId" class="quiz-box">
                <div v-if="quiz.multimedia" class="quiz-image" :style="{ backgroundImage: `url(${getPathToQuizImage(quiz.multimedia)})` }"></div>
                <div v-else class="quiz-image-placeholder"></div>
                <h3 class="quiz-title">{{ quiz.quizName }}</h3>
                <p class="quiz-description">{{ quiz.quizDescription }}</p>
                <p class="quiz-description" v-if="quiz.difficultyLevel">
                    <span class="label">Difficulty level:</span> {{ quiz.difficultyLevel }}
                </p>
                <p class="quiz-description" v-if="quiz.categoryName">
                    <span class="label">Category:</span> {{ quiz.categoryName }}
                </p>
                <button class="play-quiz-button" @click="playQuiz(quiz.quizId)">START</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from "@/store/store";
import router from "@/router/router";

const store = useStore();
const quiz = ref([]);
const categories = ref([]);

const quizId = router.currentRoute.value.params.quizId;


onMounted(async () => {
    try {
        const catResponse = await fetch('http://localhost:8080/api/categories/allCategories');
        if (!catResponse.ok) {
            throw new Error(`HTTP error! status: ${catResponse.status}`);
        }
        categories.value = await catResponse.json();
        await fetchQuiz();
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
});

const getPathToQuizImage = (filename) => {
    return `http://localhost:8080/api/quizzes/files/${filename}`;
};

const fetchQuiz = async () => {
    const token = store.jwtToken;
    const creatorId = token.userId;
    const accessToken = token.accessToken;

    try {
        const response = await fetch(`http://localhost:8080/api/quizzes/user/${creatorId}/${quizId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const fetchedQuiz = await response.json();

        console.log("Fetched quiz:", fetchedQuiz);

        quiz.value = fetchedQuiz.map(q => {
            const categoryName = categories.value.find(c => c.categoryId === q.categoryId)?.categoryName;
            return { ...q, categoryName };
        }).sort((a, b) => new Date(b.quizId) - new Date(a.quizId));

    } catch (error) {
        console.error("Failed to fetch quiz:", error);
    }
};

const playQuiz = (quizId) => {
    router.push(`/playquiz/${quizId}/fillInTheBlankQuestion`);
};

/*const playQuiz = async (quizId) => {
    const creatorId = store.jwtToken.userId;

    try {
        const response = await fetch(`http://localhost:8080/api/quizzes/user/${creatorId}/${quizId}`, {
            headers: {
                'Authorization': `Bearer ${store.jwtToken.accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const quizDetails = await response.json();

        const firstQuestion = quizDetails.questions[0];
        if (!firstQuestion) {
            console.error('No questions found in the quiz');
            return;
        }

        let routeName = '';
        switch (firstQuestion.typeId) {
            case 1:
                routeName = 'multiplechoice';
                break;
            case 2:
                routeName = 'truefalse';
                break;
            case 3:
                routeName = 'fillintheblank';
                break;
            default:
                console.error('Unknown question type');
                return;
        }

        router.push({ name: routeName, params: { quizId: quizId } });
    } catch (error) {
        console.error("Failed to start quiz:", error);
    }
};*/

onMounted(fetchQuiz);
</script>

<style scoped>
.content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
}

.quiz-box {
    margin-top: -200px;
    width: 80%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.quiz-image, .quiz-image-placeholder {
    width: 300px;
    height: 300px;
    background-size: cover;
    background-position: center;
    margin-bottom: 20px;
}

.quiz-title {
    margin-bottom: 10px;
    font-size: 24px;
    color: black;
    font-weight: bold;
    background-color: transparent;
}

.quiz-description {
    margin-bottom: 20px;
    font-size: 18px;
}

.play-quiz-button {
    padding: 15px 30px;
    transform: translateX(-50%);
    background-color: #f7567c;
    color: white;
    position: absolute;
    border-radius: 5px;
    border: none;
    bottom: 10px;
    left: 50%;
    cursor: pointer;
    font-size: 16px;
}

.label {
    font-weight: bold;
    color: #f7567c;
}

</style>
