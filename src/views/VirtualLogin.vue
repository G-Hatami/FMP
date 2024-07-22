<template>
  <body>
  <header class="header">
    <h1>Virtual Login</h1>
  </header>
  <div class="table-container">
    <table>
      <thead>
      <tr>

        <th>Username</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>type</th>
        <th>User Group</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in userStore.users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        <td>{{ user.type }}</td>
        <td>{{ user.usergroup }}</td>
        <td>
          <button><span class="material-icons">login</span>Login</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  </body>
</template>

<script setup>
import {useUserStore} from "../stores/userStore";


const userStore = useUserStore()

</script>

<style scoped lang="scss">

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  height: 100vh; /* Full viewport height */
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  left: 6%;
  top: 2%;
  padding: 10px;
  text-align: center;
  //border-bottom: 1px solid #ddd;
  //flex-shrink: 0; /* Prevent the header from shrinking */
}

.table-container {
  position: fixed;
  top: 16%;
  left: 5.5%;
  width: 100%;
  flex: 1; /* Take up remaining space */
  overflow: auto; /* Allow scrolling within this container */
}

table {
  width: 100%;
  border-collapse: collapse;

}

 td {

  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  text-align: left;
  padding-left: 1px;
  color: #dddddd;
  font-weight: bold;
  border-bottom: #dddddd;
  border-right: hidden;
}

/* Optional: Adjust font size for small screens */
@media screen and (max-width: 600px) {
  table {
    font-size: 0.875em; /* Adjust font size if needed */
  }
}
</style>

