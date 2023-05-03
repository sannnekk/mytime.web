import { Day } from './Day'

/**
 * Load the hour data of the month and year passed as parameters from local storage
 * @param {number} month
 * @param {number} year
 * @returns {Day[]}
 */
export function loadHoursData(
  month = new Date().getMonth(),
  year = new Date().getFullYear()
) {
  const data = localStorage.getItem('hours')
  if (!data) return [new Day()]

  // for lint, remove later
  new String(month + year)

  return JSON.parse(data).map((h) => Day.fromData(h))
}

/**
 * Function to save hours data to local storage
 * @param {Day[]} hours
 */
export function saveHoursData(hours) {
  localStorage.setItem(
    'hours',
    JSON.stringify(hours, (key, value) => {
      if (key.endsWith('Time')) return value.toFullString()

      return value
    })
  )
}

/**
 * Save json from localStorage
 */
export function saveJSON() {
  const json = localStorage.getItem('hours')
  const a = document.createElement('a')
  const fileName = `export.json`.toLowerCase()
  // @ts-ignore
  const file = new Blob([json], { type: 'text/plain' })

  a.href = URL.createObjectURL(file)
  a.setAttribute('download', fileName)

  a.click()
}

/**
 * Export PDF file
 * @param {String} monthName 
 * @param {String} year 
 * @param {String} userName 
 */
export function savePDF(monthName, year, userName) {
  const fileName = `${monthName}_${year}_${userName.replace(
    ' ',
    '_'
  )}.json`.toLowerCase()
  return fileName
}
