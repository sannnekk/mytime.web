<script setup>
import vButton from '../form/v-button.vue'
import { ref } from 'vue'
import { saveJSON, savePDF } from '../../utils/loaders'
import { useUserStore } from '../../stores/user'

// @ts-ignore
/**
 * Props
 */
const props = defineProps({
  value: Object
})

/**
 * Loading
 */
const loadingJSON = ref(false)
const loadingPDF = ref(false)

/**
 * User store
 */
const userStore = useUserStore()

/**
 * Export to JSON
 */
function onJSONExport() {
  loadingJSON.value = true
  setTimeout(() => {
    // @ts-ignore
    saveJSON(props.value?.month, props.value?.year, userStore.user?.name)
    loadingJSON.value = false
  }, 500)
}

/**
 * Export to PDF
 */
function onPDFExport() {
  loadingPDF.value = true
  setTimeout(() => {
    savePDF()
    loadingPDF.value = false
  }, 500)
}
// @ts-ignore
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
    <div class="row no-m">
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
    </div>
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
</style>
