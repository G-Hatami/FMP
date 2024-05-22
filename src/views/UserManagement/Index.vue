<template>
  <virtual-login></virtual-login>
  <div class="container">
    <div class="input-group">
      <label for="input2">{{ $t('Enter ID') }}:</label>
      <input type="number" id="input2" value=123.... v-model="chosenID">
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
import virtualLogin from "../VirtualLogin.vue"
import {useUserStore} from "../../stores/userStore";
import {ref} from "vue";


const userStore = useUserStore()

const router = useRouter();
const chosenID = ref('')
// Function to navigate to update user page
const deleteUser = () => {
  userStore.deleteUser(parseInt(chosenID.value, 10));
};
const goToFindChosen = () => {
  const userId = parseInt(chosenID.value, 10);
  if (userStore.findId(userId)) {
    router.push({path: '/updateUser', query: {id: userId.toString()}});
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
      top: 6rem;
      right: 5.1rem;
      display: block;
      color: #213547;
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
