import { createWebHistory, createRouter } from 'vue-router';
import Login from "@/views/Login/Login.vue";
import CreateTender from "@/views/CreateTender/CreateTender.vue";
import ContractorHome from "@/views/ContractorHome/ContractorHome.vue";
const routes =[
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/contractorHome',
        name: 'contractor-home',
        component: ContractorHome,
    } ,
    {
        path: '/createTender',
        name: 'create-tender',
        component: CreateTender,
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});



export default router;