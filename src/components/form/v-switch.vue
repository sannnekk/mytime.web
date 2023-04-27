<script setup>
const props = defineProps({
  modelValue: Boolean
})
const emits = defineEmits(['update:modelValue'])

function onClick() {
  emits('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div
    class="switch"
    :class="modelValue ? 'on' : 'off'"
    @click="onClick()"
  >
    <div class="switch__button"></div>
  </div>
</template>

<style scoped>
.switch {
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
  left: 1.7em;
}
</style>
