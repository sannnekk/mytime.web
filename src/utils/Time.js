/**
 * Time class to work with time (substraction, beautifying, etc)
 */
export class Time {
  /**
   * Intended for internal use only. Can't be private due to Proxy limitations
   * @type {String}
   */
  _time

  set value(value) {
    this._time = value
  }

  get value() {
    return this._time
  }

  static get ZERO() {
    return new Time()
  }

  /**
   * Default constructor
   * @param {String | number | null} time string time or number of minutes
   */
  constructor(time = null) {
    if (typeof time === 'number') {
      const h = Math.floor(time / 60)
      const m = time % 60 < 10 ? `0${time % 60}` : time % 60
      this._time = `${h < 10 ? '0' + h : h}:${m}`
    } else if (typeof time === 'string') {
      this._time = time ?? '00:00'
    } else {
      this._time = '00:00'
    }
  }

  /**
   * Create new instance from date object
   * @param {Date} date
   * @returns {Time}
   */
  static fromDate(date) {
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()

    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

    return new Time(`${hours}:${minutes}`)
  }

  /**
   * Get difference between some Time objects
   * @param {...Time} times
   * @returns {Time}
   */
  getDifferrence(...times) {
    const time = times.reduce(
      (acc, time) => acc - this._timeToNumber(time),
      this._timeToNumber(this)
    )

    return this._numberToTime(time)
  }

  /**
   * Add time
   * @param {Time} time
   */
  add(time) {
    return this._numberToTime(
      this._timeToNumber(this) + this._timeToNumber(time)
    )
  }

  /**
   * Check if time is negative
   * @returns {Boolean}
   */
  isNegative() {
    return this._timeToNumber(this) < 0
  }

  /**
   * Overriding JS's toString method
   * @returns {String}
   */
  toFullString() {
    return this._time
  }

  /**
   * Get short time string
   * (without leading zero in hours and without minutes if they equal 00)
   * @returns {String}
   */
  toShortString() {
    const [hours, minutes] = this._time.split(':')
    return +minutes === 0 ? `${+hours}` : `${+hours}:${minutes}`
  }

  /**
   * Compare time with another time
   * @param {Time} time
   * @returns {Boolean}
   */
  lessOrEqual(time) {
    return this._timeToNumber(this) <= this._timeToNumber(time)
  }

  /**
   * Check if time equals another time
   * @param {Time} time
   * @returns {Boolean}
   */
  equals(time) {
    return this._timeToNumber(this) === this._timeToNumber(time)
  }

  /**
   * Get time from Time to number in minutes
   * @param {Time} time
   * @returns {number}
   */
  _timeToNumber(time) {
    return time
      .toFullString()
      .split(':')
      .reduce((acc, time) => 60 * acc + +time, 0)
  }

  /**
   * Convert number to time string
   * @param {Number} number
   * @returns {Time}
   */
  _numberToTime(number) {
    let minus = ''

    if (number < 0) {
      number = -number
      minus = '-'
    }

    let hours = Math.floor(number / 60)
    let minutes = number % 60

    // @ts-ignore
    if (hours < 10) hours = `0${hours}`
    // @ts-ignore
    if (minutes < 10) minutes = `0${minutes}`

    return new Time(`${minus}${hours}:${minutes}`)
  }
}
