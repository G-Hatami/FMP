<template>

  <div class="select-theme-container">
    <select v-model="selectedTheme" @change="updateTheme" class="select-theme">
      <option value="blue" style="background-color: dodgerblue; color: white;">Blue</option>
      <option value="green" style="background-color: green; color: white;">Green</option>
      <option value="red" style="background-color: red; color: white;">Red</option>
    </select>
  </div>


  <select class="custom-select" v-model="lang" @change="data.updateLang($event.target.value)">
    <option value="EN">English</option>
    <option value="FA">فارسی</option>
  </select>

</template>

<script setup>
import i18n from "../i18n";
import {ref} from "vue";
import {useUserStore} from "../stores/userStore";

const userStore = useUserStore()
const selectedTheme = ref(userStore.defaultTheme)
const updateTheme = () => {
  userStore.setTheme(selectedTheme.value)
}



const lang = ref("en");
const updateLang = (newLang) => {
  userStore.setLang(newLang)
  lang.value = newLang;
  i18n.global.locale = lang.value
}

const data = {
  lang,
  updateLang
};


</script>


<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

[color-scheme= 'dark'] {
  background-color: rgba(57, 57, 57);
}

[color-scheme= 'light'] {
  background-color: rgb(288, 288, 288);
}

/* General styling for the select element */
.select-theme {
  appearance: none; /* Remove default styling */
  -webkit-appearance: none; /* Remove default styling on WebKit browsers */
  -moz-appearance: none; /* Remove default styling on Firefox */
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;
  background-color: #fff;
  background-image: linear-gradient(to bottom, #fff 0%, #f9f9f9 100%);
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px auto;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease;
}

.select-theme:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.25);
}

.select-theme option {
  padding: 8px 12px;
}

/* Custom arrow for the dropdown */
.select-theme::-ms-expand {
  display: none;
}

.select-theme-container {
  position: relative;
  display: inline-block;
}

.select-theme-container::after {
  content: '▼';
  font-size: 12px;
  color: #666;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
}

</style>