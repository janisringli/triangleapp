import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Calculator from '../views/Rechner.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
