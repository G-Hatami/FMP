<template>


  <div class="table-container">
    <table id="recordTable">
      <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Type</th>
        <th>Usergroup</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in userStore.users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        <td>{{ user.type }}</td>
        <td>{{ user.usergroup }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/userStore";

const userStore = useUserStore()
</script>

<style scoped lang="scss">
//h3 {
//  position: fixed;
//  color: #2c3e50;
//  top: 3.5rem;
//  left: 18.5rem;
//  display: flex;
//}
//
//.table-container {
//  top: 5rem;
//  right: 12rem;
//}



 .table-container {
  width: 1400px; /* Set the container width to 80% of the page */
  max-height: 70vh;
  overflow-y: auto;
  margin-bottom: 2rem;
  margin-top: 2rem;
  position: fixed;
  top: 2.5rem;
  right: 15rem;
  display: flex;
  justify-content: center;
  padding-left: 23%;

}

/* Add your table styling here */
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

ul {
  color: #1a1a1a;
  font-weight: bolder;
  font-size: 20px;
  position: fixed;
  bottom: 2rem;
  left: 21rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;

  li {
    margin: 0; /* Remove default margin */
    list-style-position: inside;

  }
}
</style>

