<script setup>
import { computed } from 'vue'

const props = defineProps({
  primary: String,
  secondary: String,
  time: String
})

const h = computed(() => parseInt((props.time ?? '00:00').split(':')[0]) / 12)
const m = computed(() => parseInt((props.time ?? '00:00').split(':')[1]) / 60)
</script>

<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 384 384"
    xml:space="preserve"
  >
    <g>
      <circle
        class="iconic-clock-frame"
        cx="192"
        cy="192"
        r="172"
        fill="#ffffff"
        stroke="#000000"
        stroke-width="35"
      ></circle>
      <line
        class="iconic-clock-hour-hand"
        id="iconic-anim-clock-hour-hand"
        fill="none"
        stroke="#000000"
        stroke-width="30"
        stroke-miterlimit="10"
        x1="192"
        y1="192"
        x2="192"
        y2="87.5"
        :transform="`rotate(${h * 360} 192 192)`"
      />
      <line
        class="iconic-clock-minute-hand"
        id="iconic-anim-clock-minute-hand"
        fill="none"
        stroke="#000000"
        stroke-width="30"
        stroke-miterlimit="10"
        x1="192"
        y1="192"
        x2="192"
        y2="54"
        :transform="`rotate(${m * 360} 192 192)`"
      />
      <circle
        class="iconic-clock-axis"
        cx="192"
        cy="192"
        r="15"
      />
    </g>
  </svg>
</template>

<style scoped>
.iconic-clock-frame {
  fill: v-bind(secondary);
}

.iconic-clock-frame,
.iconic-clock-hour-hand,
.iconic-clock-minute-hand,
.iconic-clock-frame {
  stroke: v-bind(primary);
}
.iconic-clock-axis {
  fill: v-bind(primary);
}
</style>
