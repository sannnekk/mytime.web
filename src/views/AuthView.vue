<script setup>
import appLogo from '../components/app-logo.vue'
import vInput from '../components/form/v-input.vue'
import vButton from '../components/form/v-button.vue'
import textBlock from '../components/text/text-block.vue'
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
      />
      <v-input
        type="password"
        placeholder="Passwort"
      />
    </div>
    <div class="button">
      <v-button primary>Einloggen</v-button>
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
}
</style>
