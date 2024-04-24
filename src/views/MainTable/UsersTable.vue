<template>
  <CreateUser @userAdded="handleUserAdded"></CreateUser>
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
      <tr v-for="user in users" :key="user.id">
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
import {ref , onMounted , onUnmounted} from "vue";
import CreateUser from "../UserManagement/CreateUser.vue";

    const users = ref([
      {id: 1, username: "G.Hatami2004", firstname: "Goli", lastname: "Hatami", type: "Admin", usergroup: "Admins"},
      {id: 1, username: "G.Hatami2004", firstname: "Goli", lastname: "Hatami", type: "Admin", usergroup: "Admins"},
      {id: 1, username: "G.Hatami2004", firstname: "Goli", lastname: "Hatami", type: "Admin", usergroup: "Admins"},
      {id: 1, username: "G.Hatami2004", firstname: "Goli", lastname: "Hatami", type: "Admin", usergroup: "Admins"},
      {id: 1, username: "G.Hatami2004", firstname: "Goli", lastname: "Hatami", type: "Admin", usergroup: "Admins"},
      {id: 1, username: "G.Hatami2004", firstname: "Goli", lastname: "Hatami", type: "Admin", usergroup: "Admins"},
    ]);
    const handleUserAdded = (newUser) => {
      console.log("new user: " , newUser.lastname)}
    // }
    // onMounted(() => {
    //   const handler = (newUser) => addUser(newUser);
    //   emit("usersAdded", handler);
    // });
    // onUnmounted(() => {
    //   emit('usersAdded', null);
    // });




</script>


<style scoped lang="scss">
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