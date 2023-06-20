<template>
  <div>
    <Scene v-if="skateStep === 0" />
    <Quiz v-if="skateStep === 1" />
    <Leaderboard
      v-if="skateStep === 2"
      :maxSessions="maxSessions"
      :localMaxSession="localMaxSession"
      isInProgress
    />
  </div>
</template>

<script setup lang="ts">
import Leaderboard from '@/components/modules/Game/Leaderboard/Leaderboard.vue'
import Scene from '@/components/views/Scene.vue'
import { IGlobalScores, IMaxSessionWUser } from '@/core/types/IScore'
import { ref, watch, computed, onMounted } from 'vue'
import { useScoreStore } from '@/core/store/score'
import { useSportStore } from '@/core/store/sport'
import { getAllMaxSessions } from '@/core/services/api/leaderboardApi'
import Quiz from '@/pages/Quiz.vue'
import { useCurrentUser } from 'vuefire'
import { IUser } from '@/core/types/IUser'
import { getSortedInProgressMaxSessions } from '@/core/utils/scores'

const { sportState, setSportStep } = useSportStore()
const { scoreState } = useScoreStore()
const currentUser = useCurrentUser()
const maxSessions = ref<IMaxSessionWUser[]>([])
const localMaxSession = ref<IMaxSessionWUser>({ maxSession: {} })
const skateStep = computed(
  () => sportState.doneSports.find((doneSport) => doneSport.sport === 'skate')?.step ?? 0,
)

onMounted(() => {
  setSportStep('skate', 2)
})

watch(
  [sportState.doneSports, currentUser, scoreState],
  async () => {
    const firebaseMaxSessions = await getAllMaxSessions()

    const playedSports = Object.keys(scoreState.currentScores).filter(
      (sport) => scoreState.currentScores[sport as keyof {}],
    )

    const currentScores = [
      ...playedSports.map((playedSport) => ({
        [playedSport]: scoreState.currentScores[playedSport as keyof {}],
      })),
    ]
    const currentMaxSession = {
      maxSession: Object.assign({}, ...currentScores),
      user: currentUser.value?.uid
        ? ({
            id: currentUser.value.uid,
            displayName: currentUser.value.displayName,
            photoURL: currentUser.value.photoURL,
          } as IUser)
        : undefined,
    }

    localMaxSession.value = currentMaxSession

    const concatenatedMaxSessions = currentUser.value
      ? firebaseMaxSessions
      : firebaseMaxSessions.concat(currentMaxSession)

    maxSessions.value = getSortedInProgressMaxSessions(
      concatenatedMaxSessions,
      sportState.doneSports.map(({ sport }) => sport),
    )
  },
  { immediate: true },
)
</script>
