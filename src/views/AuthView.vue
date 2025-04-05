<script setup>
import appLogo from '../components/app-logo.vue'
import vInput from '../components/form/v-input.vue'
import vButton from '../components/form/v-button.vue'
import textBlock from '../components/text/text-block.vue'
import vHint from '../components/text/v-hint.vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { registerUser, changeUserPassword } from '../utils/loaders.js'

const userStore = useUserStore()

const login = ref({
  username: '',
  password: '',
  error: false
})
const registration = ref({
  name: '',
  username: '',
  password: '',
  error: false
})
const passwordChange = ref({
  username: '',
  oldPassword: '',
  newPassword: '',
  error: false
})

const loading = ref(false)
const mode = ref('login')

const router = useRouter()

async function onLogin() {
  try {
    login.value.error = false
    loading.value = true

    await userStore.login(login.value.username, login.value.password)

    if (userStore.user.role === 'admin') {
      router.push('/users')
    } else {
      router.push(`/user/${userStore.user.id}`)
    }
  } catch (e) {
    console.log('Error logging in:', e)
    login.value.error = true
  } finally {
    loading.value = false
  }
}

async function onRegister() {
  try {
    registration.value.error = false
    loading.value = true

    await registerUser(
      registration.value.username,
      registration.value.password,
      registration.value.name
    )

    alert('Registrierung erfolgreich! Bitte einloggen.')
    mode.value = 'login'
  } catch (e) {
    console.log('Error registering user:', e)
    registration.value.error = true
  } finally {
    loading.value = false
  }
}

async function onPasswordChange() {
  try {
    passwordChange.value.error = false
    loading.value = true

    await changeUserPassword(
      passwordChange.value.username,
      passwordChange.value.oldPassword,
      passwordChange.value.newPassword
    )

    alert('Passwort erfolgreich geändert! Bitte einloggen.')
    mode.value = 'login'
  } catch (e) {
    console.log('Error changing password:', e)
    passwordChange.value.error = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth">
      <div class="logo">
        <app-logo />
      </div>
      <div class="hint">
        <text-block center>Ein Tool, um die Arbeitszeit zu erfassen</text-block>
      </div>
      <div
        class="inputs login"
        v-if="mode === 'login'"
      >
        <v-input
          type="text"
          placeholder="Benutzername"
          v-model="login.username"
          @keyup.enter="onLogin()"
        />
        <v-input
          type="password"
          placeholder="Passwort"
          v-model="login.password"
          @keyup.enter="onLogin()"
        />
      </div>
      <div
        class="register inputs"
        v-else-if="mode === 'register'"
      >
        <v-input
          type="text"
          placeholder="Name"
          v-model="registration.name"
          @keyup.enter="onRegister()"
        />
        <v-input
          type="text"
          placeholder="Benutzername"
          v-model="registration.username"
          @keyup.enter="onRegister()"
        />
        <v-input
          type="password"
          placeholder="Passwort"
          v-model="registration.password"
          @keyup.enter="onRegister()"
        />
      </div>
      <div
        class="password-change inputs"
        v-else-if="mode === 'passwordChange'"
      >
        <v-input
          type="text"
          placeholder="Benutzername"
          v-model="passwordChange.username"
          @keyup.enter="onPasswordChange()"
        />
        <v-input
          type="password"
          placeholder="Altes Passwort"
          v-model="passwordChange.oldPassword"
          @keyup.enter="onPasswordChange()"
        />
        <v-input
          type="password"
          placeholder="Neues Passwort"
          v-model="passwordChange.newPassword"
          @keyup.enter="onPasswordChange()"
        />
      </div>
      <div
        class="error"
        v-if="login.error"
      >
        <v-hint type="danger">Benutzername oder Passwort ist falsch</v-hint>
      </div>
      <div
        class="error"
        v-if="registration.error"
      >
        <v-hint type="danger">Dieser Benutzername ist schon vergeben</v-hint>
      </div>
      <div
        class="error"
        v-if="passwordChange.error"
      >
        <v-hint type="danger">Das Passwort konnte nicht geändert werden</v-hint>
      </div>
      <div class="button">
        <v-button
          :primary="mode === 'login'"
          :thin="mode !== 'login'"
          :loading="loading"
          @click="mode === 'login' ? onLogin() : (mode = 'login')"
        >
          Einloggen
        </v-button>
      </div>
      <div class="button">
        <v-button
          :primary="mode === 'register'"
          :thin="mode !== 'register'"
          :loading="loading"
          @click="mode === 'register' ? onRegister() : (mode = 'register')"
        >
          Registrieren
        </v-button>
      </div>
      <div class="button">
        <v-button
          :primary="mode === 'passwordChange'"
          :thin="mode !== 'passwordChange'"
          :loading="loading"
          @click="
            mode === 'passwordChange'
              ? onPasswordChange()
              : (mode = 'passwordChange')
          "
        >
          Passwort ändern
        </v-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
}
.auth {
  width: 400px;
  max-width: 90%;
}
.auth .logo {
  font-size: 2.3em;
  justify-content: center;
  display: flex;
}
.auth .inputs > * {
  width: 100%;
  margin-bottom: 0.4em;
}
.auth .button button {
  width: 100%;
  margin-top: 0.5em;
}
@media screen and (max-width: 600px) {
  .auth .logo {
    font-size: 1.8em;
  }
}
</style>
