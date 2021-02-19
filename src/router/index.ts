import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home';
import Me from '@/views/me';
import about from '@/views/about.vue';

const routerHistory = createWebHistory();

const index = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/me',
            name: 'Me',
            component: Me
        },
        {
            path: '/about',
            name: 'about',
            component: about
        },

    ]
})

export default index;