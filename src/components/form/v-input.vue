<script setup>
const props = defineProps({
  type: String,
  placeholder: String,
  modelValue: String
})
const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped>
input {
  border-radius: var(--border-radius);
  border: var(--border);
  padding: 0.7em;
}
input:focus {
  border-color: var(--accent);
}
</style>
