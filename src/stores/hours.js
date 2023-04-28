import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import { useUtilsStore } from './utils'

/**
 * Main app store to handle working hours data
 */
export const useTimeStore = defineStore('time', () => {
  /**
   * Util functions store
   */
  const utils = useUtilsStore()

  /**
   * Ref to the current date hours object from hours array
   */
  const currentDate = ref(new Date())

  /**
   * Function that returns a sample day state that doesn't exist in hours array
   *
   * @returns {Object} - sample day state
   */
  function getSample() {
    return {
      id: uuid(),
      date: currentDate.value,
      isVocation: false,
      isNotPresent: false,
      start: '00:00',
      end: '00:00',
      hours: '00:00',
      break: '00:00',
      minBreak: '00:00',
      overHours: '00:00',
      projects: []
    }
  }

  /**
   * Current is a computed property that returns the current day state
   */
  const current = computed({
    get: () => {
      const _current = hours.find((item) => _isSameDay(item.date, currentDate.value))

      if (_current) {
        // get hours
        _current.hours = utils.getDayHours(_current.start, _current.end)
        _current.hours = utils.beutifyTime(_current.hours)

        // get minimal break
        _current.minBreak = utils.getMinimalBreak(_current.hours)

        return _current
      }

      const sample = getSample()
      hours.push(sample)

      return sample
    },
    set: (value) => {
      const index = hours.findIndex((item) => _isSameDay(item.date, currentDate.value))

      if (index !== -1) hours[index] = value
      else hours.push(value)
    }
  })

  /**
   * The data we are working with
   */
  const hours = reactive([
    {
      id: uuid(),
      date: new Date(),
      isVocation: true,
      isNotPresent: false,
      start: '08:00',
      end: '16:00',
      hours: '00:00',
      break: '00:30',
      minBreak: '00:30',
      overHours: '00:00',
      projects: [
        {
          id: uuid(),
          projectNumber: '1234',
          projectPart: '1',
          time: '06:00',
          note: 'Some note...'
        },
        {
          id: uuid(),
          projectNumber: '4321',
          projectPart: '3',
          time: '02:00',
          note: 'Some another note...'
        }
      ]
    }
  ])

  /**
   * Check if the day is a vocation
   *
   * @param {Date} date
   * @returns {Boolean}
   */
  function isVocation(date) {
    return hours.find((item) => _isSameDay(item.date, date))?.isVocation || false
  }

  /**
   * Check if on this day worker is not present
   *
   * @param {Date} date
   * @returns {Boolean}
   */
  function isNotPresent(date) {
    return hours.find((item) => _isSameDay(item.date, date))?.isNotPresent || false
  }

  /**
   * Get hours from day in format HH:MM
   * (with no leading yero in hours and with no minutes if they equal 00)
   *
   * @param {Date} date
   * @returns {String}
   */
  function getHours(date) {
    const _hours = hours.find((item) => _isSameDay(item.date, date))?.hours

    if (!_hours) return false

    return utils.beautifyShortTime(utils.timeToDate(_hours))
  }

  /**
   * Check if two date objects are the same day.
   * Local, not ment to be used outside of this store
   *
   * @param {Date} d1
   * @param {Date} d2
   * @returns {Boolean}
   */
  function _isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  return { current, currentDate, hours, isVocation, isNotPresent, getHours }
})
