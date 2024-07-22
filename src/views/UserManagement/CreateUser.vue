<template>
  <form @submit.prevent="handleSubmit">
    <label>{{ $t('User name') }}:</label>
    <input type="text" maxlength="48" minlength="5" required v-model="username" onblur="disabled=true">

    <label>{{ $t('First name') }}:</label>
    <input type="text" maxlength="48" v-model=firstname>

    <label>{{ $t('Last name') }}:</label>
    <input type="text" maxlength="48" v-model=lastname>
    <label>{{ $t('User Group') }}:</label>
    <input type="text" maxlength="48" v-model=usergroup>

    <div class="createTable">
      <div class="option">
        <label>{{ $t('Creator') }}:</label>
        <input type="text" v-model=creator>
      </div>

      <div class="timeInput">
        <label>{{ $t('creationTime') }}:</label>
        <input type="text" v-model=creationTime>
      </div>
    </div>

    <div class="updateTable">
      <div class="option">
        <label>{{ $t('lastModifier') }}</label>
        <input type="text" v-model=lastModifier>
      </div>
      <div class="timeInput">
        <label>{{ $t('lastModificationTime') }}:</label>
        <input type="text" v-model=lastModificationTime>
      </div>
    </div>

    <label>{{ $t('Type') }}:</label>
    <select v-model="type" required>
      <option value="Admin">{{ $t('Admin') }}</option>
      <option value="User">{{ $t('User') }}</option>
    </select>
    <div class="submit">
      <button style="font-weight: bolder" @click="createUser" :disabled="!canCreateUser">{{ $t('Create the User') }}
      </button>
    </div>
    <div class="termsBox">
      <input type="checkbox" v-model="terms" required>
      <label id="boxLabel">{{ $t('Accept terms and conditions') }} </label>


    </div>
    <div class="terms">
      <p>
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda aut consequatur dicta expedita explicabo
        "fugit impedit minus mollitia natus nesciunt nulla optio quidem quis quod repellat sint tenetur,
        voluptates.Lorem ipsum dolor sit amet, consectetur adipisicing elit.A, alias, at commodi delectus distinctio
        dolor
        "exercitationem minima nisi odio perspiciatis, possimus quis reiciendis repudiandae sed unde voluptatibus
        "voluptatum!Eius, nam.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Deleniti dolorum quidem quo totam
        ut ? Accusantium
        beatae, cumque facilis nisi odit porro quis quisquam quos repellendus sint.Animi delectus eveniet quaerat ?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.Ab assumenda aut consequatur dicta expedita explicabo
        fugit impedit minus mollitia natus nesciunt nulla optio quidem quis quod repellat sint tenetur, voluptates.Lorem
        ipsum dolor sit amet, consectetur adipisicing elit.A, alias, at commodi delectus distinctio dolor
        exercitationem minima nisi odio perspiciatis, possimus quis reiciendis repudiandae sed unde voluptatibus
        voluptatum!Eius, nam.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Deleniti dolorum quidem quo totam
        ut ? Accusantium
        beatae, cumque facilis nisi odit porro quis quisquam quos repellendus sint.Animi delectus eveLorem ipsum dolor
        sit amet, consectetur adipisicing elit.Ab assumenda aut consequatur dicta expedita explicabo
        fugit impedit minus mollitia natus nesciunt nulla optio quidem quis quod repellat sint tenetur, voluptates.Lorem
        ipsum dolor sit amet, consectetur adipisicing elit.A, alias, at commodi delectus distinctio dolor
        exercitationem minima nisi odio perspiciatis, possimus quis reiciendis repudiandae sed unde voluptatibus
        voluptatum!Eius, nam.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Deleniti dolorum quidem quo totam
        ut ? Accusantium
        beatae, cumque facilis nisi odit porro quis quisquam quos repellendus sint.Animi delectus eve</p>

    </div>
  </form>

</template>
<script setup>
import {computed, ref} from "vue";
import {useUserStore} from "../../stores/userStore";

const userStore = useUserStore()


const username = ref(" ")
const lastname = ref(" ")
const firstname = ref(" ")
const usergroup = ref(" ")
const type = ref(" ")
const creator = ref(" ")
const creationTime = ref(" ")
const lastModifier = ref(" ")
const lastModificationTime = ref(" ")
const terms = ref(false)

// to handle the conditions of creating the user
const canCreateUser = computed(() => {
  return username.value.trim() !== "" && type.value !== " " && terms.value !== false;
})

const createUser = () => {
  const newUser = {
    username: username.value,
    firstname: firstname.value,
    lastname: lastname.value,
    usergroup: usergroup.value,
    type: type.value,
    creator: creator.value,
    creationTime: creationTime.value,
    lastModifier: lastModifier.value,
    lastModificationTime: lastModificationTime.value,
  };

  userStore.addUser(newUser)
  window.history.back()
}


const handleSubmit = () => {
}


</script>


<style scoped lang="scss">
form {
  position: relative;
  width: 1000px;
  height: 700px;
  background: #2c3e50;
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
  background: hsl(210, 20%, 55%);
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
  background-color: hsl(210, 20%, 55%);
  position: absolute;
  right: 2rem;
  top: 2rem;
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