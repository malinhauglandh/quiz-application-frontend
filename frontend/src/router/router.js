import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'
import CreateQuizView from '../view/CreateQuizView.vue'
import SearchView from '../view/SearchView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/createquiz', component: CreateQuizView },
    { path: '/search', component: SearchView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
