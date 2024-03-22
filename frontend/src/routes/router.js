import { createRouter, createWebHistory } from 'vue-router'
import StartPageView from "../views/StartPageView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: '/',
        name: 'StartPage',
        component: StartPageView
    }
    ]
})

export default router