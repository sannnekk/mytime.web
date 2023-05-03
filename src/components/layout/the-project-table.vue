<script setup>
import vInlineInput from '@/components/form/v-inline-input.vue'
import vInput from '@/components/form/v-input.vue'
import vButton from '@/components/form/v-button.vue'
import { computed } from 'vue'
import { Project } from '@/utils/Project'

/**
 * Props
 */
const props = defineProps({
  modelValue: Array
})

/**
 * Emits
 */
const emits = defineEmits(['update:modelValue'])

/**
 * Vue model state
 */
const items = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

/**
 * Add new project
 */
function onAddProject() {
  items.value.push(new Project())
}

/**
 * Remove project
 * @param {number} index
 */
function onRemoveProject(index) {
  items.value.splice(index, 1)
}
</script>

<template>
  <div class="project-table">
    <p
      class="no-projects"
      v-if="items.length === 0"
    >
      Noch keine Projekte hinzugefügt
    </p>
    <table>
      <thead>
        <tr v-if="items.length">
          <th></th>
          <th>Projekt-#</th>
          <th>Name</th>
          <th>Zeit</th>
          <th>Anmerkung</th>
          <th></th>
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
              v-model="project.number"
              placeholder="12345..."
            />
          </td>
          <td class="project-part-col">
            <v-inline-input
              v-model="project.title"
              placeholder="Projekt..."
            />
          </td>
          <td>
            <v-input
              v-model="project.time.value"
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
              Löschen
            </v-button>
          </td>
        </tr>
      </tbody>
    </table>
    <v-button
      class="new-button"
      thin
      @click="onAddProject"
      >Projekt hinzufügen</v-button
    >
  </div>
</template>

<style scoped>
p.no-projects {
  color: var(--text-light);
  font-size: 0.9em;
  margin-top: 1em;
}
table {
  width: 100%;
}
th {
  color: var(--text) !important;
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
  padding: 0.7em 1em;
  width: 100%;
  font-size: 0.7em;
}
.new-button {
  margin-top: 1em;
}
</style>
