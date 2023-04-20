<script setup>
import appLogo from '../app-logo.vue'
import vButton from '../form/v-button.vue'
import vTitle from '../text/v-title.vue'
</script>

<template>
  <div class="header">
    <div class="logo">
      <app-logo />
    </div>
    <div class="user">
      <v-title>/ Oleksandr Petrushyn</v-title>
    </div>
    <div class="logout">
      <v-button thin>Ausloggen</v-button>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  font-size: 32px;
}
.header .logo {
  margin-right: 0.2em;
}
.header .user > * {
  font-weight: lighter;
}
.header .logout {
  margin-left: 1em;
}
</style>
