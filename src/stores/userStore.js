import {defineStore} from "pinia";

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
            }
        ],
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
        updateUser(user) {
            const index = this.users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                this.users.splice(index, 1, user);


            }
        }

    },
    getters: {}


})
