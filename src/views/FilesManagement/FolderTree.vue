<template>
  <ul style="color: #1e293b">
    <li v-for="folder in folders" :key="folder.path">
      <div @click="toggleExpand(folder)">
        <span>{{ isExpanded(folder) ? '-' : '+' }}</span>
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
import {ref, watch} from "vue";

const props = defineProps({
      folders: Array,
      selectedFolders: Array,
      expandedFolders: Array
    }
)
const selectedFolders = ref(new Set(props.selectedFolders));
const expandedFolders = ref(new Set(props.expandedFolders));


watch(() => props.selectedFolders, (newVal) => {
  selectedFolders.value = new Set(newVal);
}, {deep: true});

watch(() => props.expandedFolders, (newVal) => {
  expandedFolders.value = new Set(newVal);
}, {deep: true});


const toggleSelection = (folder) => {
  if (isSelected(folder)) {
    selectedFolders.value.delete(folder.path);
  } else {
    selectedFolders.value.add(folder.path)
  }
  this.emit('update:selected', selectedFolders.value)
}
const toggleExpand = (folder) => {
  const isExpanded = expandedFolders.value.has(folder.path);
  if (isExpanded) {
    expandedFolders.value.delete(folder.path);
  } else {
    expandedFolders.value.add(folder.path);
  }
  this.emit('update:expanded', expandedFolders.value);
}
const isSelected = (folder) => {
  return selectedFolders.value.has(folder.path)
}
const updateSelected = () => {
  this.emit('update:selected', selectedFolders.value)
}
const isExpanded = (folder) => {
  return expandedFolders.value.has(folder.path)
}
const updateExpanded = () => {
  this.emit('update:expanded', expandedFolders.value)
}
</script>

<style scoped lang="scss">

</style>