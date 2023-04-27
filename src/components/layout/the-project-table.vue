<script setup>
import vInlineInput from '@/components/form/v-inline-input.vue'
import vButton from '@/components/form/v-button.vue'
import { computed } from 'vue'

const props = defineProps({
  modelValue: Array
})

const emits = defineEmits(['update:modelValue'])

const items = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

function onAddProject() {
  items.value.push({
    projectNumber: '',
    projectPart: '',
    time: '',
    note: ''
  })
}

function onRemoveProject(index) {
  items.value.splice(index, 1)
}
</script>

<template>
  <div class="project-table">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Projekt-#</th>
          <th>Projektteil</th>
          <th>Zeit</th>
          <th>Anmerkung</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(project, index) in items"
          :key="project.id"
        >
          <td class="number">{{ index + 1 }}</td>
          <td class="project-number-col">
            <v-inline-input
              v-model="project.projectNumber"
              placeholder="12345..."
            />
          </td>
          <td class="project-part-col">
            <v-inline-input
              v-model="project.projectPart"
              placeholder="12345..."
            />
          </td>
          <td>
            <v-inline-input
              v-model="project.time"
              type="time"
            />
          </td>
          <td class="note-col">
            <v-inline-input
              v-model="project.note"
              placeholder="Etwas..."
            />
          </td>
          <td class="actions">
            <v-button
              thin
              danger
              @click="onRemoveProject(index)"
            >
              delete
            </v-button>
          </td>
        </tr>
      </tbody>
    </table>
    <v-button
      class="new-button"
      thin
      @click="onAddProject"
      >Neue Zeile hinzufügen</v-button
    >
  </div>
</template>

<style scoped>
table {
  width: 100%;
}
th {
  color: var(--text-dark) !important;
}
td,
th {
  text-align: left;
  padding: 0.2em;
  color: var(--text);
}
thead tr {
  border-bottom: 1px solid var(--text-light);
}
input {
  height: 2.1em;
}
td.note-col input {
  width: 380px;
}
td.number {
  font-weight: bold;
  color: var(--accent);
}
td.project-number-col input {
  width: 80px;
}
td.project-part-col input {
  width: 80px;
}
td.actions button {
  padding: 0.3em;
  width: 100%;
}
.new-button {
  margin-top: 1em;
}
</style>
