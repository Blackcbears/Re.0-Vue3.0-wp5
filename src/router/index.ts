/**
 * @author CuiJing
 * @date 2021-2-19 17:28
 * @description 项目路由
 */
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
            component: () => import('@/views/home'),
        },
        {
            path: '/me',
            name: 'Me',
            component: () => import('@/views/Me'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/about.vue'),
        },

    ]
})

export default index;