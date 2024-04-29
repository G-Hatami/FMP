<template>
  <div class="container">
    <div class="input-group">
      <label for="input2">DELETE :</label>
      <input type="number" id="input2" value=123....>
    </div>
  </div>
  <router-link to="/updateUser"></router-link>
  <button @click="goToUpdate" class="updateButton">UPDATE</button>
  <router-link to="/createUser">
    <button class="createButton" >CREATE</button>
  </router-link>
  <ul>
    <li>To delete a user with each type , just enter the id in delete input!</li>
    <li>To update a user informaition with any type , just enter the id in update input!</li>
    <li>To create a user with any type , just push the create button!</li>

  </ul>
</template>

<script setup>
import {useRouter} from "vue-router";


const router = useRouter();

// Function to navigate to update user page
const goToUpdate = () => {
  router.push({path: '/updateUser'});
};


</script>

<style scoped>


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
