import { createRouter, createWebHistory } from 'vue-router'
import StartPageView from "../views/StartPageView.vue";
import LogInPageView from "@/views/LogInPageView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: '/',
        name: 'StartPage',
        component: StartPageView
    }
    ,
    {
        path: '/login',
        name: 'LogInPage',
        component: LogInPageView
    }
    ]
})

export default router