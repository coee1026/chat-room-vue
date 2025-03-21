import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layout/BaseLayout.vue'
import { useAuthStore } from '@/stores/authStore'
import { ElMessage } from 'element-plus'
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
// 路由全局守卫
router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  console.log(authStore.token)

  if (
    // 检查用户是否已登录
    (authStore.token === '' || authStore.token === null) &&
    // ❗️ 避免无限重定向
    to.path !== '/login'
  ) {
    ElMessage.warning('用户未登录')
    // 将用户重定向到登录页面
    return { path: '/login' }
  }
  return true
})

export default router
