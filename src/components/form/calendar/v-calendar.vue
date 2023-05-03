<script setup>
import Datepicker from 'vuejs3-datepicker'
import { Time } from '../../../utils/Time'

/**
 * Props
 */
const props = defineProps({
  modelValue: Date,
  getDayFunction: Function
})

/**
 * Object to emit the event and update the modelValue
 */
const emits = defineEmits([
  'update:modelValue',
  'changed-month',
  'changed-year'
])

/**
 * Function to fill the calendar cell with the date and hours
 * @param {{date: Number, timestamp: Number}} param
 */
function getDayHours({ date, timestamp }) {
  /**
   * @type {import('../../../utils/Day').Day}
   */
  // @ts-ignore
  const day = props.getDayFunction(timestamp)
  let cellContent = `<span class="date">${date}</span>`

  if (!day) return cellContent

  const duration = day.getDuration()

  if (day.isNotPresent)
    cellContent += `<span class="hours not-present">A</span>`
  else if (day.isVocation)
    cellContent += `<span class="hours vocation">U</span>`
  else if (!duration.equals(Time.ZERO))
    cellContent += `<span class="hours">${duration.toShortString()} h</span>`

  return cellContent
}
</script>

<template>
  <div class="calendar">
    <datepicker
      :inline="true"
      :monday-first="true"
      language="de"
      :value="modelValue"
      :day-cell-content="getDayHours"
      @changed-month="emits('changed-month', $event)"
      @changed-year="emits('changed-year', $event)"
      @selected="emits('update:modelValue', $event)"
    />
  </div>
</template>

<style scoped>
.calendar:deep() span.hours {
  color: var(--accent);
  display: block;
  text-align: center;
  font-size: 0.7em;
  font-weight: bold;
  white-space: nowrap;
}
.calendar:deep() span.hours.vocation {
  color: var(--danger);
}
.calendar:deep() span.hours.not-present {
  color: var(--warning);
}
.calendar:deep() .cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.calendar:deep() .cell .date,
.calendar:deep() .cell .hours {
  line-height: 1.2em;
}
.calendar:deep() .vuejs3-datepicker__calendar-topbar {
  background: var(--accent);
}
.calendar:deep() .vuejs3-datepicker__calendar .cell.selected {
  background: var(--accent);
}
.calendar:deep() .vuejs3-datepicker__calendar .cell.selected span.hours {
  color: var(--white);
}
.calendar:deep()
  .vuejs3-datepicker__calendar
  .cell:not(.blank):not(.disabled).day:hover,
.calendar:deep()
  .vuejs3-datepicker__calendar
  .cell:not(.blank):not(.disabled).month:hover,
.calendar:deep()
  .vuejs3-datepicker__calendar
  .cell:not(.blank):not(.disabled).year:hover {
  border: 1px solid var(--accent);
}
.calendar:deep() .vuejs3-datepicker__calendar-actionarea > div {
  margin-top: 2.5em;
}
</style>
