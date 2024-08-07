<template>
  <aside class="sidebar" :class="`${is_expanded && 'is_expanded'}`">
    <div class="logo">
      <img src="../assets/vue.svg" alt="vue">
    </div>
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="toggleMenu" id="icon-link">
        <span class="material-icons" id="arrow-icon">keyboard_double_arrow_right</span>
      </button>
    </div>
    <h3>Menu</h3>
    <div class="menu">

      <router-link :to="{ name : 'index'}" class="button" :class="{ disabled : isUserManagementDisabled}" exact>
        <span class="material-icons" :class="{disabledIcon : isUserManagementDisabled}">person</span>
        <span class="text" :class="{disabledIcon : isUserManagementDisabled}">Users Management</span>
      </router-link>
      <router-link :to="{name : 'groups'}" class="button" :class="{disabled : isUserGroupManagementDisabled}" exact>
        <span class="material-icons" :class="{disabledIcon : isUserGroupManagementDisabled}">group</span>
        <span class="text" :class="{disabledIcon : isUserGroupManagementDisabled}">UserGroup management</span>
      </router-link>
      <router-link :to="{name : 'storage'}" class="button" :class="{disabled : isStorageDisabled}" exact>
        <span class="material-icons" :class="{disabledIcon : isStorageDisabled}">storage</span>
        <span class="text" :class="{disabledIcon : isStorageDisabled}">Storage space</span>
      </router-link>
      <router-link :to="{name : 'fileManagement' }" class="button" exact>
        <span class="material-icons">insert_drive_file</span>
        <span class="text">files management</span>
      </router-link>
      <router-link :to="{name : 'virtualLogin'}" class="button" exact>
        <span class="material-icons">login</span>
        <span class="text">Login</span>
      </router-link>

      <div class="settings">
        <router-link to="/settings" class="button" id="settings" exact>
          <span class="material-icons">settings</span>
          <span class="text">Settings</span>
        </router-link>
      </div>
      <div>
        <p>{{ userStore.currentUser.username }}</p>
        <p>{{ userStore.currentUser.type }}</p>
        <p>{{ userStore.currentUser.theme }}</p>
        <p>{{ userStore.currentUser.lang }}</p>
        <!--        <p>{{ userStore.currentUser.userUploadedFiles.length}}</p>-->
      </div>
    </div>
  </aside>
</template>
<script setup>
import {computed, ref} from "vue";
import {useUserStore} from "../stores/userStore";

const userStore = useUserStore()

const isLinkDisabled = (routeName) => {
  if (userStore.currentUser.type === 'User') {
    const disabledRoutesForUser = ['storage', 'index', 'groups'];
    return disabledRoutesForUser.includes(routeName);
  }
  return false;
};

const isUserManagementDisabled = computed(() => isLinkDisabled('index'))
const isUserGroupManagementDisabled = computed(() => isLinkDisabled('groups'))
const isStorageDisabled = computed(() => isLinkDisabled('storage'))


// const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
const is_expanded = ref(false)
const toggleMenu = () => {
  is_expanded.value = !is_expanded.value
  // localStorage.setItem("is_expanded", is_expanded.value.toString())
}


</script>


<style lang="scss" scoped>
.disabled {
  pointer-events: none;
  display: none;
}

.disabledIcon {
  visibility: hidden;
}

aside {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-content: center;
  flex-direction: column;
  width: calc(3rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem 0.5rem;
  background-color: var(--dark);
  color: var(--light);
  transition: 0.2s ease-out;

  #settings {
    position: absolute;
    bottom: 2.6rem;
    width: 99%;

    .material-icons {
      display: flex;
      align-items: flex-start;
    }

    button {
      width: 100%;
    }

  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    margin-bottom: 1rem;
    justify-content: flex-end;
    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;
      outline: #213547;


      .material-icons {
        display: flex;
        align-items: center;
        font-size: 2.6rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          transform: translateX(0.5rem);
          color: var(--primary);
        }

      }
    }
  }

  #arrow-icon {
    padding: 0;
    width: 2rem;
    align-items: center;
  }

  h3, .button .text {
    opacity: 0;
    transition: 0.3s ease-out;

  }

  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.5rem 1.5rem;
      width: 92%;

      .material-icons {
        font-size: 2.6rem;
        color: var(--light);
        transition: 0.3s ease-out;
      }

      .text {
        transition: 0.3s ease-out;
        color: var(--light);
        font-size: 17px;
        display: inline-block;
        padding: 0 0.9rem;
      }

      &:hover .material-icons,
      &:hover .text {
        color: var(--primary);
      }

      &:hover {
        background-color: var(--dark-alt);
      }

    }
  }

  .router-link-exact-active {
    border-right: 6px solid var(--primary);
    right: 0;
  }


  &.is_expanded {
    width: 23%;


    .menu-toggle-wrap {
      top: -3.6rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    .button {
      width: 98%;
    }

    h3, .button .text {
      opacity: 1;
    }


  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 1000;

  }
  @media screen and (max-width: 768px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: fixed;
    }


  }
}

</style>