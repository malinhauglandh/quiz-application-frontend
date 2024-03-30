import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'
import CreateQuizView from '../view/CreateQuizView.vue'
import SearchView from '../view/SearchView.vue'
import AddQuestionsComponent from "@/components/AddQuestionsComponent.vue";
import CreateQuizDetailsComponent from "@/components/CreateQuizDetailsComponent.vue";
import MultipleChoiceComponent from "@/components/MultipleChoiceComponent.vue";
import TrueFalseComponent from "@/components/TrueOrFalseComponent.vue";
import FillInTheBlankComponent from "@/components/FillInTheBlankComponent.vue";

const routes = [
    { path: '/', component: HomeView },
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

export default router
