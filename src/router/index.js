import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import HoursView from '../views/HoursView.vue'

/**
 * Creating router
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/user/:userId',
      name: 'hours',
      component: HoursView
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
