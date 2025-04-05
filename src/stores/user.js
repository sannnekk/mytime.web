import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { loginUser, logoutUser, getUsers } from '../utils/loaders'

/**
 * @typedef {{
 *  id: String,
 *  name: String,
 *  username: String,
 *  email: String,
 *  role: 'admin' | 'user'
 * }} User
 */

export const useUserStore = defineStore('user', () => {
  /**
   * Ref to the current user
   * @type {import('vue').Ref<User | null>}
   */
  const user = ref(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )

  /**
   * All the users
   * @type {import('vue').Ref<User[]>}
   */
  const users = ref([])

  /**
   * Check if the user is authenticated
   * @type {import('vue').Ref<Boolean>}
   */
  const isAuthenticated = computed(() => user.value !== null)

  /**
   * Function to log in the user
   * @param {String} username
   * @param {String} password
   * @returns {Promise<void>}
   */
  async function login(username, password) {
    const response = await loginUser(username, password)

    if (!response) {
      throw new Error('Invalid credentials')
    }

    user.value = response
  }

  /**
   * Function to log out the user
   */
  async function logout() {
    if (!(await logoutUser())) {
      throw new Error('Failed to log out')
    }

    user.value = null
  }

  /**
   * Get all users
   */
  async function getAllUsers() {
    users.value = await getUsers()
  }

  return {
    isAuthenticated,
    login,
    logout,
    getAllUsers,
    user,
    users
  }
})
