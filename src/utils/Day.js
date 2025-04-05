import { Project } from './Project'
import { Time } from './Time'
import { v4 as uuid } from 'uuid'

export class Day {
  _id
  _date
  _isVocation
  _isNotPresent
  _isHomeOffice
  _startTime
  _endTime
  _breakTime
  _projects

  constructor(date = new Date()) {
    this._id = uuid()
    this._date = date
    this._isVocation = false
    this._isNotPresent = false
    this._isHomeOffice = false
    this._startTime = new Time()
    this._endTime = new Time()
    this._breakTime = new Time()
    this._projects = []
  }

  /**
   * Create day object from data
   * @param {Partial<Day>} data
   * @returns {Day}
   */
  static fromData(data) {
    const day = new Day()

    day.assign(data)

    // @ts-ignore
    day._date = new Date(data._date)

    if (data._projects)
      day.projects = data._projects?.map((p) => Project.fromData(p)) ?? []
    else day.projects = data.projects?.map((p) => Project.fromData(p)) ?? []

    if (data.start && '_time' in data.start) day.start = data.start
    else day.start = new Time()

    if (data.end && '_time' in data.end) day.end = data.end
    else day.end = new Time()

    if (data.break && '_time' in data.break) day.break = data.break
    else day.break = new Time()

    // for json conversion
    if (data._breakTime)
      // @ts-ignore
      day._breakTime = new Time(data._breakTime._time)

    if (data._startTime)
      // @ts-ignore
      day._startTime = new Time(data._startTime._time)

    if (data._endTime)
      // @ts-ignore
      day._endTime = new Time(data._endTime._time)

    return day
  }

  /**
   * Fast way to set all or only some properties
   * @param {Partial<Day>} obj
   */
  assign(obj) {
    // add underscores to keys to make the assignment possible
    obj = Object.keys(obj).reduce(
      (acc, key) => (
        (acc[key.startsWith('_') ? key : `_${key}`] = obj[key]), acc
      ),
      {}
    )
    Object.assign(this, obj)
  }

  get isToday() {
    const today = new Date()
    return (
      this._date.getDate() === today.getDate() &&
      this._date.getMonth() === today.getMonth() &&
      this._date.getFullYear() === today.getFullYear()
    )
  }

  /**
   * Calculate minimal allowed break time
   * @returns {Time} minimal allowed break time
   */
  getMinBreak() {
    const duration = this.getDuration()

    switch (true) {
      case duration.lessOrEqual(new Time('06:00')):
        return new Time('00:00')
      case duration.lessOrEqual(new Time('09:00')):
        return new Time('00:30')
      default:
        return new Time('00:45')
    }
  }

  /**
   * Get duration of the working day
   * @returns {Time} duration of the working day
   */
  getDuration() {
    return this._endTime.getDifferrence(this._startTime, this._breakTime)
  }

  /**
   * Get over hours
   * @returns {Time} over hours
   */
  getOverHours() {
    return this.getDuration().getDifferrence(new Time('04:00'))
  }

  /**
   * Check if days are on the same date
   * @param {Day} day
   * @returns {Boolean}
   */
  isSameDay(day) {
    return this.isOnDate(day.date)
  }

  /**
   * Check if the day is in the given month
   * @param {number} monthIndex
   * @param {number} year
   * @returns {Boolean}
   */
  isInMonth(monthIndex, year = new Date().getFullYear()) {
    return (
      this._date.getMonth() === monthIndex && this._date.getFullYear() === year
    )
  }

  /**
   * Check if day is on that date
   * @param {Date} date
   * @returns {Boolean}
   */
  isOnDate(date) {
    return (
      this._date.getDate() === date.getDate() &&
      this._date.getMonth() === date.getMonth() &&
      this._date.getFullYear() === date.getFullYear()
    )
  }

  //#region  Getters and Setters

  get id() {
    return this._id
  }

  get date() {
    return this._date
  }

  get isVocation() {
    return this._isVocation
  }

  set isVocation(value) {
    this._isVocation = value
  }

  get isNotPresent() {
    return this._isNotPresent
  }

  set isNotPresent(value) {
    this._isNotPresent = value
  }

  get isHomeOffice() {
    return this._isHomeOffice
  }

  set isHomeOffice(value) {
    this._isHomeOffice = value
  }

  get start() {
    return this._startTime
  }

  set start(value) {
    this._startTime = value
  }

  get end() {
    return this._endTime
  }

  set end(value) {
    this._endTime = value
  }

  get break() {
    return this._breakTime
  }

  set break(value) {
    this._breakTime = value
  }

  get projects() {
    return this._projects
  }

  set projects(value) {
    this._projects = value
  }

  //#endregion
}
