import { createWebHistory, createRouter } from 'vue-router';
import Login from "@/views/Login.vue";
import CreateTender from "@/views/CreateTender.vue";
import ContractorHome from "@/views/ContractorHome.vue";
const routes =[
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/contractorHome',
        name: 'contractorHome',
        component: ContractorHome,
    } ,
    {
        path: '/createTender',
        name: 'createTender',
        component: CreateTender,
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});



export default router;