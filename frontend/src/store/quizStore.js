import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useStore } from './userStore.js';

export const useQuizStore = defineStore('quiz', () => {
  const currentQuiz = ref(null);
  const quizzes = ref([]);
  const currentQuestion = ref(null);
  const userAnswers = ref([]);
  const categories = ref([]);

  const getQuizById = (id) => {
    return quizzes.value.find(quiz => quiz.quizId === id);
  };

  async function createQuiz(quizData) {
    const store = useStore();
    const creatorId = store.jwtToken.userId;
    quizData.append('creator', creatorId);
    console.log(quizData);
    try {
      const response = await axios.post('http://localhost:8080/api/quizzes/createQuiz', quizData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + store.jwtToken.accessToken
        }
      });
      currentQuiz.value = response.data;
      return response.data;
    } catch (error) {
      console.error('Error creating quiz:', error.response?.data || error);
      throw error;
    }
  }

  async function addQuestionToQuiz({ quizId, questionText, tag, questionTypeId, choices, file }) {
    let formData = new FormData();
    formData.append('questionText', questionText);
    formData.append('tag', tag);
    formData.append('quizId', quizId);
    formData.append('questionTypeId', questionTypeId);
    formData.append('choices', JSON.stringify(choices));

    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/questions/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + store.jwtToken.value
        }
      });
      fetchQuizDetails(quizId);
      return response.data;
    } catch (error) {
      console.error('Error adding question:', error.response?.data || error);
      throw error;
    }
  }

  async function fetchQuizDetails(quizId) {
    const store = useStore();
    console.log("Fetching quiz details...");
    try {
      const res = await store.fetchData(`http://localhost:8080/api/quizzes/${quizId}/details`);
      currentQuiz.value = res.data;
      return res.data;
    } catch (error) {
      console.error('Error fetching quiz details:', error.response?.data || error);
      throw error;
    }
  }

  function getQuestionRouteName(questionTypeId) {
    let routeName = '';
    switch (questionTypeId) {
      case 1:
        routeName = 'MultipleChoiceQuestion';
        break;
      case 2:
        routeName = 'TrueOrFalseQuestion';
        break;
      case 3:
        routeName = 'FillInTheBlankQuestion';
        break;
      default:
        routeName = '';
        break;
    }
    return routeName;
  }

  async function fetchCategories() {
    const store = useStore();
    try {
      const catResponse = await store.fetchData('http://localhost:8080/api/categories/allCategories');
      if (catResponse.status !== 200) {
        throw new Error(`HTTP error! status: ${catResponse.status}`);
      }
      this.categories = await catResponse.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  function nextQuestion() {
    const questionIndex = currentQuiz.value.questions.findIndex(
      (question) => question.questionId === currentQuestion.value.questionId
    );
    console.log('Current question index:', questionIndex);
    if (questionIndex < currentQuiz.value.questions.length - 1) {
      return currentQuiz.value.questions[questionIndex + 1];
    }
    return null;
  }



  function updateAnswer(choiceId) {
    const questionIndex = currentQuiz.value.questions.findIndex(
      (question) => question.questionId === currentQuestion.value.questionId
    );
    userAnswers.value[questionIndex] = { questionId: currentQuestion.value.questionId, choiceId };
    console.log('User answers:', userAnswers.value);
  }

  function clearAnswers() {
    userAnswers.value = [];
  }

  async function submitAnswers(quizId) {
    const accessToken = store.jwtToken.accessToken;
    try {
      console.log('Submitting quiz answers:', userAnswers.value);
      const response = await axios.post(`http://localhost:8080/api/completed-quizzes/${quizId}/submit`, userAnswers.value, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Quiz answers submitted:', response.data);
      clearAnswers();
    } catch (error) {
      console.error('Failed to submit quiz answers:', error);
    }
  }

  return { fetchCategories, currentQuiz, quizzes, currentQuestion, userAnswers, getQuestionRouteName, getQuizById, createQuiz, addQuestionToQuiz, fetchQuizDetails, updateAnswer, clearAnswers, submitAnswers, nextQuestion };
});
