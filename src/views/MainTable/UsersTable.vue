<template>

  <div class="table-container">
    <table id="recordTable">
      <thead>
      <tr>

        <th>Username</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Type</th>
        <th>Usergroup</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in userStore.users">
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
import {useUserStore} from "/src/stores/userStore";

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.table-container {
  width: 1400px;
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
  color: #dddddd;

}


table {
  position: relative;
  width: 100%;
  border-collapse: collapse;
  border: #D3D3D3 solid 1px;
}

thead th {
  background-color: rgba(34, 197, 94, 0.4);
  border-bottom: 1px solid #ddd;
}

tbody tr {
  background-color: var(--dark);
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

