import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @typedef {{
 *  id: String,
 *  name: String
 * }} User
 */

export const useUserStore = defineStore('user', () => {
  /**
   * Ref to the current user
   * @type {import('vue').Ref<User | null>}
   */
  const user = ref(null)

  /**
   * Ref to the current user token
   * @type {import('vue').Ref<String | null>}
   */
  const token = ref(null)

  /**
   * Check if the user is authenticated
   * @type {import('vue').Ref<Boolean>}
   */
  const isAuthenticated = ref(false)

  /**
   * Function to log in the user
   * @param {String} username
   * @param {String} password
   * @returns {Promise<void>}
   */
  function login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
          user.value = {
            id: '123',
            name: 'Oleksandr Petrushyn'
          }
          token.value = '123'
          isAuthenticated.value = true
          resolve()
        } else {
          reject()
        }
      }, 1000)
    })
  }

  /**
   * Function to log out the user
   */
  function logout() {
    user.value = null
    token.value = null
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,
    login,
    logout,
    user
  }
})
