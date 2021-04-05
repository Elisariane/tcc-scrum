import { createRouter, createWebHistory } from 'vue-router'

const TccBacklog = () => import('../views/TccBacklog/index.vue')
const Login = () => import('../views/Login/index.vue')
const SignUp = () => import('../views/SignUp/index.vue')
const Dashboard = () => import('../views/Dashboard/index.vue')
const CriarSprint = () => import('../views/CriarSprint/index.vue')
const Profile = () => import('../views/Profile/index.vue')

export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/tcc-backlog',
    name: 'TccBacklog',
    component: TccBacklog
  },
  {
    path: '/criar-sprint',
    name: 'CriarSprint',
    component: CriarSprint
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Dashboard' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})


export default router
