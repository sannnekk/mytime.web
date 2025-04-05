<script setup>
// @ts-ignore
/**
 * Props
 */
defineProps({
  value: Object
})
</script>

<template>
  <div class="month-summary">
    <div class="row">
      <div class="col-first">Monatliche Stunden:</div>
      <div class="col-second align-right">
        {{ value?.hours.toShortString() ?? '00:00' }} h
      </div>
    </div>
    <div class="row">
      <div class="col-first">Monatliche Überstunden:</div>
      <div class="col-second align-right">
        {{ value?.overHours.toShortString() ?? '00:00' }} h
      </div>
    </div>
    <div class="row">
      <p class="hint">
        Überstunden-Rechnung geht davon aus, dass es 4 Stunden am Tag (20
        Stunden pro Woche) gearbeitet wird.
      </p>
    </div>
    <!--<div class="row no-m">
      <v-button
        thin
        @click="onJSONExport()"
        :loading="loadingJSON"
      >
        Export JSON
      </v-button>
      <v-button
        thin
        @click="onPDFExport()"
        :loading="loadingPDF"
      >
        Export PDF
      </v-button>
    </div>-->
  </div>
</template>

<style scoped>
.month-summary {
  padding: 1em 0;
}
.row {
  display: flex;
  padding: 0.2em 1em;
  color: var(--text);
}
.row.no-m {
  margin: 0;
  padding: 0;
  justify-content: space-between;
}
.row.no-m > * {
  margin-top: 0.5em;
  width: 48%;
}
.row .col-first {
  width: 75%;
}
.row .col-second {
  width: 25%;
}
.align-right {
  text-align: right;
}
.row .hint {
  font-size: 0.8em;
  color: var(--text-light);
  margin-top: 0.5em;
}
</style>
