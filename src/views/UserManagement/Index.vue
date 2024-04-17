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

  <div class="container">
    <div class="input-group">
      <label for="input2">DELETE :</label>
      <input type="number" id="input2" value=123....>
    </div>
  </div>
  <router-link to="/updateUser"></router-link>
  <button @click="goToUpdate" class="updateButton">UPDATE</button>
  <router-link to="/createUser">
    <button class="createButton">CREATE</button>
  </router-link>
  <ul>
    <li>To delete a user with each type , just enter the id in delete input!</li>
    <li>To update a user informaition with any type , just enter the id in update input!</li>
    <li>To create a user with any type , just push the create button!</li>

  </ul>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";

// Get router instance
const router = useRouter();

// Function to navigate to update user page
const goToUpdate = () => {
  router.push({path: '/updateUser'});
};


const users = ref([
  {id: 1, username: "john_doe", firstname: "John", lastname: "Doe", type: "Admin", usergroup: "Admins"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},
  {id: 2, username: "jane_doe", firstname: "Jane", lastname: "Doe", type: "User", usergroup: "Users"},

  // Add more user data as needed
]);

</script>

<style scoped>

.table-container {
  width: 1400px; /* Set the container width to 80% of the page */
  height: 530px;
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

.container {
  position: fixed;
  top: 5rem;
  right: 4rem;

  .input-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 3px;
      color: #213547;
      font-size: 21px;
      font-weight: bolder;
    }

    input {
      background-color: #213547;
      margin-bottom: 16px;
      width: 8rem;
      height: 2rem;
      font-weight: bold;
      font-size: 18px;
    }
  }
}

.createButton {
  position: fixed;
  right: 4.1rem;
  top: 13rem;
  width: 8rem;
  color: white;
  background-color: #213547;
}

.updateButton {
  position: fixed;
  right: 4.1rem;
  top: 10rem;
  width: 8rem;
  color: white;
  background-color: #213547;
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
