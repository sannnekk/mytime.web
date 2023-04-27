<script setup>
const props = defineProps({
  type: String,
  placeholder: String,
  modelValue: String,
  label: String,
  disabled: Boolean,
  min: String
})
const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="group">
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :step="type === 'time' ? 300 : 'any'"
      :min="min"
      @input="$emit('update:modelValue', $event.target.value)"
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
}
.group input:focus {
  border-color: var(--accent);
}
</style>
