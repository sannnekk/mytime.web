import { defineStore } from 'pinia'

export const useUtilsStore = defineStore('utils', () => {
    /*
     * Function to get the minimal break time
     *
     * @param {string} time - time in format hh:mm
     * @return {string} - minimal break time in format hh:mm
     */
    function getMinimalBreak(time) {
        const [h] = time.split(':')
        const hours = parseInt(h)

        if (hours >= 9) 
            return '00:45'
        else if (hours >= 6) 
            return '00:30'
            
        return '00:00'
    }

    /* 
     * Function to convert time string to date
     *
     * @param {string} - time string in format hh:mm
     * @return {Date} - date object from it
     */
    function timeToDate(time) {
        return new Date(1970, 1, 1, time.split(':')[0], time.split(':')[1])
    }

    /* 
     * Function to get the difference between two dates
     *
     * @param {string} h1 - first Date as string
     * @param {string} h2 - second Date as string
     * @return {Date} - difference between two dates
     */
    function getDayHours(h1, h2) {
        const d1 = timeToDate(h1)
        const d2 = timeToDate(h2)

        // subtract 1 hour to get the correct time difference because of fucking unix standard
        return new Date(d2.getTime() - d1.getTime() - 3600000)
    }

    /*
     * Function to beautify time
     *
     * @param {Date} time - time as Date object
     * @return {string} - time in format hh:mm
     */
    function beutifyTime(time) {
        const h = time.getHours().toString()
        const m = time.getMinutes().toString()
        const hours = h.length === 1 ? '0' + h : h
        const minutes = m.length === 1 ? '0' + m : m
        return hours + ':' + minutes
    }

    /*
     * Function to beautify time
     *
     * @param {Date} time - time as Date object
     * @return {string} - time in format hh:mm
     */
    function beautifyShortTime(time) {
        const hours = time.getHours().toString()
        const m = time.getMinutes().toString()
        const minutes = m.length === 1 ? '0' + m : m
        return m > 0 ? `${hours}:${minutes}` : hours
    }

    return {
        getMinimalBreak,
        getDayHours,
        beutifyTime,
        beautifyShortTime,
        timeToDate
    }
})