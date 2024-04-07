import { defineStore } from 'pinia';
import axios from 'axios';
import { useStore } from './store.js';


export const useQuizStore = defineStore('quiz', {
  state: () => ({
    currentQuiz: null,
    quizzes: [], 
  }),
  getters: {
    getQuizById: (state) => (id) => {
      return state.quizzes.find(quiz => quiz.quizId === id);
    },
  },
  actions: {
    async createQuiz(quizData) {
      const store = useStore();
      const creatorId = store.jwtToken.userId;
      quizData.append('creator', creatorId);
      print(quizData)
      try {
        const response = await axios.post('http://localhost:8080/api/quizzes/createQuiz', quizData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + store.jwtToken.accessToken
          }
        });
        this.currentQuiz = response.data;
        return response.data;
      } catch (error) {
        console.error('Error creating quiz:', error.response?.data || error);
        throw error;
      }
    },
    async addQuestionToQuiz({ quizId, questionText, tag, questionTypeId, choices, file }) {
      let formData = new FormData();
      formData.append('questionText', questionText.value);
      formData.append('tag', tag.value);
      formData.append('quizId', quizId.value);
      formData.append('questionTypeId', questionTypeId.value);  
      formData.append('choices', JSON.stringify(choices));

  
      if (file) {
        formData.append('file', file);
      }
  
      try {
        const response = await axios.post('http://localhost:8080/api/questions/create', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + this.$store.jwtToken.value
          }
        });
        this.fetchQuizDetails(quizId);
        return response.data;
      } catch (error) {
        console.error('Error adding question:', error.response?.data || error);
        throw error;
      }
    },
    async fetchQuizDetails(quizId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/quizzes/${quizId}/details`);
        this.currentQuiz = response.data;
      } catch (error) {
        console.error('Error fetching quiz details:', error.response?.data || error);
        throw error;
      }
    },
  },
  persist: {
    enabled: true,
    storage: sessionStorage,
  },
});
