import {createRouter, createWebHashHistory} from "vue-router";
import Sidebar from "../components/Sidebar.vue";
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
            component: Sidebar
        },
        {
            path: "/filesManagement",
            component: FilesManagement
        },

        {
            path: "/indexPage",
            component: UsersManagement
        },
        {
            path: "/storageSpace",
            component: StorageSpace
        },
        {
            path: "/groups",
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
            component: VirtualLogin
        }

    ]

})
export default router