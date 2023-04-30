<script setup>
import vTitle from '../text/v-title.vue'
import vInput from '../form/v-input.vue'
import vSwitch from '../form/v-switch.vue'
import { computed } from 'vue'

const props = defineProps({
  modelValue: Object
})

const emits = defineEmits(['update:modelValue'])

const state = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})
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
        v-model="state.start"
      />
      <v-input
        type="time"
        label="Ende"
        v-model="state.end"
      />
      <v-input
        type="time"
        label="Pause"
        v-model="state.break"
        :min="state.minBreak"
      />
    </div>
    <div class="row">
      <v-input
        type="time"
        label="Mindestpause"
        v-model="state.minBreak"
        disabled
      />
      <v-input
        type="time"
        label="Gesamte Arbeitszeit"
        v-model="state.hours"
        disabled
      />
      <v-input
        type="time"
        label="Überstunden"
        v-model="state.overHours"
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
