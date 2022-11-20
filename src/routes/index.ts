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
}]

export const router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 };
    },
})

export default router;