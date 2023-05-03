<script setup>
/**
 * Props
 */
defineProps({
  type: String
})
</script>

<template>
  <div
    class="hint"
    :class="type"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.hint {
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  padding: 0.5em 1em;
}
.hint.danger {
  background-color: var(--danger-transparent);
  border-color: var(--danger);
  color: var(--danger);
}
.hint.warning {
  background-color: var(--warning-transparent);
  border-color: var(--warning);
  color: var(--warning);
}
</style>
