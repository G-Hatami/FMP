<template>
  <div class="container">
    <div class="table-container">
      <table style="color: #dddddd">
        <thead>
        <tr>
          <th>Owner</th>
          <th>File Path</th>
          <th>Size</th>
          <th>Upload Time</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="file in allFiles">
          <td>{{ file.owner }}</td>
          <td>{{ file.path }}</td>
          <td>{{ formatFileSize(file.size) }}</td>
          <td>{{ file.uploadTime }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import {useUserStore} from "../stores/userStore";
import {computed} from "vue";


const userStore = useUserStore()
const allFiles = computed(() => {
  let all = [];
  userStore.users.forEach(user => {
    user.allFiles.userFiles.forEach(file => {
          all.push(file)
        }
    )
  })
  return all
})
const formatFileSize = (size) => {
  if (size < 1024) return `${size} B`;
  else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

</script>
<style scoped lang="scss">

.container {
  position: fixed;
  top: 30px;
  right: 350px;
}

h2 {
  position: fixed;
  top: 10rem;
  left: 0;
  color: #213547;
}

.table-container {
  width: 1000px;
  max-height: 70vh;
  overflow-y: auto;
  display: flex;
  margin-left: 5%;
}


table {
  position: relative;
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: black;
  border-bottom: 1px solid #ddd;
}

tbody tr:nth-child(even) {
  background-color: var(--dark)
}

tbody tr:nth-child(odd) {
  background-color: hsl(var(--hue), var(--saturation), calc(45% + var(--darkness)));
}


td, th {
  height: 2.5rem;
  width: auto;
  padding: 8px;
  border: 1px solid #ddd;
}

tr {
  height: 50px;
}

</style>