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
import { useCollection, useCurrentUser } from 'vuefire'
import { IUser } from '@/core/types/IUser'
import { getSortedInProgressMaxSessions } from '@/core/utils/scores'
import { collection } from 'firebase/firestore'
import { db } from '@/firebase'

const { sportState, setSportStep } = useSportStore()
const { scoreState } = useScoreStore()
const currentUser = useCurrentUser()
const realtimeMaxSessions = useCollection(collection(db, 'maxSessions'))
const realtimeUsers = useCollection(collection(db, 'users'))
const maxSessions = ref<IMaxSessionWUser[]>([])
const localMaxSession = ref<IMaxSessionWUser>({ maxSession: {} })
const skateStep = computed(
  () => sportState.doneSports.find((doneSport) => doneSport.sport === 'skate')?.step ?? 0,
)

const fetchMaxSessions = async () => {
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
}

watch(currentUser, async () => {
  await fetchMaxSessions()
})

watch(
  [sportState.doneSports, realtimeMaxSessions, realtimeUsers],
  async () => {
    await fetchMaxSessions()
  },
  { immediate: true, deep: true },
)
</script>
