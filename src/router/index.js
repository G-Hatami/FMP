import {createRouter, createWebHashHistory} from "vue-router";
import FilesManagement from "../views/FilesManagement/FilesManagement.vue";
import UsersManagement from "../views/UserManagement/Index.vue";
import StorageSpace from "../views/StorageSpace.vue";
import Groups from "../views/UsersGroupManagement/Groups.vue";
import CreateUserGroup from "../views/UsersGroupManagement/CreateUserGroup.vue";
import Settings from "../views/Settings.vue";
import createUser from "../views/UserManagement/CreateUser.vue"
import updateUser from "../views/UserManagement/UpdateUser.vue"
import UsersTable from "../views/MainTable/UsersTable.vue";
import VirtualLogin from "../views/VirtualLogin.vue";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [

        {
            path: "/",
            name: 'fileManagement',
            component: FilesManagement
        },

        {
            path: "/indexPage",
            name: 'index' ,
            component: UsersManagement
        },
        {
            path: "/storageSpace",
            name : 'storage',
            component: StorageSpace
        },
        {
            path: "/groups",
            name : 'groups',
            component: Groups
        },
        {
            path: "/createUserGroup",
            component: CreateUserGroup
        },
        {
            path: "/settings",
            component: Settings
        },
        {
            path: "/createUser",
            component: createUser
        },
        {
            path: "/updateUser",
            component: updateUser
        },
        {
            path: "/usersTable",
            component: UsersTable
        },
        {
            path: "/virtualLogin",
            name : 'virtualLogin',
            component: VirtualLogin
        },
        // {
        //     path: '*',
        //     redirect: '/'
        // }

    ]

})

// router.beforeEach((to, from, next) => {
//     if (!to.matched.length) {
//         next('/');
//     } else {
//         next();
//     }
// });
export default router