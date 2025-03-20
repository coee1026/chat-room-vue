import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layout/BaseLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: BaseLayout,
      redirect: '/home',

      children: [
        {
          path: '/home',
          component: () => import('@/views/HomeView.vue'),
          name: 'home',
        },
        {
          path: '/search',
          component: () => import('@/views/SearchFriend.vue'),
        },
        {
          path: '/chat/:id',
          component: () => import('@/views/ChatView.vue'),
        },
      ],
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/LoginAndRegisterView.vue'),
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/RegisterView.vue'),
        },
      ],
    },
  ],
})

export default router
