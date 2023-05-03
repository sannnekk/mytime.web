<script setup>
import 'animate.css'
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :duration="250"
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__bounceOutDown"
    >
      <component
        :is="Component"
        :key="route.path"
      />
    </transition>
  </router-view>
</template>

<style scoped></style>
