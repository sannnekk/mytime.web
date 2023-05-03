import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { Day } from '../utils/Day'
import { loadHoursData } from '../utils/loaders'

/**
 * Main app store to handle working hours data
 */
export const useTimeStore = defineStore('time', () => {
  /**
   * Ref to the current date hours object from hours array
   */
  const currentDate = ref(new Date())

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
      const index = hours.findIndex(day => day.isOnDate(currentDate.value))

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
   * Function to get day from hours array
   * @param {Number | Date} arg 
   * @returns {Day | false}
   */
  function getDay(arg) {
    const param = typeof arg === 'number' ? new Date(arg) : arg
    return hours.find(day => day.isOnDate(param)) || false
  }

  return { current, currentDate, hours, getDay }
})
