<script setup>
/**
 * Props
 */
defineProps({
  center: Boolean
})
</script>

<template>
  <p :class="{ center }"><slot></slot></p>
</template>

<style scoped>
p {
  padding: 1em 0;
  color: var(--text-light);
}
p.center {
  text-align: center;
}
</style>
