<template>
  <div class="username-selector">
    <div class="selected-users" @click="toggleDropdown">
      <span v-if="selectedUsers.length === 0 || selectedUsers.includes('all')">All Users</span>
      <span v-else>{{ selectedUsers.join(', ') }}</span>
      <span class="arrow">▼</span>
    </div>
    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-item" @click="toggleUser('all')">
        <input type="checkbox" :checked="selectedUsers.includes('all')" />
        <span>All Users</span>
      </div>
      <div v-for="user in users" :key="user" class="dropdown-item" @click="toggleUser(user)">
        <input type="checkbox" :checked="selectedUsers.includes(user)" />
        <span>{{ user }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const isOpen = ref(false)
const selectedUsers = ref<string[]>(props.modelValue)
const users = ref<string[]>(['user1', 'user2', 'user3', 'user4', 'user5']) // Mock data, replace with actual users

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const toggleUser = (user: string) => {
  if (user === 'all') {
    selectedUsers.value = ['all']
    emit('update:modelValue', ['all'])
    return
  }

  if (selectedUsers.value.includes('all')) {
    selectedUsers.value = []
  }

  const index = selectedUsers.value.indexOf(user)
  if (index === -1) {
    selectedUsers.value.push(user)
  } else {
    selectedUsers.value.splice(index, 1)
  }

  if (selectedUsers.value.length === 0) {
    selectedUsers.value = ['all']
  }

  emit('update:modelValue', selectedUsers.value)
}

watch(() => props.modelValue, (newValue) => {
  selectedUsers.value = newValue
})
</script>

<style scoped>
.username-selector {
  position: relative;
}

.selected-users {
  padding: 6px 12px;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-size: 0.9em;
}

.arrow {
  font-size: 0.8em;
  color: var(--text-secondary);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-top: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--text-color);
  font-size: 0.9em;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style> 