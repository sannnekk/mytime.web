<script setup>
import vTimeIcon from '../utils/v-time-icon.vue'
import { computed, reactive } from 'vue'
import { vMaska } from 'maska'

// @ts-ignore
/**
 * Props
 */
const props = defineProps({
  type: String,
  placeholder: String,
  modelValue: String,
  value: String,
  label: String,
  disabled: Boolean,
  min: String,
  isError: Boolean,
  allowNegative: Boolean
})

/**
 * Emits
 */
const emits = defineEmits(['update:modelValue'])

/**
 * v-model
 */
const model = computed({
  get: () => props.modelValue ?? props.value,
  set: (value) => {
    // @ts-ignore
    if (props.type === 'time' && !mask.completed) return

    emits('update:modelValue', value)
  }
})

/**
 * Mask
 * @type {import('maska').MaskaDetail}
 */
// @ts-ignore
const mask = reactive({})
const maskOptions = reactive({
  eager: false,
  mask:
    props.type === 'time'
      ? (value) =>
          value.startsWith('-') && props.allowNegative ? '-##:##' : '##:##'
      : null
})
// @ts-ignore
</script>

<template>
  <div class="group">
    <label>{{ label }}</label>
    <input
      :class="{ error: isError || (type === 'time' && !mask.completed) }"
      :type="type === 'time' ? 'text' : type"
      :placeholder="placeholder"
      :disabled="disabled"
      :step="type === 'time' ? 300 : 'any'"
      :min="min"
      v-maska:[maskOptions]="mask"
      v-model="model"
    />
    <v-time-icon
      v-if="type === 'time'"
      primary="#000"
      secondary="#fff"
      :time="model"
      class="time-icon"
    />
  </div>
</template>

<style scoped>
.group label {
  display: block;
  font-size: 0.9em;
  color: var(--text-light);
}
.group input {
  display: block;
  border-radius: var(--border-radius);
  border: var(--border);
  padding: 0.7em;
  width: 100%;
  outline: none;
}
.group input:not(:disabled).error {
  border-color: var(--danger) !important;
  color: var(--danger);
}
.group input:focus {
  border-color: var(--accent);
}
.group .time-icon {
  position: absolute;
  bottom: 0.4em;
  right: 0.4em;
  width: 1.4em;
  height: 1.4em;
}
</style>
