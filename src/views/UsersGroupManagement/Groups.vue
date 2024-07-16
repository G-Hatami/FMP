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
        <tr v-for="userGroup in userStore.groups" :key="userGroup.id">
          <td>{{ userGroup.groupName }}</td>
          <td>{{ userGroup.users }}</td>
          <td>
            <button @click="showDeleteModal(userGroup)" class="btn"><i class="fa fa-trash"></i></button>
            <button @click="showUpdateModal(userGroup)" class="btn"><i class="fa-sharp fa-solid fa-pen"></i></button>
          </td>
        </tr>
        </tbody>
      </table>

      <dialog id="deleteDialog" class="deleteDialog" v-if="selectedGroup">
        <h2>Delete<em> User</em></h2>
        <p>Are you sure you want to delete {{ selectedGroup.groupName }}?</p>
        <button class="yesBtn" @click="deleteGroup()">Yes</button>
        <button class="noBtn" @click="closeDeleteDialog">No</button>
      </dialog>


      <dialog id="updateDialog" class="updateDialog" v-if="selectedGroup">
        <form @submit.prevent="">
          <h2>Update Group</h2>
          <label for="groupName"> group name :</label><br>
          <input type="text" maxlength="48" minlength="5" v-model="updatedGroupName">
          <label for="groupName"> group members :</label><br>

          <select class="selected-option" @click="toggleDropDown" @change="handleSelectChange">
            <option v-if="isOpen" v-for="user in userStore.users" :key="user.username"
                    @click="toggleUser(user.username)"
                    :class="{'option': true , 'selected' : isUserSelected(user.username)}"
                    tabindex="0" @keydown.enter="toggleUser(user.username)"
                    @keydown.space="toggleUser(user.username)">
              {{ user.username }}
            </option>
          </select>
        </form>
        <div class="updButtons">
          <button class="updBtn" @click="update">Update</button>
          <button class="cancelBtn" @click="closeDeleteDialog">Cancel</button>
        </div>
      </dialog>

    </div>
  </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import {useUserStore} from "/src/stores/userStore";
import {ref} from "vue";
// import doc from "vue-multi-select/src/components/doc/doc";

const userStore = useUserStore()
const selectedGroup = ref(null)
const selectedGroupName = ref(null)
const updatedGroupName = ref(selectedGroupName)
const selectedGroupMem = []
const isOpen = ref(false)


const showDeleteModal = (userGroup) => {
  selectedGroup.value = {...userGroup};
  document.getElementById("deleteDialog").showModal()
}
const showUpdateModal = (userGroup) => {
  selectedGroup.value = {...userGroup};
  selectedGroupMem.value = userGroup.users
  selectedGroupName.value = userGroup.groupName;
  console.log("Selected Group for Update:", selectedGroup.value);
  console.log("Selected name for Update:", selectedGroupName.value);
  document.getElementById("updateDialog").showModal()
}
const closeDeleteDialog = () => {
  selectedGroup.value = null;
  document.getElementById("deleteDialog").close()

}
const closeUpdateDialog = () => {
  document.getElementById("updateDialog").close()
}

const deleteGroup = () => {
  if (selectedGroup.value) {
    userStore.deleteGroup(selectedGroup.value);
    closeDeleteDialog();
  }
}
const toggleDropDown = () => {
  isOpen.value = !isOpen.value
}
const handleSelectChange = (event) => {
  const username = event.target.value;
  toggleUser(username);
}

const toggleUser = (username) => {
  const index = selectedGroupMem.value.indexOf(username)
  if (index === -1) {//it does not exist
    selectedGroupMem.value.push(username)
    console.log("not found")
  } else {
    console.log("not dvffound")
    selectedGroupMem.value.splice(index, 1)
  }

}
const isUserSelected = (username) => {
  return selectedGroupMem.value.includes(username)
}

// const updatedOptions = () => {
//   if (!selectedGroupMem.includes(selectedUsers)) {
//     selectedGroupMem.push(selectedUsers)
//     console.log(selectedGroupMem)
//   }
// }
// const updateGroup = () => {
//   if (selectedGroup.value)
//     userStore.groups.groupName = selectedGroupName.value
//   closeUpdateDialog()
// };
// const updateGroupName = (event)=> {
//   userStore.groups.groupName = event.target.value
// }

const update = () => {
  if (updatedGroupName.value && selectedGroupMem.value) {
    const updatedGroup = {
      groupName: updatedGroupName.value,
      // users: selectedGroupMem.value
    };
    const selectedGroup = {
      groupName1: selectedGroupName.value,
      // users: selectedGroupMem.value
    }
    console.log("selected was" ,selectedGroup.groupName1)
    console.log("updated is" ,updatedGroup)
    // userStore.updateGroup(updatedGroup, selectedGroup)
  }
  closeUpdateDialog()
  console.log("helllo")
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
  color: #213547;

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