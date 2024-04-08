import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '/src/store/userStore'

import HomeView from '@/view/HomeView.vue'
import CreateQuizView from '@/view/CreateQuizView.vue'
import SearchView from '@/view/SearchView.vue'
import AddQuestionsComponent from "@/components/AddQuestionsComponent.vue";
import CreateQuizDetailsComponent from "@/components/CreateQuizDetailsComponent.vue";
import MultipleChoiceComponent from "@/components/MultipleChoiceComponent.vue";
import TrueFalseComponent from "@/components/TrueOrFalseComponent.vue";
import FillInTheBlankComponent from "@/components/FillInTheBlankComponent.vue";
import StartPageView from "@/view/StartPageView.vue";
import LogInPageView from "@/view/LogInPageView.vue";
import SignUpPageView from "@/view/SignUpPageView.vue";
import CompletedQuizView from "@/view/CompletedQuizView.vue";
import StartPlayingQuizComponent from "@/components/StartPlayingQuizComponent.vue";
import StartPlayingQuizView from "@/view/StartPlayingQuizView.vue";
import TrueOrFalseQuestionComponent from "@/components/TrueOrFalseQuestionComponent.vue";
import MultipleChoiceQuestionComponent from "@/components/MultipleChoiceQuestionComponent.vue";
import FillInTheBlankQuestionComponent from "@/components/FillInTheBlankQuestionComponent.vue";

const routes = [
    {
        path: '/',
        name: 'StartPage',
        component: StartPageView,
        meta: { public: true }
    },
    {
        path: '/login',
        name: 'LogInPage',
        component: LogInPageView,
        meta: { public: true }
    },
    {
        path: '/signup',
        name: 'SignUpPage',
        component: SignUpPageView,
        meta: { public: true }
    },
    { path: '/home', component: HomeView },
    { path: '/search', component: SearchView },{
        path: '/playQuiz/:quizId',
        component: StartPlayingQuizView,
        children: [
            {
                path: '',
                component: StartPlayingQuizComponent
            },
            {
                path: '/playQuiz/:quizId/multipleChoiceQuestion/:questionId',
                name: 'MultipleChoiceQuestion',
                component: MultipleChoiceQuestionComponent
            },
            {
                path: '/playQuiz/:quizId/trueOrFalseQuestion/:questionId',
                name: 'TrueOrFalseQuestion',
                component: TrueOrFalseQuestionComponent
            },
            {
                path: '/playQuiz/:quizId/fillInTheBlankQuestion/:questionId',
                name: 'FillInTheBlankQuestion',
                component: FillInTheBlankQuestionComponent
            }
        ]
    },{ path: '/completedQuiz/:quizId', name: 'QuizCompletion' , component: CompletedQuizView },
    {
        path: '/createquiz',
        component: CreateQuizView,
        children: [
            {
                path: '',
                component: CreateQuizDetailsComponent
            },
            {
                path: '/addQuestions',
                component: AddQuestionsComponent,
            },
            {
                path: '/addQuestions/multipleChoice',
                component: MultipleChoiceComponent
            },
            {
                path: '/addQuestions/trueFalse',
                component: TrueFalseComponent
            },
            {
                path: '/addQuestions/fillInTheBlank',
                component: FillInTheBlankComponent
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const store = useStore();
    if (!store.jwtToken && !to.meta.public) {
      next({ name: 'LogInPage' });
    } else {
      next();
    }
  });

export default router
