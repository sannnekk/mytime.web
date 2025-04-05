<script setup>
import appLogo from '../app-logo.vue'
import vButton from '../form/v-button.vue'
import vTitle from '../text/v-title.vue'
import { useUserStore } from '../../stores/user'
import { useTimeStore } from '../../stores/hours'
import { ref } from 'vue'

defineProps({
  name: String,
  noBackButton: Boolean
})

const userStore = useUserStore()
const timeStore = useTimeStore()

const saveLoading = ref(false)

async function onLogoutClick() {
  await userStore.logout()
  window.location.reload()
}

async function onSaveClick() {
  saveLoading.value = true

  await timeStore.saveHours()

  saveLoading.value = false
}
</script>

<template>
  <div class="header">
    <div class="logo">
      <app-logo />
    </div>
    <div class="user">
      <v-title>{{ name ?? timeStore.user?.name }}</v-title>
    </div>
    <div class="actions">
      <v-button
        thin
        success
        @click="onSaveClick()"
        :loading="saveLoading"
        >Speichern</v-button
      >
      <v-button
        thin
        danger
        @click="onLogoutClick()"
      >
        Ausloggen
      </v-button>
    </div>
  </div>
  <div
    class="back-button-container"
    v-if="userStore.user?.role === 'admin' && !noBackButton"
  >
    <router-link
      to="/users"
      class="back-button"
    >
      <v-button thin>Zurück</v-button>
    </router-link>
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
.header .actions {
  display: flex;
  align-items: center;
  gap: 0.2em;
  margin-top: 10px;
}
.back-button-container {
  padding: 0.5em 0;
}
.back-button .back-button {
  display: block;
  text-decoration: none;
  color: inherit;
}
</style>
