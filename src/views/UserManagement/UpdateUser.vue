<template>
  <form @submit.prevent="handleSubmit">
    <label>User name:</label>
    <input type="text" maxlength="48" minlength="5" onblur="this.disabled=true" required v-model="userInfo.userName">

    <label>First name:</label>
    <input type="text" maxlength="48" v-model=userInfo.firstName>

    <label>Last name:</label>
    <input type="text" maxlength="48" v-model=userInfo.lastName>
    <div class="createTable">
      <div class="option">
        <label>Creator:</label>
        <input type="text" v-model=userInfo.userGroup>
      </div>

      <div class="timeInput">
        <label>creationTime:</label>
        <input type="text" v-model=userInfo.userGroup>
      </div>
    </div>

    <div class="updateTable">
      <div class="option">
        <label>lastModifier</label>
        <input type="text" v-model=userInfo.userGroup>
      </div>
      <div class="timeInput">
        <label>lastModificationTime:</label>
        <input type="text" v-model=userInfo.userGroup>
      </div>
    </div>

    <label>Type:</label>
    <select v-model="userInfo.type" required>
      <option value="Admin">Admin</option>
      <option value="User">User</option>
    </select>
    <div class="submit">
      <button>Create an Account</button>
    </div>
    <div class="termsBox">
      <input type="checkbox" v-model="terms" required>
      <label id="boxLabel">Accept terms and conditions </label>


    </div>
    <div class="terms">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda aut consequatur dicta expedita explicabo
        fugit impedit minus mollitia natus nesciunt nulla optio quidem quis quod repellat sint tenetur, voluptates.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, alias, at commodi delectus distinctio dolor
        exercitationem minima nisi odio perspiciatis, possimus quis reiciendis repudiandae sed unde voluptatibus
        voluptatum! Eius, nam.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti dolorum quidem quo totam ut? Accusantium
        beatae, cumque facilis nisi odit porro quis quisquam quos repellendus sint. Animi delectus eveniet quaerat?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda aut consequatur dicta expedita explicabo
        fugit impedit minus mollitia natus nesciunt nulla optio quidem quis quod repellat sint tenetur, voluptates.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, alias, at commodi delectus distinctio dolor
        exercitationem minima nisi odio perspiciatis, possimus quis reiciendis repudiandae sed unde voluptatibus
        voluptatum! Eius, nam.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti dolorum quidem quo totam ut? Accusantium
        beatae, cumque facilis nisi odit porro quis quisquam quos repellendus sint. Animi delectus eveLorem ipsum dolor
        sit amet, consectetur adipisicing elit. Ab assumenda aut consequatur dicta expedita explicabo
        fugit impedit minus mollitia natus nesciunt nulla optio quidem quis quod repellat sint tenetur, voluptates.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, alias, at commodi delectus distinctio dolor
        exercitationem minima nisi odio perspiciatis, possimus quis reiciendis repudiandae sed unde voluptatibus
        voluptatum! Eius, nam.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti dolorum quidem quo totam ut? Accusantium
        beatae, cumque facilis nisi odit porro quis quisquam quos repellendus sint. Animi delectus eve</p>
    </div>
  </form>

</template>
<script setup>
import {ref} from "vue";

const userInfo = ref({
  userName: '',
  firstName: '',
  lastName: '',
  userGroup: '',
  type: '',
  creator: '',
  creationTime: '',
  lastModifier: '',
  lastModificationTime: ''
})
const terms = ref(false)
const handleSubmit = () => {
}

</script>
<style scoped lang="scss">
form {
  position: relative;
  width: 1000px;
  height: 700px;
  background: hsl(210, 20%, 55%);;
  text-align: left;
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

input, select {
  align-items: center;
  width: 60%;
  height: 2rem;
  box-sizing: border-box;
  color: var(--dark-alt);
  background-color: var(--light);
  transition: filter 0.3s;
  border-radius: 6px;
}

input:hover,
select:hover {
  filter: brightness(80%);
}

form button {
  background: #2c3e50;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  position: absolute;
  left: 3rem;
  bottom: 3rem;

}

.terms {
  background: HSL(207.6923, 34.55%, 35.31%);
  position: absolute;
  right: 2rem;
  top: 3.5rem;
  width: 20rem;
  height: 35rem;
  overflow-y: auto;
  color: #dddddd;
  font-weight: bolder;
  border-radius: 5px;
  padding: 10px;
}

.termsBox {
  position: absolute;
  bottom: 3rem;
  left: 15rem;
  display: flex;
  align-items: center;
  color: #dddddd;
  font-size: 40px;

}

input[type="checkbox"] {
  margin-right: 8px;
}

.option {
  width: 58%;
}

.timeInput {
  width: 42%;
}
.submit {
  text-align: center;
}
</style>