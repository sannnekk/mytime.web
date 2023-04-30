<script setup>
import appLogo from '../app-logo.vue'
import vButton from '../form/v-button.vue'
import vTitle from '../text/v-title.vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="header">
    <div class="logo">
      <app-logo />
    </div>
    <div class="user">
      <v-title>Oleksandr Petrushyn</v-title>
    </div>
    <div class="logout">
      <v-button
        thin
        @click="userStore.logout()"
        >Ausloggen</v-button
      >
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32px;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--text-light);
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
