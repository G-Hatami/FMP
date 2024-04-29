import {defineStore} from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [
            { id: 1,  username: "G.Hatami2004",  firstname: "Goli",  lastname: "Hatami",  type: "Admin", usergroup: "Admins"},
            { id: 1,  username: "G.Hatami2004",  firstname: "Goli",  lastname: "Hatami",  type: "Admin", usergroup: "Admins"},
            { id: 1,  username: "G.Hatami2004",  firstname: "Goli",  lastname: "Hatami",  type: "Admin", usergroup: "Admins"},
        ],
        name: "pinia"
    }),
    actions:{
        addUser(newUser){
            this.users.push(newUser);
        }
    },
    getters:{

    },


        }
    )
