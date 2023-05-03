import { Time } from './Time'
import { v4 as uuid } from 'uuid'

/**
 * Project class
 */
export class Project {
    _id
    _number
    _part
    _title
    _projectTime
    _note

    constructor() {
        this._id = uuid()
        this._number = ''
        this._part = ''
        this._title = ''
        this._projectTime = new Time()
        this._note = ''
    }

    /**
     * Fast way to set all or only some properties
     * @param {Partial<Project>} obj 
     */
    assign(obj) {
        // add underscores to keys to make the assignment possible
        obj = Object.keys(obj).reduce((acc, key) => (
            acc[key.startsWith('_') 
                ? key 
                : `_${key}`
            ] = obj[key], acc
        ), {})
        Object.assign(this, obj)
    }

    /**
     * Project factory method
     * @param {Partial<Project>} data 
     * @returns {Project}
     */
    static fromData(data) {
        const project = new Project()
        project.assign(data)

        if (data._projectTime && typeof data._projectTime === 'string') {
            project.time = new Time(data._projectTime)
        } else {
            project.time = new Time()
        }

        return project
    }

    //#region Getters and Setters

    get id () {
        return this._id
    }

    set id (value) {
        this._id = value
    }

    get number () {
        return this._number
    }

    set number (value) {
        this._number = value
    }

    get part () {
        return this._part
    }

    set part (value) {
        this._part = value
    }

    get title () {
        return this._title
    }

    set title (value) {
        this._title = value
    }

    get time () {
        return this._projectTime
    }

    set time (value) {
        this._projectTime = value
    }

    get note () {
        return this._note
    }

    set note (value) {
        this._note = value
    }

    //#endregion
}