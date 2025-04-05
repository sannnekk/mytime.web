import { Day } from './Day'

const apiUrl = 'http://localhost:3000/'

async function fetchData(path, method, data, ignore401 = false) {
  const response = await fetch(apiUrl + path, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })

  if (response.status === 401 && !ignore401) {
    localStorage.removeItem('user')
    window.location.reload()
  }

  return response
}

/**
 * User login
 * @param {String} username
 * @param {String} password
 * @returns {Promise<import('../stores/user').User>}
 */
export async function loginUser(username, password) {
  const response = await fetchData(
    'user/login',
    'POST',
    {
      username,
      password
    },
    true
  )

  if (!response.ok) throw new Error('Failed to fetch users')

  const user = await response.json()

  localStorage.setItem('user', JSON.stringify(user))

  return user
}

/**
 * Logout a user
 */
export async function logoutUser() {
  await fetchData('user/logout', 'POST', undefined, true)

  localStorage.removeItem('user')

  return true
}

/**
 * Get all users
 * @returns {Promise<import('../stores/user').User[]>}
 */
export async function getUsers() {
  const response = await fetchData('user', 'GET')

  if (!response.ok) throw new Error('Failed to fetch users')

  return await response.json()
}

/**
 * Get a user by id
 * @param {Number} id
 * @returns {Promise<import('../stores/user').User[]>}
 */
export async function getUser(id) {
  const response = await fetchData(`user/${id}`, 'GET')

  if (!response.ok) throw new Error('Failed to fetch users')

  return await response.json()
}

/**
 * Register a user
 * @param {String} username
 * @param {String} password
 * @param {String} name
 */
export async function registerUser(username, password, name) {
  const response = await fetchData(
    'user/register',
    'POST',
    {
      username,
      password,
      name
    },
    true
  )

  if (!response.ok) throw new Error('Failed to register')
}

/**
 * Change user password
 * @param {String} username
 * @param {String} oldPassword
 * @param {String} newPassword
 */
export async function changeUserPassword(username, oldPassword, newPassword) {
  const response = await fetchData(
    'user/password',
    'PATCH',
    {
      username,
      oldPassword,
      newPassword
    },
    true
  )

  if (!response.ok) throw new Error('Failed to change password')
}

/**
 * Load the hour data of the month and year passed as parameters from local storage
 * @param {number} month
 * @param {number} year
 * @returns {Promise<Day[]>}
 */
export async function loadHoursData(
  userId,
  month = new Date().getMonth(),
  year = new Date().getFullYear()
) {
  const response = await fetchData(`hour/${userId}/${year}/${month}`, 'GET')

  if (!response.ok) throw new Error('Failed to fetch hours')

  const { data } = await response.json()

  if (!data) return []

  return data.map((h) => Day.fromData(h))
}

/**
 * Function to save hours data to local storage
 * @param {Day[]} hours
 */
export async function saveHoursData(hours, userId, month, year) {
  const response = await fetchData(
    `hour/${userId}/${year}/${month}`,
    'PATCH',
    hours
  )

  if (!response.ok) throw new Error('Failed to save hours')
}
