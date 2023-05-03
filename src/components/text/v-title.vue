<script setup>
/**
 * Props
 */
defineProps({
  small: Boolean
})
</script>

<template>
  <h2 v-if="!small"><slot></slot></h2>
  <h3 v-else><slot></slot></h3>
</template>

<style scoped>
h2,
h3 {
  color: var(--text);
}
</style>
