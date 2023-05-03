<script setup>
import { computed } from 'vue'

/**
 * Props
 */
const props = defineProps({
  modelValue: Boolean
})

/**
 * Emits
 */
const emits = defineEmits(['update:modelValue'])

/**
 * State
 */
const switchState = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})
</script>

<template>
  <label
    class="switch"
    :class="{ on: switchState, off: !switchState }"
  >
    <div class="switch__button"></div>
    <input
      type="checkbox"
      v-model="switchState"
    />
  </label>
</template>

<style scoped>
.switch {
  display: block;
  position: relative;
  width: 3em;
  height: 1.5em;
  border-radius: 1em;
  background-color: var(--text-light);
  cursor: pointer;
}
.switch.on {
  background-color: var(--accent);
}
.switch__button {
  position: absolute;
  top: 0.1em;
  left: 0.1em;
  width: 1.3em;
  height: 1.3em;
  border-radius: 1em;
  background-color: var(--white);
  transition: all 0.2s ease;
}
.switch.on .switch__button {
  left: 1.6em;
}
.switch input {
  display: none;
}
</style>
