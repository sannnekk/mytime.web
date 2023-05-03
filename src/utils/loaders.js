import { Day } from "./Day"

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

    return JSON.parse(data).map(h => Day.fromData(h))
}

/**
 * Function to save hours data to local storage
 * @param {Day[]} hours 
 */
export function saveHoursData(hours) {
    localStorage.setItem('hours', JSON.stringify(hours, (key, value) => {
        if (key.endsWith('Time'))
            return value.toFullString()

        return value
    }))
}