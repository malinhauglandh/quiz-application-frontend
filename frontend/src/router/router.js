import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store/store'

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
    { path: '/search', component: SearchView },
    {
        path: '/createquiz',
        component: CreateQuizView,
        children: [
            {
                path: '',
                component: CreateQuizDetailsComponent
            },
            {
                path: '/addquestions',
                component: AddQuestionsComponent,
            },
            {
                path: '/addquestions/multiplechoice',
                component: MultipleChoiceComponent
            },
            {
                path: '/addquestions/truefalse',
                component: TrueFalseComponent
            },
            {
                path: '/addquestions/fillintheblank',
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
