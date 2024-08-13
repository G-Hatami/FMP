<template>

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
      <tr v-for="user in userStore.users">
        <td>{{ user.username }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        <td>{{ user.type }}</td>
        <td>{{ user.usergroup }}</td>
        <td>
          <button @click="login(user)"><span class="material-icons">login</span>Login</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>


  <ul>
    <li>dfd</li>
    <li>dvfdv</li>
    <li>vdfvdfvfbf</li>
  </ul>


</template>

<script setup>
import {useUserStore} from "../stores/userStore";
import {useRouter} from "vue-router";

const userStore = useUserStore()
const router = useRouter();
const login = (user) => {
  userStore.setCurrentUser(user)
  console.log(user.username)
  router.push({path: '/'})

}
</script>

<style scoped lang="scss">

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  left: 6%;
  top: 2%;
  padding: 10px;
  text-align: center;
}

.table-container {
  position: fixed;
  top: 16%;
  left: 5.5%;
  width: 100%;
  flex: 1;
  overflow: auto;
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


@media screen and (max-width: 600px) {
  table {
    font-size: 0.875em;
  }
}
</style>

