import { createRouter, createWebHashHistory, RouteRecordRaw, Router} from 'vue-router'
import DashboardView from '@/views/Dashboard.vue'

export const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'dashboard',
    component: DashboardView
},{
    path: '/run/:id([0-9]+)',
    name: 'run',
    component: () => import('@/views/QueryRunner.vue')
},{
    path: '/person/alcoholic/list',
    name: 'api_table_alcoholics',
    component: () => import('@/views/People/Alcoholics.vue')
},{
    path: '/person/inspector/list',
    name: 'api_table_inspectors',
    component: () => import('@/views/People/Inspectors.vue')
},{
    path: '/entity/drink/list',
    name: 'api_table_drinks',
    component: () => import('@/views/Entities/Drinks.vue')
},{
    path: '/entity/bed/list',
    name: 'api_table_beds',
    component: () => import('@/views/Entities/Beds.vue')
},{
    path: '/event/alco_party/list',
    name: 'api_table_alcopartyevent',
    component: () => import('@/views/Events/AlcoParty.vue')
},{
    path: '/event/join/list',
    name: 'api_table_joinevent',
    component: () => import('@/views/Events/Join.vue')
},{
    path: '/event/leave/list',
    name: 'api_table_leaveevent',
    component: () => import('@/views/Events/Leave.vue')
},{
    path: '/event/faint/list',
    name: 'api_table_faintevent',
    component: () => import('@/views/Events/Faint.vue')
},{
    path: '/event/escape/list',
    name: 'api_table_escapeevent',
    component: () => import('@/views/Events/Escape.vue')
},{
    path: '/event/bed_change/list',
    name: 'api_table_bedchangeevent',
    component: () => import('@/views/Events/BedChange.vue')
},{
    path: '/event/join/add',
    name: 'api_table_add_joinevent',
    component: () => import('@/views/Forms/Events/AddJoinEvent.vue')
},{
    path: '/event/leave/add',
    name: 'api_table_add_leaveevent',
    component: () => import('@/views/Forms/Events/AddLeaveEvent.vue')
},{
    path: '/event/escape/add',
    name: 'api_table_add_escapeevent',
    component: () => import('@/views/Forms/Events/AddEscapeEvent.vue')
},{
    path: '/event/faint/add',
    name: 'api_table_add_faintevent',
    component: () => import('@/views/Forms/Events/AddEscapeEvent.vue')
},{
    path: '/event/bed_change/add',
    name: 'api_table_add_bedchangeevent',
    component: () => import('@/views/Forms/Events/AddBedChangeEvent.vue')
},{
    path: '/event/alco_party/add',
    name: 'api_table_add_alcopartyeevent',
    component: () => import('@/views/Forms/Events/AddAlcoPartyEvent.vue')
},{
    path: '/other/about',
    name: 'about_view',
    component: () => import('@/views/About.vue')
}]

export const router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 };
    },
})

export default router;