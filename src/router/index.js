import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import HomeView from '../views/HomeView.vue'

/**
 * Creating router
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AuthView.vue')
    }
  ]
})

/**
 * Check if user is authenticated
 */
router.beforeEach((to) => {
  if (to.path === '/auth') return

  const { isAuthenticated } = useUserStore()
  return isAuthenticated || '/auth'
})

export default router
