<template>

  <UsersTable></UsersTable>

  <div class="container">
    <div class="input-group">
      <label for="input2">{{ $t('Enter username') }}</label>
      <input type="text" id="input2" v-model="chosenUser">
      <button class="deleteButton" @click="deleteUser">{{ $t('DELETE') }}</button>
    </div>
  </div>
  <router-link to="/updateUser"></router-link>
  <button @click="goToFindChosen" class="updateButton">{{ $t('UPDATE') }}</button>
  <router-link to="/createUser">
    <button class="createButton">{{ $t('CREATE') }}</button>
  </router-link>
  <ul>
    <li>{{ $t('To delete a user with each type , just enter the id and push the delete button!') }}</li>
    <li>{{ $t('To update a user information with any type , just enter the id and push the update button!') }}</li>
    <li>{{ $t('To create a new user with any type , just push the create button!') }}</li>

  </ul>
</template>

<script setup>
import {useRouter} from "vue-router";
import UsersTable from "/src/views/MainTable/UsersTable.vue";
import {useUserStore} from "/src/stores/userStore";
import {ref} from "vue";



const userStore = useUserStore()
const lastModifier = ref()
const router = useRouter();
const chosenUser = ref("")
// Function to navigate to update user page
const deleteUser = () => {
  const chosen2 = chosenUser.value.trim()
  userStore.deleteUser(chosen2);
  console.log(chosen2)
  chosenUser.value = ""
};
const goToFindChosen = () => {
  // const toSendLastModifier = userStore.users.find(user => user.username === userStore.currentUser.username)
  // toSendLastModifier.lastModifier = userStore.currentUser.username
  const chosen3 = chosenUser.value.trim()
  console.log(chosen3)
  if (userStore.findUser(chosen3)) {
    console.log("hiiii")
    router.push({path: '/updateUser', query: {username: chosen3 , lastModifier:userStore.currentUser.username}});
  }
}


</script>

<style scoped>


.container {
  position: fixed;
  top: 5rem;
  right: 4rem;

  .input-group {
    margin-bottom: 20px;

    label {
      position: fixed;
      top: 5.5rem;
      right: 3rem;
      display: block;
      color: snow;
      font-size: 21px;
      font-weight: bolder;
    }

    input {
      position: fixed;
      top: 8rem;
      right: 4.1rem;
      background-color: #213547;
      margin-bottom: 16px;
      width: 8rem;
      height: 2rem;
      font-weight: bold;
      font-size: 18px;
      color: #dddddd;
    }
  }
}

.createButton {
  position: fixed;
  right: 4.1rem;
  top: 17rem;
  border-radius: 2em;
  width: 8rem;
  color: white;
  background-color: #213547;
}

.updateButton {
  position: fixed;
  right: 4.1rem;
  top: 14rem;
  border-radius: 2em;
  width: 8rem;
  color: white;
  background-color: #213547;
}

.deleteButton {
  position: fixed;
  right: 4.1rem;
  top: 11rem;
  border-radius: 2em;
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
