<template>
  <ul style="color: #1e293b">
    <li v-for="folder in folders" :key="folder.path">
      <div>
        <span @click="toggleExpand(folder)">
          {{ isExpanded(folder) ? '-' : '+' }}
        </span>
        <input
            type="checkbox"
            :checked="isSelected(folder)"
            @change="toggleSelection(folder)"
        />
        {{ folder.name }}
      </div>
      <FolderTree
          v-if="isExpanded(folder) && folder.children && folder.children.length > 0"
          :folders="folder.children"
          :selectedFolders="selectedFolders"
          :expandedFolders="expandedFolders"
          @update:selected="updateSelected"
          @update:expanded="updateExpanded"
      />
    </li>
  </ul>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update:selected', 'update:expanded']);
const props = defineProps({
  folders: Array,
  selectedFolders: Array,
  expandedFolders: Array
});

const selectedFolders = ref(new Set(props.selectedFolders));
const expandedFolders = ref(new Set(props.expandedFolders));

watch(() => props.selectedFolders, (newVal) => {
  selectedFolders.value = new Set(newVal);
}, { deep: true });

watch(() => props.expandedFolders, (newVal) => {
  expandedFolders.value = new Set(newVal);
}, { deep: true });

const toggleSelection = (folder) => {
  if (selectedFolders.value.has(folder.path)) {
    selectedFolders.value.delete(folder.path);
    console.log("selected folders after deletion" , selectedFolders.value)
  } else {
    selectedFolders.value.add(folder.path);
    console.log("selected folders after addition" , selectedFolders.value)
  }
  emit('update:selected', Array.from(selectedFolders.value));
}

const toggleExpand = (folder) => {
  if (expandedFolders.value.has(folder.path)) {
    expandedFolders.value.delete(folder.path);
  } else {
    expandedFolders.value.add(folder.path);
  }
  emit('update:expanded', Array.from(expandedFolders.value));
}

const isSelected = (folder) => selectedFolders.value.has(folder.path);
const isExpanded = (folder) => expandedFolders.value.has(folder.path);

const updateSelected = (selectedPaths) => {
  emit('update:selected', selectedPaths);
}

const updateExpanded = (expandedPaths) => {
  emit('update:expanded', expandedPaths);
}
</script>

