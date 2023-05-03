<script setup>
import vTitle from '../text/v-title.vue'
import vInput from '../form/v-input.vue'
import vSwitch from '../form/v-switch.vue'
import { computed } from 'vue'

/**
 * Props
 */
const props = defineProps({
  modelValue: Object
})

/**
 * Emits
 */
const emits = defineEmits(['update:modelValue'])

/**
 * Vue model state
 * @type {import('vue').WritableComputedRef<import('../../utils/Day').Day>}
 */
const state = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

/**
 * Computed
 */
const minimalBreak = computed(() => state.value.getMinBreak())
const wholeTime = computed(() => state.value.getDuration())
const overHours = computed(() => state.value.getOverHours())
</script>

<template>
  <div class="time-form">
    <div class="title">
      <v-title small>Tägliche Arbeitszeit erfassen</v-title>
    </div>
    <div class="row">
      <v-switch v-model="state.isVocation" />
      <p>Ist Urlaub</p>
      <v-switch v-model="state.isNotPresent" />
      <p>Aus sonstigem Grund nicht anwesend</p>
    </div>
    <div class="row">
      <v-input
        type="time"
        label="Start"
        v-model="state.start.value"
      />
      <v-input
        type="time"
        label="Ende"
        v-model="state.end.value"
        :is-error="state.isEndTimeError"
      />
      <v-input
        type="time"
        label="Pause"
        v-model="state.break.value"
        :min="minimalBreak.toFullString()"
        :is-error="state.isPauseError"
      />
    </div>
    <div class="row">
      <v-input
        type="time"
        label="Mindestpause"
        :value="minimalBreak.value"
        disabled
      />
      <v-input
        type="time"
        label="Gesamte Arbeitszeit"
        :value="wholeTime.value"
        disabled
      />
      <v-input
        type="time"
        label="Überstunden"
        :value="overHours.value"
        allow-negative
        disabled
      />
    </div>
  </div>
</template>

<style scoped>
.time-form .title {
  margin: 1rem 0;
}
.time-form .switch {
  margin-right: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
}
.time-form .group {
  margin: 0.3em;
  width: 150px;
}
.time-form .row {
  display: flex;
}
</style>
