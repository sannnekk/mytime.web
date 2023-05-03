<script setup>
import appLogo from '../app-logo.vue'
import vButton from '../form/v-button.vue'
import vTitle from '../text/v-title.vue'
import { useUserStore } from '../../stores/user'
import { useTimeStore } from '../../stores/hours'
import { saveHoursData } from '../../utils/loaders'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const timeStore = useTimeStore()

const router = useRouter()

const saveLoading = ref(false)

function onLogoutClick() {
  userStore.logout()
  router.push('/auth')
}

function onSaveClick() {
  saveLoading.value = true

  setTimeout(() => {
    saveHoursData(timeStore.hours)
    saveLoading.value = false
  }, 500)
}
</script>

<template>
  <div class="header">
    <div class="logo">
      <app-logo />
    </div>
    <div class="user">
      <v-title>Oleksandr Petrushyn</v-title>
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
</style>
