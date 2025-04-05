<script setup>
import theHeader from '../components/layout/the-header.vue'
import vButton from '../components/form/v-button.vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

userStore.getAllUsers()
</script>

<template>
  <div class="header">
    <the-header
      :name="userStore.user?.name"
      no-back-button
    />
  </div>
  <div class="users-container">
    <div class="users">
      <h2>Benutzer:</h2>
      <table class="user-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Benutzername</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in userStore.users"
            :key="user.id"
          >
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.role === 'admin' ? 'Administrator' : 'Arbeiter' }}</td>
            <td>
              <router-link
                :to="`/user/${user.id}`"
                class="link"
                v-if="user.role === 'user'"
              >
                <v-button
                  thin
                  primary
                >
                  Stunden ansehen
                </v-button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 1100px;
  max-width: 95vw;
  margin: 0 auto;
}
.users-container {
  width: 1100px;
  max-width: 95vw;
  margin: 0 auto;
}
.users {
  width: 100%;
}
.users table {
  margin-top: 2em;
  width: 100%;
  border-collapse: collapse;
}
.users thead {
  border-bottom: 1px solid var(--text-light);
}
.users table th {
  text-align: left;
  padding: 0.5em;
  color: var(--text);
}
.users table td {
  padding: 0.5em;
  color: var(--text);
}
.users .link {
  text-decoration: none;
  color: inherit;
}
</style>
