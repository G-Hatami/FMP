import {defineStore} from "pinia";
// import {install} from "vue-resource/types/vue_resource";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [
            {
                id: 1,
                username: "G.Hatami2004",
                firstname: "Goli",
                lastname: "Hatami",
                type: "Admin",
                usergroup: "Admins"
            },
            {
                id: 2,
                username: "G.Hatami2003",
                firstname: "Goli",
                lastname: "Hatami",
                type: "Admin",
                usergroup: "Admins"
            },
            {
                id: 1,
                username: "G.Hatami2005",
                firstname: "Goli",
                lastname: "Hatami",
                type: "Admin",
                usergroup: "Admins"
            },
            {
                id: 1,
                username: "G.Hatami2006",
                firstname: "Goli",
                lastname: "Hatami",
                type: "Admin",
                usergroup: "Admins"
            }
        ],
        groups: [],
        name: "pinia",

    }),
    actions: {
        //to create a new user and specify a new id
        addUser(newUser) {
            if (!this.users.find(user => user.username === newUser.username)) {
                newUser.id = this.users.length + 1
                this.users.push(newUser);
            }

        },
        findId(id) {
            return this.users.find(user => user.id === id);
        },
        //to delete a user
        deleteUser(id) {
            this.users = this.users.filter(user => user.id !== id);
        },
        //to return the user with the specific id
        // I want to delete the user with specific id and replace it with the updated one
        updateUser(user) {
            const index = this.users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                this.users.splice(index, 1, user);
            }
        },
        addGroup(newGroup) {
            if (!this.groups.find(group => group.groupName === newGroup.groupName)) {
                this.groups.push(newGroup)
            }
        },
        updateGroup(newGroup , selectedGroup) {


        },
        deleteGroup(selectedGroup) {
            this.groups = this.groups.filter(group => group.groupName !== selectedGroup.groupName)
        },
        getters: {}

    }
})
