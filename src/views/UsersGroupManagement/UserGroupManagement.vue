<template>
  <form>
    <div>
      <label>Name :</label>
      <input type="text" maxlength="48" minlength="5">
    </div>

    <div>
      <label>Users :</label>
      <!--      <Multiselect-->
      <!--          v-model="values"-->
      <!--          search-->
      <!--          historyButton-->
      <!--          :filters="filters"-->
      <!--          :options="options"-->
      <!--          :selectOptions="users"/>-->
    </div>
    <div>
      <select id="dynamicSelect" v-model="selected">
        <option v-for="user in users" :key="user.username" :value="user.username">
          {{ user.username }}
        </option>
      </select>
    </div>
    <!--    <ul>-->
    <!--      <li v-for="user in selected" :key="user.username">{{ user.name }}</li>-->
    <!--    </ul>-->
    <button @click="createGroup">Create Group</button>
    <!--    <label>Group Members:</label>-->
    <div class="groupMember">
      <div v-for="select in selected">
        {{ select }}
      </div>
    </div>
  </form>


</template>


<script setup>
import 'vue-multi-select/dist/lib/vue-multi-select.css';
// import Multiselect from 'vue-multiselect'
import {useUserStore} from "../../stores/userStore";
import {onMounted, ref} from "vue";
// import {DropDownListComponent as EjsDropdownlist} from "@syncfusion/ej2-vue-dropdowns";


const userStore = useUserStore()
const users = ref([])
const selected = ref([])
const groups = ref([])

onMounted(() => {
  users.value = userStore.users
})
const createGroup = () => {
  if (selected.value.length > 0) {
    groups.value.push(...selected.value)
    selected.value = []
  } else {
    alert("please select at least one user to create a group")
  }
}
// const filters = ref([
//   {
//     nameAll: 'Select all',
//     nameNotAll: 'Deselect all',
//     func() {
//       return true;
//     },
//   },
// ]);
// const values = ref([]);
// const options = ref({
//   multi: true,
//   // cssSelected: (option) => (option.selected ? {'background-color': '#5764c6'} : ''),
// });


</script>
<!--<script>-->
<!--import vueMultiSelect from 'vue-multi-select';-->
<!--import 'vue-multi-select/dist/lib/vue-multi-select.css';-->

<!--export default {-->
<!--  components: {-->
<!--    vueMultiSelect,-->
<!--  },-->
<!--};-->
<!--</script>-->

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
  color: #dddddd;
  font-weight: bolder;
  border-radius: 5px;
  padding: 10px;
}


</style>