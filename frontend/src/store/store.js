import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";

export const useStore = defineStore("main", () => {
        const jwtToken = ref(null);
        const loggedInUser = ref(null);

        const quizDetails = ref({questions: [], currentQuestionIndex: 0});
        const userAnswers = ref([]);


        function saveToken(username, token) {
            loggedInUser.value = username;
            jwtToken.value = token;
        }

        function clearToken() {
            jwtToken.value = null;
            loggedInUser.value = null;
        }

        function setQuizDetails(details) {
            quizDetails.value = {...details, currentQuestionIndex: 0};
        }

        function clearQuizDetails() {
            quizDetails.value = {questions: [], currentQuestionIndex: 0};
        }

        function incrementQuestionIndex() {
            if (quizDetails.value.currentQuestionIndex < quizDetails.value.questions.length - 1) {
                quizDetails.value.currentQuestionIndex += 1;
            } else {
                console.log("Reached the end of the quiz.");
            }
        }

        function goToQuestion(index) {
            if (index >= 0 && index < quizDetails.value.questions.length) {
                quizDetails.value.currentQuestionIndex = index;
            } else {
                console.error("Invalid question index");
            }
        }

        function updateAnswer(questionId, choiceId) {
            const answerIndex = userAnswers.value.findIndex(
                (answer) => answer.questionId === questionId
            );
            if (answerIndex !== -1) {
                userAnswers.value[answerIndex].choiceId = choiceId;
            } else {
                userAnswers.value.push({ questionId, choiceId });
            }
        }

        function clearAnswers() {
            userAnswers.value = [];
        }

        async function submitAnswers(quizId) {
            const accessToken = jwtToken.value;

            try {
                console.log('Submitting quiz answers:', userAnswers.value)
                const response = await axios.post(`http://localhost:8080/api/completed-quizzes/${quizId}/submit`,
                    userAnswers.value,
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                    }
                );

                console.log('Quiz answers submitted:', response.data);

                clearAnswers();

            } catch (error) {
                console.error('Failed to submit quiz answers:', error);
            }
        }

        return {
            jwtToken,
            loggedInUser,
            quizDetails,
            saveToken,
            clearToken,
            setQuizDetails,
            clearQuizDetails,
            incrementQuestionIndex,
            goToQuestion,
            updateAnswer,
            clearAnswers,
            submitAnswers
        };
    },
    {
        persist: {
            key: 'quiz-app-store',
            storage: window.sessionStorage,
            paths: ['jwtToken', 'loggedInUser', 'quizDetails', 'userAnswers']
        }
    });
