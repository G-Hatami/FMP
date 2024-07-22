import {defineStore} from "pinia";
// import {install} from "vue-resource/types/vue_resource";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [
            {
                username: "Admin",
                firstname: "Goli",
                lastname: "Hatami",
                type: "Admin",
                usergroup: "",
                theme: "",
                lang: ""
            }
        ],
        groups: [],
        loggedInUser : {
            username: "Admin",
            firstname: "Goli",
            lastname: "Hatami",
            type: "Admin",
            usergroup: "",
            theme: "",
            lang: ""
        },
        name: "pinia",

    }),
    actions: {
        //to create a new user and specify a new id
        addUser(newUser) {
            if (!this.users.find(user => user.username === newUser.username)) {
                this.users.push(newUser);
            }

        },
        findUser(userName) {
            return this.users.find(user => user.username === userName);
        },
        //to delete a user
        deleteUser(userName) {
            this.users = this.users.filter(user => user.username !== userName);
        },
        //to return the user with the specific id
        // I want to delete the user with specific id and replace it with the updated one
        updateUser(newUser, defaultUser) {
            const index = this.users.findIndex(u => u.username === defaultUser);
            if (index !== -1) {
                this.users.splice(index, 1, newUser);
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
        getters: {}

    }
})
