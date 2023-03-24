import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/Home.vue') },
  { path: '/register', component: () => import('@/pages/Register.vue') },
  { path: '/sign-in', component: () => import('@/pages/SignIn.vue') },
  {
    path: '/feed',
    component: () => import('@/pages/Feed.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/game',
    component: () => import('@/pages/Game.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject,
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
