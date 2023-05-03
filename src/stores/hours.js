import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { Day } from '../utils/Day'
import { loadHoursData } from '../utils/loaders'
import { Time } from '../utils/Time'

/**
 * Main app store to handle working hours data
 */
export const useTimeStore = defineStore('time', () => {
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

      hours.push(new Day(currentDate.value))

      /**
       * @type {Day}
       */
      // @ts-ignore
      const day = getDay(currentDate.value)
      return day
    },
    set: (value) => {
      const index = hours.findIndex((day) => day.isOnDate(currentDate.value))

      if (index !== -1) hours[index] = value
      else hours.push(value)
    }
  })

  /**
   * The data we are working with
   * @type {Day[]} hours
   */
  const hours = reactive(loadHoursData())

  /**
   * Month summary under the calendar
   */
  const monthSummary = computed(() => {
    const days = hours
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
      overHours: monthHours.getDifferrence(new Time(8 * 60 * days.length))
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
    return hours.find((day) => day.isOnDate(param)) || false
  }

  return {
    current,
    currentDate,
    hours,
    getDay,
    monthSummary,
    setCurrentMonth,
    setCurrentYear
  }
})
