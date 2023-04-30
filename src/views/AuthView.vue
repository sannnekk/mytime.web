<script setup>
import appLogo from '../components/app-logo.vue'
import vInput from '../components/form/v-input.vue'
import vButton from '../components/form/v-button.vue'
import textBlock from '../components/text/text-block.vue'
import vHint from '../components/text/v-hint.vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()

const login = ref('')
const password = ref('')
const error = ref(false)
const loading = ref(false)

const router = useRouter()

async function onLogin() {
  try {
    error.value = false
    loading.value = true

    await userStore.login(login.value, password.value)

    router.push('/')
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth">
    <div class="logo">
      <app-logo />
    </div>
    <div class="hint">
      <text-block>Ein Tool, um die Arbeitszeit zu erfassen</text-block>
    </div>
    <div class="inputs">
      <v-input
        type="text"
        placeholder="Benutzername"
        v-model="login"
        @keyup.enter="onLogin()"
      />
      <v-input
        type="password"
        placeholder="Passwort"
        v-model="password"
        @keyup.enter="onLogin()"
      />
    </div>
    <div
      class="error"
      v-if="error"
    >
      <v-hint type="danger">Benutzername oder Passwort ist falsch</v-hint>
    </div>
    <div class="button">
      <v-button
        primary
        :loading="loading"
        @click="onLogin()"
        >Einloggen</v-button
      >
    </div>
  </div>
</template>

<style scoped>
.auth {
  position: fixed;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  max-width: 90%;
}
.auth .logo {
  font-size: 3.5rem;
}
.auth .inputs > * {
  width: 100%;
  margin-bottom: 0.4em;
}
.auth .button button {
  width: 100%;
  margin-top: 0.5em;
}
</style>
