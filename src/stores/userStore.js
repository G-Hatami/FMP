import {defineStore} from "pinia";
// import Json from "vue-resource/src/http/interceptor/json";
// import {ref} from "vue";
// import {install} from "vue-resource/types/vue_resource";
import i18n from "../i18n";


export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [{
            username: "Admin",
            type: "Admin",
            lastModifier: ""
        }],
        currentUser: {
            username: "Admin",
            type: "Admin"
        },
        defaultTheme: 'blue',
        groups: [],
        allUploaded: [],
        allCreatedFolders: [],
        name: "pinia",

    }),
    actions: {
        // saveAllUploaded(uploadedFiles1) {
        //     sessionStorage.setItem(JSON.stringify(uploadedFiles1), 'allUploaded')
        // },

        setTheme(newTheme) {
            // this.defaultTheme = newTheme
            // this.currentUser.theme = newTheme
            // console.log(this.currentUser.theme)
            console.log(this.currentUser.username)
            const user = this.users.find(u => u.username === this.currentUser.username)
            if (user) {
                user.theme = newTheme
                console.log("color", user.theme)
            } else {
                console.log('not found ')
            }

            this.applyTheme(newTheme)

        },
        setLang(newLang) {
            console.log(this.currentUser.username)
            const user = this.users.find(u => u.username === this.currentUser.username)
            if (user) {
                user.lang = newLang
                console.log("lang", user.lang)
            } else {
                console.log('lang not found ')
            }
            this.applyLang(newLang)
        },
        applyTheme(theme) {
            document.documentElement.style.setProperty('--theme-color', theme)
            document.body.className = theme;
        },
        applyLang(lang) {
            i18n.global.locale = lang
        },
        //to create a new user and specify a new id
        addUser(newUser) {
            if (!this.users.find(user => user.username === newUser.username)) {
                this.users.push(newUser);
            }

        },
        findUser(userName) {
            return this.users.find(user => user.username.trim() === userName.trim());
        },
        //to delete a user
        deleteUser(userName) {
            if (userName !== "Admin") {
                console.log('Deleting user:', userName);
                console.log('Current users:', this.users);
                this.users = this.users.filter(user => user.username.trim() !== userName.trim());
                console.log('Updated users:', this.users);

            }


        },
        //to return the user with the specific id
        // I want to delete the user with specific id and replace it with the updated one
        updateUser(newUser, defaultUser) {
            const index = this.users.findIndex(u => u.username.trim() === defaultUser.trim());
            if (index !== -1) {
                this.users.splice(index, 1, newUser);
                // localStorage.setItem('users', JSON.stringify(this.users))
            }
        },
        addGroup(newGroup) {
            if (!this.groups.find(group => group.groupName === newGroup.groupName)) {
                this.groups.push(newGroup)
            }
        },
        updateGroup(newGroup, selectedName) {
            const index = this.groups.findIndex(obj => obj.groupName === selectedName)
            if (index !== -1) {
                this.groups[index] = newGroup
            } else {
                // Handle case where selectedGroup is not found in the array
                console.log(`Group '${selectedName}' not found in the array.`);
            }
        },
        deleteGroup(groupName) {
            this.groups = this.groups.filter(group => group.groupName !== groupName)
        },
        setCurrentUser(user) {

            this.currentUser = user
            if (user.theme) {
                console.log("has theme value")

                this.setTheme(user.theme)

            } else {
                console.log("has not theme value")

                this.applyTheme(this.defaultTheme)
            }
            if (user.lang) {
                console.log("has lang value")

                this.setLang(user.lang)
            } else {
                console.log("has not lang value")

                this.applyLang(i18n.global.locale)
            }
        },

        getters: {}

    }


})
