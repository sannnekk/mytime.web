<script setup>
import Datepicker from 'vuejs3-datepicker'

const props = defineProps({
  modelValue: Date,
  isVocationFunction: Function,
  isNotPresentFunction: Function,
  getHoursFunction: Function
})

const emits = defineEmits(['update:modelValue'])

function getDayHours({ date, timestamp }) {
  let cellContent = `<span class="date">${date}</span>`
  const dateObject = new Date(timestamp)

  if (props.isNotPresentFunction(dateObject))
    cellContent += `<span class="hours not-present">A</span>`
  else if (props.isVocationFunction(dateObject))
    cellContent += `<span class="hours vocation">U</span>`
  else if (props.getHoursFunction(dateObject) && props.getHoursFunction(dateObject) !== '0')
    cellContent += `<span class="hours">${props.getHoursFunction(dateObject)} h</span>`

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
</style>
