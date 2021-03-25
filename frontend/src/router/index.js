import { createRouter, createWebHistory } from 'vue-router'

const TccBacklog = () => import('../views/TccBacklog/index.vue')

export const routes = [
  {
    path: '/',
    name: 'TccBacklog',
    component: TccBacklog
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: { name: 'Home' }
  // }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})


export default router