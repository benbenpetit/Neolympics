import Home from '@/components/views/Home.vue'
import SceneVue from '@/components/views/Scene.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/three', name: 'Three', component: SceneVue },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
