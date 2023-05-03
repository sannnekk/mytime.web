<script setup>
import vLoader from '../utils/v-loader.vue'

const props = defineProps({
  primary: Boolean,
  thin: Boolean,
  danger: Boolean,
  loading: Boolean,
  success: Boolean
})
</script>

<template>
  <button :class="{ primary, thin, danger, success }">
    <v-loader
      class="loader"
      v-if="loading"
    />
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
button {
  border-radius: var(--border-radius);
  border: none;
  outline: none;
  background-color: var(--text-dark);
  padding: 1em;
  color: var(--white);
  cursor: pointer;
  font-weight: bolder;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
}
button:hover {
  background-color: var(--text);
}
button.primary {
  background-color: var(--accent);
}
button.primary:hover {
  background-color: var(--text-dark);
}
button.thin {
  border: 1px solid var(--text);
  color: var(--text);
  background-color: transparent;
}
button.thin:hover {
  background-color: var(--text);
  color: var(--white);
}
button.primary.thin {
  border: 1px solid var(--accent);
  color: var(--accent);
  background-color: transparent;
}
button.danger {
  border-color: var(--danger) !important;
  color: var(--danger) !important;
}
button.danger:hover {
  background-color: var(--danger) !important;
  color: var(--white) !important;
}
button.success {
  border-color: var(--success) !important;
  color: var(--success) !important;
}
button.success:hover {
  background-color: var(--success) !important;
  color: var(--white) !important;
}
button .loader {
  height: 1.4em;
  margin-right: 0.6em;
}
</style>
