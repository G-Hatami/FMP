<template>
  <!--  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">-->
  <div class="container">
    <h1>User Groups</h1>
    <router-link to="/createUserGroup">
      <button class="createButton">{{ $t('Create Group') }}</button>
    </router-link>
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th style="width: 200px">Group Name</th>
          <th style="width: 500px">Users</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="userGroup in userStore.groups" :key="userGroup.groupName">
          <td>{{ userGroup.groupName }}</td>
          <td>{{ userGroup.users.join(" ,") }}</td>
          <td>
            <button @click="showDeleteModal(userGroup)" class="btn"><i class="fa fa-trash"></i></button>
            <button @click="showUpdateModal(userGroup)" class="btn"><i class="fa-sharp fa-solid fa-pen"></i></button>
          </td>
        </tr>
        </tbody>
      </table>

      <dialog id="deleteDialog" class="deleteDialog" v-if="selectedGroup">
        <h2>Delete<em> UserGroup</em></h2>
        <p>Are you sure you want to delete {{ selectedGroup.groupName }}?</p>
        <button class="yesBtn" @click="deleteGroup11">Yes</button>
        <button class="noBtn" @click="closeDeleteDialog">No</button>
      </dialog>


      <dialog id="updateDialog" class="updateDialog" v-if="selectedGroup">
        <form @submit.prevent="update">
          <h2>Update Group</h2>
          <label for="groupName"> group name :</label><br>
          <input type="text" maxlength="48" minlength="5" v-model="tempGroupName">
          <label for="groupName"> group members :</label><br>
          <select multiple class="selected-option" @click="toggleDropDown" @change="handleSelectChange">
            <option v-if="isOpen" v-for="user in usernames" :key="user.username"
                    :class="{'option': true , 'selected' : isUserSelected(user.username)}"
                    tabindex="0" @keydown.enter="toggleUser(user.username)"
                    @keydown.space="toggleUser(user.username)">
              {{ user.username }}
            </option>
          </select>
        </form>
        <div class="updButtons">
          <button class="updBtn" @click="update">Update</button>
          <button class="cancelBtn" @click="closeUpdateDialog">Cancel</button>
        </div>
      </dialog>

    </div>
  </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import {useUserStore} from "/src/stores/userStore";
import {reactive, ref} from "vue";


const userStore = useUserStore()
const selectedGroup = reactive({})
const usernames = userStore.users
const tempGroupName = ref("")
const tempGroupMem = []
const isOpen = ref(false)


const showDeleteModal = (userGroup) => {
  Object.assign(selectedGroup, userGroup)
  document.getElementById("deleteDialog").showModal()
}
const closeDeleteDialog = () => {
  selectedGroup.value = null
  document.getElementById("deleteDialog").close()

}
const showUpdateModal = (userGroup) => {
  // Object.assign(selectedGroup, userGroup)
  selectedGroup.value = {...userGroup}
  tempGroupName.value = userGroup.groupName
  tempGroupMem.value = [...userGroup.users]
  document.getElementById("updateDialog").showModal()
}

const closeUpdateDialog = () => {
  document.getElementById("updateDialog").close()
  selectedGroup.value = null
  tempGroupName.value = ""
  tempGroupMem.value = []
}

const deleteGroup11 = () => {
  if (selectedGroup) {
    userStore.deleteGroup(selectedGroup.groupName);
    // console.log(selectedGroup.groupName)
  }
  closeDeleteDialog();
}
const toggleDropDown = () => {
  isOpen.value = !isOpen.value
}
const handleSelectChange = (event) => {
  const username = event.target.value;
  toggleUser(username);
}

const toggleUser = (username) => {
  const index = tempGroupMem.value.indexOf(username)
  if (index === -1) {//it does not exist (represent the element which was not blue)
    tempGroupMem.value.push(username)
  } else {
//represent blue ones
    tempGroupMem.value.splice(index, 1)
  }

}
const isUserSelected = (username) => {
  return tempGroupMem.includes(username)

}


const update = () => {
  if (tempGroupName.value.trim().length <= 48 && tempGroupName.value.trim().length >= 5) {

    const updatedGroup = {
      groupName: tempGroupName.value,
      users: tempGroupMem.value
    };
    const selectedName = selectedGroup.value.groupName
    console.log(selectedName)
    userStore.updateGroup(updatedGroup, selectedName)

    closeUpdateDialog()
    console.log("helllo")
  } else {
    alert("The name should contains at least 5 char!")
  }

}
</script>

<style scoped lang="scss">
:root {
  --base-color: #D3D3D3;
  --dark-color: rgb(112, 128, 144, 0.8);
  --light-color: rgb(112, 128, 144, 1.8);

}

.btn:hover {
  background-color: grey;
}

.container {
  background-color: var(--dark-color);
}

.createButton {
  position: fixed;
  top: 5rem;
  right: 15rem;
  color: #dddddd;
  background-color: #213547;
}

h1 {
  position: fixed;
  top: 4rem;
  left: 15rem;
  color: #dddddd;

}

.table-container {
  width: 1400px; /* Set the container width to 80% of the page */
  max-height: 70vh;
  overflow-y: auto;
  margin-bottom: 2rem;
  margin-top: 2rem;
  position: fixed;
  top: 7rem;
  right: 15rem;
  display: flex;
  justify-content: center;
  padding-left: 23%;
  background-color: var(--light-color);


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

.deleteDialog, .updateDialog {
  background-color: #F9F9F9;
  color: #1c1a1a;
  border: 0;
  box-shadow: 0 0 1em rgb(0 0 0 /.3);
  font-size: 14px;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.deleteDialog {
  width: 400px;
}

.updateDialog {
  width: 450px;
  height: 316px;
  overflow-y: hidden;
}

.deleteDialog::backdrop, .updateDialog::backdrop {
  //linear-gradient(45 deg, red, #213547)
  background: rgb(0 0 0 /.5);
  //opacity: .5;
}


.deleteDialog h2, .updateDialog h2 {
  margin-top: 0;
}


.deleteDialog button, .updateDialog button {
  margin: 5px;
  padding: 10px 15px;
  border: #213547 5px;
  border-radius: 12px;
  cursor: pointer;
}

.deleteDialog .yesBtn, .updateDialog .updBtn {
  background-color: darkgreen;
  color: white;
}

.deleteDialog .noBtn, .updateDialog .cancelBtn {
  background-color: red;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  position: relative;
  display: flex;
  margin-top: 10px;
  margin-bottom: -10px;
  color: black;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bolder;
}

select, input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #dddddd;
  color: #213547;
  font-size: 14px;
  font-weight: bold;
}

select {
  height: 50px;
}

//.selection{
//  max-height: 10px;
//  overflow-y: auto;
//}

.custom-select {
  max-height: 40px; /* Set your desired maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
  //width: 100%;       /* Optional: Set width to 100% to make it responsive */
}

/* Optional: Style the option elements */
.custom-select option {
  padding: 10px; /* Add some padding */
  background-color: #fff; /* Background color */
  color: #213547; /* Text color */
}

.updButtons {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  margin-top: 15px;
}

.dropdown-container {
  position: relative;
  width: 200px;
  cursor: pointer;
}

.selected-option {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #213547;
}

.options-container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px; /* Set your desired maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 1000;
}

.option {
  padding: 10px;
  color: #213547;
  cursor: pointer; /* Makes it look clickable */
}

.option:hover {
  background-color: #f1f1f1;
}

.selected {
  background-color: blue;
  color: white;
}
</style>