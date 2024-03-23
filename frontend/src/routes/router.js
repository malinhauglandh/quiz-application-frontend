import { createRouter, createWebHistory } from 'vue-router'
import StartPageView from "../views/StartPageView.vue";
import LogInPageView from "../views/LogInPageView.vue";
import SignUpPageView from "../views/SignUpPageView.vue";

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
    ,
    {
        path: '/signup',
        name: 'SignUpPage',
        component: SignUpPageView
    }
    ]
})

export default router