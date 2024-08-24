<template>
  <div class="tree-container">
    <ul>
      <li v-for="file in allFileAndFolders" :key="file.path" class="root-item">
        <div class="tree-item">
          <span v-if="file.type === 'folder' " @click="toggleExpand(file)" class="expand-icon">
            {{ isExpanded(file) ? '-' : '+' }}
          </span>
          <span style="font-size: 35px; font-weight: bolder; margin-right: 15px" class="icon">
            {{ getIcon(file) }}
          </span>
          <input v-if="file.type === 'file'" type="checkbox"
                 :checked="isSelected(file)"
                 @change="toggleSelection(file)"
                 class="checkbox"
          />
          <span v-if="file.type === 'folder' && file.name !== '/'">
            <span
                @click="changeView('folder',file.name )">
              {{ file.name }}
            </span>
          </span>

          <span v-else-if="file.type === 'folder' && file.name === '/'">
            <span
                @click="changeView('allFiles' , file.name)">
              {{ file.name }}
            </span>
          </span>
          <span v-else>
            {{ file.name }}
          </span>
        </div>
        <div v-if="isExpanded(file)" class="child-container">

          <FilesList
              :all-file-and-folders="file.children"
              :selected-files="selectedFiles"
              :expanded-files="expandedFiles"
              :change-view="changeView"
              @update:expanded="updateExpanded"
              @update:selected="updateSelected"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';

const emit = defineEmits(['update:selected', 'update:expanded']);

const props = defineProps({
  allFileAndFolders: Array,
  selectedFiles: Array,
  expandedFiles: Array,
  changeView: Function
});

const selectedFiles = ref(new Set(props.selectedFiles));
const expandedFiles = ref(new Set(props.expandedFiles));


watch(() => props.selectedFiles, (newVal) => {
  selectedFiles.value = new Set(newVal);
}, {deep: true});

watch(() => props.expandedFiles, (newVal) => {
  expandedFiles.value = new Set(newVal);
}, {deep: true});

const toggleSelection = (folder) => {
  if (selectedFiles.value.has(folder)) {
    selectedFiles.value.delete(folder);
    console.log("selected is deleted", selectedFiles.value)
  } else {
    selectedFiles.value.add(folder);
    console.log("selected is added", selectedFiles.value)
  }
  emit('update:selected', selectedFiles.value);
}



const toggleExpand = (folder) => {
  if (expandedFiles.value.has(folder)) {
    expandedFiles.value.delete(folder);
  } else {
    expandedFiles.value.add(folder);
  }
  emit('update:expanded', Array.from(expandedFiles.value));
}


const isSelected = (folder) => selectedFiles.value.has(folder);
const isExpanded = (folder) => expandedFiles.value.has(folder);


const updateSelected = (selected) => {
  console.log("emit from here")
  console.log(selected)
  emit('update:selected', selected);
}


const updateExpanded = (expanded) => {
  emit('update:expanded', expanded);
}

// Function to determine the icon based on the file type
const getIcon = (file) => {
  return file.type === "folder" ? "🗀" : '🗎';
}
</script>


<style scoped>
.tree-container {
  color: #1e293b;
  padding: 10px;
  position: absolute;
  top: 10px;
}

ul {
  width: 500px;
  list-style: none;
  padding-left: 0;

}

.root-item {
  margin-left: 20px;
}

.tree-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  position: relative;
}

.expand-icon {
  cursor: pointer;
  margin-right: 5px;
}

.icon {
  margin-right: 5px;
}

.icon img {
  width: 16px;
  height: 16px;
}

.checkbox {
  margin-right: 5px;
}

.child-container {
  margin-left: 20px;
  margin-top: 5px;
  position: relative;
}
</style>
