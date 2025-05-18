<template>
  <q-form
    class="q-gutter-md"
  >
    <div class="form-container">
      <q-input
        borderless
        dense
        debounce="300"
        v-model="searchText"
        :readonly="searchMode"
        placeholder="Search by name"
      >
        <template v-slot:append>
          <q-btn round dense flat icon="close" color="red" @click="clear" v-if="searchMode"/>
          <q-btn round dense :disable="!hasText" flat icon="search" :color="hasText ? 'blue' : 'grey'" @click="search" v-else/>
        </template>
      </q-input>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['search', 'clear'])
const searchMode = ref(false)
const searchText = ref('')

const hasText = computed(() => { return searchText.value ? true : false })

function clear() {
  searchText.value = ''
  searchMode.value = false
  emit('clear')
}

function search() {
  searchMode.value = true
  emit('search', searchText.value)
}
</script>

<style scoped>
.form-container {
  padding-inline: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  gap: 10px;
  width: 100%;
}
</style>