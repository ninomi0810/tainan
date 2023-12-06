import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Person from '../views/Person.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/HomeView',
      name: 'HomeView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
    path: '/Attration',
      name: 'Attration',
      component: () => import('../views/Attration.vue')
    },
    {
      path: '/Person',
      name: 'Person',
      component: () => import('../views/Person.vue')
    },
    {
    path:'/ParkingSpace',
      name: 'ParkingSpace',
      component: () => import('../views/ParkingSpace.vue')
      },
      {
        path: '/res',
        name: 'res',
        component: () => import('../views/res.vue')
      },
  ] 
})

export default router
