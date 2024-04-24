<template>
  <h3>.To switch between users , choose your preferred id : </h3>
  <UsersTable></UsersTable>

</template>

<script setup>
import UsersTable from "./MainTable/UsersTable.vue";
</script>

<style scoped lang="scss">
h3 {
  position: fixed;
  color: #2c3e50;
  top: 3.5rem;
  left: 18.5rem;
  display: flex;
}

.table-container {
  top: 5rem;
  right: 12rem;
}
</style>

