<template>
  <form @submit.prevent>
    <div>
      <label>Name :</label>
      <input v-model="groupName" type="text" maxlength="48" minlength="5" required>
    </div>
    <div>
      <label>Users :</label>
    </div>

    <div>
      <select id="dynamicSelect" @change="updateSelection">
        <option value="" disabled selected>Select a user</option>
        <option v-for="user in users" :key="user.username" :value="user.username">
          {{ user.username }}
        </option>
      </select>
    </div>

    <button @click="createGroup">Create Group</button>

    <div class="groupMember">
      <label style="color: white; font-weight:bolder ; font-size: 20px">Group Members:</label>
      <ul>
        <li v-for="(select , index ) in selectedOptions" :key="index">
          {{ select }}
          <i role="button" @click="removeFromSelection(index)" class="fa-solid fa-xmark"></i>
        </li>
      </ul>
    </div>
  </form>


</template>


<script setup>
import {useUserStore} from "../../stores/userStore";
import {onMounted, ref} from "vue";


const userStore = useUserStore()
const groupName = ref()
const groupMembers = ref([])
const users = ref([])
const selectedOptions = ref([])

//now U sure the component is fully connected to the DOM and u can dynamically fetch data
//This guarantees that the select dropdown will be populated with options.
onMounted(() => {
  users.value = userStore.users
})
//whenever I use any type of events (change , click , etc.) an event obj will occur
const updateSelection = (event) => {

  //selectedOptions are located in an HTML-collection (every selected option in select tag included)
  // if we do noy use map, we will have access to the objects of options, but we only need the value
  const selected = Array.from(event.target.selectedOptions).map(option => option.value);
  //set is used to insure we take only unique data
  selectedOptions.value = [...new Set([...selectedOptions.value, ...selected])];
};
const createGroup = () => {
  console.log(selectedOptions.value)
  if (selectedOptions.value.length > 0 && groupName.value.trim() !== "") {
    groupMembers.value.push(...selectedOptions.value)

    const newGroup = {
      groupName: groupName.value,
      users: groupMembers.value
    };
    userStore.addGroup(newGroup)
    window.history.back()
    console.log(userStore.groups.length)
    selectedOptions.value = []
    groupMembers.value = []

  } else {
    alert("please select at least one user to create a group and check the name ")
  }

}
const removeFromSelection = (index) => {
  console.log(index)
  selectedOptions.value.splice(index, 1)
  console.log(selectedOptions)
}


</script>

<style scoped lang="scss">

body {
  height: 100vh; /* 100% of the viewport height */
  margin: 0; /* Remove default margin */
  overflow: hidden; /* Prevent scrolling */
}

form {
  position: relative;
  width: 1000px;
  height: 500px;
  background: #2c3e50;
  text-align: left;
  box-shadow: 0 0 20px #00000020;
  //margin-top: 20px;
  padding: 3rem;
  border-radius: 10px;
}

form label {
  display: block;
  margin-top: 3px;
  margin-bottom: 0;
  color: white;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

form input {
  margin-bottom: 7px;
  background-color: var(--light);
  color: var(--dark-alt);

}

select {
  align-items: center;
  width: 60%;
  height: 2rem;
  box-sizing: border-box;
  color: var(--dark-alt);
  background-color: var(--light);
  transition: filter 0.3s;
  border-radius: 6px;
}

button {
  position: absolute;
  margin-bottom: 20px;
  bottom: 3rem;
  border-radius: 15em;
  background-color: white;
  color: #2c3e50;
  font-weight: bolder;

}

.groupMember {
  background-color: hsl(210, 25%, 75%);
  position: absolute;
  right: 2rem;
  top: 4rem;
  width: 20rem;
  height: 25rem;
  overflow-y: auto;
  font-weight: bolder;
  border-radius: 5px;
  padding: 10px;
}

.groupMember ul {
  color: whitesmoke;
  position: relative;
  top: 1rem;
  //list-style-type: decimal;
}

</style>