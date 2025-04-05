import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { Day } from '../utils/Day'
import { loadHoursData, saveHoursData, getUser } from '../utils/loaders'
import { Time } from '../utils/Time'
import { useRoute } from 'vue-router'

/**
 * Main app store to handle working hours data
 */
export const useTimeStore = defineStore('time', () => {
  const route = useRoute()

  /**
   * Current user id
   */
  const userId = computed(() => route.params.userId)

  /**
   * User
   */
  const user = ref()

  /**
   * Loading state
   */
  const loading = ref(false)

  /**
   * Ref to the current date hours object from hours array
   */
  const currentDate = ref(new Date())

  /**
   * Current chosen month
   */
  const currentMonth = ref(new Date().getMonth())

  /**
   * Current year chosen
   */
  const currentYear = ref(new Date().getFullYear())

  /**
   * Current is a computed property that returns the current day state
   */
  const current = computed({
    get: () => {
      const _current = getDay(currentDate.value)

      if (_current) return _current

      hours.value = [...hours.value, new Day(currentDate.value)]

      /**
       * @type {Day}
       */
      // @ts-ignore
      const day = getDay(currentDate.value)
      return day
    },
    set: (value) => {
      const index = hours.value.findIndex((day) =>
        day.isOnDate(currentDate.value)
      )

      if (index !== -1) hours.value[index] = value
      else hours.value.push(value)
    }
  })

  /**
   * The data we are working with
   * @type {Day[]} hours
   */
  const hours = ref([])

  /**
   * Load the hours data when month or year changes
   */
  watch([currentMonth, currentYear], fetchHours)

  /**
   * Month summary under the calendar
   */
  const monthSummary = computed(() => {
    const days = hours.value
      .filter(Boolean)
      .filter((day) => !day.getDuration().equals(new Time('00:00')))
      .filter(
        (day) =>
          day.isInMonth(currentMonth.value) &&
          !day.isNotPresent &&
          !day.isVocation
      )

    const monthHours = days.reduce(
      (acc, day) => acc.add(day.getDuration()),
      new Time()
    )

    const overHours = monthHours.getDifferrence(new Time(4 * 60 * days.length))

    const month = [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'December'
    ][currentMonth.value]

    return {
      hours: monthHours,
      month,
      year: currentYear.value,
      overHours
    }
  })

  /**
   * Get month that is chosen in the calendar
   * @param {Date} date
   */
  function setCurrentMonth(date) {
    currentMonth.value = date.getMonth()
  }

  /**
   * Set the year that is chosen in the calendar
   * @param {Date} date
   */
  function setCurrentYear(date) {
    currentYear.value = date.getFullYear()
  }

  /**
   * Function to get day from hours array
   * @param {Number | Date} arg
   * @returns {Day | false}
   */
  function getDay(arg) {
    const param = typeof arg === 'number' ? new Date(arg) : arg
    return hours.value.find((day) => day.isOnDate(param)) || false
  }

  /**
   * Function to fetch hours
   */
  async function fetchHours() {
    loading.value = true

    try {
      hours.value = await loadHoursData(
        userId.value,
        currentMonth.value,
        currentYear.value
      )
    } catch (error) {
      console.error('Error fetching hours:', error)
    } finally {
      loading.value = false
    }
  }

  /**
   * Function to save hours
   */
  async function saveHours() {
    loading.value = true

    try {
      await saveHoursData(
        hours.value,
        userId.value,
        currentMonth.value,
        currentYear.value
      )
    } catch (error) {
      console.error('Error saving hours:', error)
    } finally {
      loading.value = false
    }
  }

  /**
   * Function to fetch user data
   */
  async function fetchUser() {
    user.value = await getUser(userId.value)
  }

  return {
    loading,
    current,
    currentDate,
    hours,
    user,
    getDay,
    monthSummary,
    setCurrentMonth,
    setCurrentYear,
    fetchHours,
    fetchUser,
    saveHours
  }
})
