import { createWebHistory, createRouter } from 'vue-router';
import Login from "@/views/Login/Login.vue";
import CreateTender from "@/views/CreateTender/CreateTender.vue";
import ContractorHome from "@/views/Home/ContractorHome.vue";
import BidderHome from "@/views/Home/BidderHome.vue";
import TenderDescription from "@/views/TenderDescription/TenderDescription.vue";
const routes =[
    {
        path: '/',
        redirect: '/login'
    },
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
        path: '/bidderHome',
        name: 'bidder-home',
        component: BidderHome,
    } ,
    {
        path: '/createTender',
        name: 'create-tender',
        component: CreateTender,
    },
    {
        path: '/tenderDes',
        name: 'tender-des',
        component: TenderDescription,

    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});



export default router;