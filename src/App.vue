<template>
  <div class="app">
    <sidebar />
    <router-view/>

  </div>
</template>
<script setup>
import sidebar from "./components/Sidebar.vue"

</script>
<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --dark-alt: #334155;
  --grey: #64748b;
  --dark: #1e293b;
  --light: #f1f5f9;
  --sidebar-width: 300px;
  --hue: 210; /* Set the base hue value (blue-green) */
  --saturation: 100%; /* Set the saturation to 100% for full color */
  --lightness: 10%; /* Adjust the lightness for lighter shades */
  --darkness: 20%; /* Adjust the darkness for darker shades */
}

body {
  background: var(--light);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  position: relative;
  display: flex;
  main {

    padding: 2rem;

    @media (max-width: 768px) {
      padding-left: 6rem;
    }
  }
}
.sidebar {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #f0f0f0;
  z-index: 1000;
}


</style>