import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from '@/pages/Home.vue'
import QuizVue from '@/pages/Quiz.vue'
import ChoixEpreuveVue from '@/pages/ChoixEpreuve.vue'
import CompetitionLeaderboardVue from '@/pages/Competition/Leaderboard.vue'
import CompetitionSportVue from '@/pages/Competition/CompetitionSport.vue'
import TrainingVue from '@/pages/Training/Training.vue'
import TrainingSportVue from '@/pages/Training/TrainingSport.vue'
import publicRouters from '@/data/publicRouters'
import Federation from '@/pages/Federation.vue'

const routes = [
  { path: '/', component: HomeVue },
  // @TODO : remove /quiz
  { path: '/quiz', component: QuizVue },
  { path: `${publicRouters.COMPETITION_PREPARATION}`, component: ChoixEpreuveVue },
  { path: `${publicRouters.COMPETITION}/:sportSlug`, component: CompetitionSportVue },
  {
    path: `${publicRouters.COMPETITION_LEADERBOARD}`,
    component: CompetitionLeaderboardVue,
  },
  { path: `${publicRouters.TRAINING}`, component: TrainingVue },
  { path: `${publicRouters.TRAINING}/:sportSlug`, component: TrainingSportVue },
  { path: `${publicRouters.FEDERATION}`, component: Federation },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
