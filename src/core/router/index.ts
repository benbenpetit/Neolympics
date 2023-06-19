import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from '@/pages/Home.vue'
import QuizVue from '@/pages/Quiz.vue'
import ChoixEpreuveVue from '@/pages/ChoixEpreuve.vue'
import RegisterVue from '@/pages/Register.vue'
import SignInVue from '@/pages/SignIn.vue'
import PatternVue from '@/pages/Pattern.vue'
import SceneVue from '@/components/views/Scene.vue'
import CompetitionVue from '@/pages/Competition/Competition.vue'
import CompetitionLeaderboardVue from '@/pages/Competition/Leaderboard.vue'
import CompetitionSportVue from '@/pages/Competition/CompetitionSport.vue'
import TrainingVue from '@/pages/Training/Training.vue'
import TrainingSportVue from '@/pages/Training/TrainingSport.vue'
import publicRouters from '@/data/publicRouters'

const routes = [
  { path: '/', component: HomeVue },
  { path: '/register', component: RegisterVue },
  { path: '/sign-in', component: SignInVue },
  { path: '/quiz', component: QuizVue },
  { path: '/choix-epreuve', component: ChoixEpreuveVue },
  { path: '/three', component: SceneVue },
  { path: '/pattern', component: PatternVue },

  { path: `${publicRouters.COMPETITION}`, component: CompetitionVue },
  { path: `${publicRouters.COMPETITION_PREPARATION}`, component: ChoixEpreuveVue },
  { path: `${publicRouters.COMPETITION}/:sportSlug`, component: CompetitionSportVue },
  {
    path: `${publicRouters.COMPETITION_LEADERBOARD}`,
    component: CompetitionLeaderboardVue,
  },
  { path: `${publicRouters.TRAINING}`, component: TrainingVue },
  { path: `${publicRouters.TRAINING}/:sportSlug`, component: TrainingSportVue },
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
