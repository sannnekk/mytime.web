<script setup>
const props = defineProps({
  type: String,
  placeholder: String,
  modelValue: String,
  disabled: Boolean
})
const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    :step="type === 'time' ? 300 : 'any'"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped>
.group label {
  display: block;
  font-size: 0.9em;
  color: var(--text-light);
}
input {
  display: block;
  border-radius: 0;
  border: none;
  border-bottom: var(--border);
  padding: 0.2em 0.7em;
  width: 100%;
  outline: none;
}
.group input:focus {
  border-color: var(--accent);
}
</style>
