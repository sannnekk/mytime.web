import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import { useUtilsStore } from './utils'

export const useTimeStore = defineStore('time', () => {
  // import utility functions from utils store
  const utils = useUtilsStore()

  // currentDate is a reactive ref to the current date hours object from hours array
  const currentDate = ref(new Date())

  // getSample is a function that returns a sample day state that doesn't exist in hours array
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
  
  // current is a computed property that returns the current day state
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

      if (index !== -1) 
        hours[index] = value
      else 
        hours.push(value)
      
    }
  })

  // hours is a reactive array of days states
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

  function isVocation(date) {
    return hours.find((item) => _isSameDay(item.date, date))?.isVocation || false
  }

  function isNotPresent(date) {
    return hours.find((item) => _isSameDay(item.date, date))?.isNotPresent || false
  }
  
  function getHours(date) {
    const _hours = hours.find((item) => _isSameDay(item.date, date))?.hours

    if (!_hours) return false

    return utils.beautifyShortTime(utils.timeToDate(_hours))
  }

  function _isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
  }

  return { current, currentDate, hours, isVocation, isNotPresent, getHours }
})
