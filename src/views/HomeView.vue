<script setup>
import theHeader from '@/components/layout/the-header.vue'
import vCalendar from '@/components/form/calendar/v-calendar.vue'
import theTimeForm from '@/components/layout/the-time-form.vue'
import theProjectTable from '@/components/layout/the-project-table.vue'
import { useTimeStore } from '@/stores/hours'

const timeStore = useTimeStore()
</script>

<template>
  <div class="wrapper">
    <header>
      <the-header />
    </header>
    <main>
      <div class="calendar">
        <v-calendar
          v-model="timeStore.currentDate"
          :get-day-function="timeStore.getDay"
        />
      </div>
      <div class="form">
        <the-time-form v-model="timeStore.current" />
        <the-project-table v-model="timeStore.current.projects" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  width: 1100px;
  max-width: 95vw;
  margin: 0 auto;
}
header {
  margin-bottom: 2em;
}
main {
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: auto;
}
main .calendar {
  grid-column: 1;
  grid-row: 1;
}
main .form {
  grid-row: 1;
  grid-column: 2;
  margin-left: 2rem;
}
@media screen and (max-width: 800px) {
  main {
    display: block;
  }
}
</style>
