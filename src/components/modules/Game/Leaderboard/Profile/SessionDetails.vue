<template>
  <div class="c-session-details" :class="isHorizontal && '--horizontal'">
    <ScoreSport v-if="onlyTotalSession" :points="sportPoints" :stars="quizPoints" />
    <template v-else>
      <template v-if="isInProgress">
        <ScoreSport
          v-for="sportLabel in sportsOrder"
          :sport="sportLabel"
          :points="(maxSession as any)[sportLabel]"
          :stars="(maxSession as any)[sportLabel + 'Quiz']"
        />
      </template>
      <template v-else>
        <ScoreSport
          sport="break"
          :points="maxSession?.break"
          :stars="maxSession?.breakQuiz"
        />
        <ScoreSport
          sport="climbing"
          :points="maxSession?.climbing"
          :stars="maxSession?.climbingQuiz"
        />
        <ScoreSport
          sport="skate"
          :points="maxSession?.skate"
          :stars="maxSession?.skateQuiz"
        />
        <ScoreSport
          sport="surf"
          :points="maxSession?.surf"
          :stars="maxSession?.surfQuiz"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import ScoreSport from '@/components/modules/Game/Leaderboard/Profile/ScoreSport.vue'
import { IMaxSession } from '@/core/types/IScore'
import { computed } from '@vue/reactivity'
import { useSportStore } from '@/core/store/sport'
import { SPORTS } from '@/data/constants'
import { getArrayUnique } from '@/core/utils/functions'

interface Props {
  maxSession?: IMaxSession
  isHorizontal?: boolean
  onlyTotalSession?: boolean
  isInProgress?: boolean
}

const { maxSession, isHorizontal, onlyTotalSession, isInProgress } = defineProps<Props>()
const { sportState } = useSportStore()
const sportsOrder = computed(() =>
  getArrayUnique([
    ...sportState.doneSports.map((doneSport) => doneSport.sport),
    ...SPORTS,
  ]),
)

const sportPoints = computed(() => {
  return (
    (maxSession?.skate ?? 0) +
    (maxSession?.surf ?? 0) +
    (maxSession?.break ?? 0) +
    (maxSession?.climbing ?? 0)
  )
})

const quizPoints = computed(() => {
  return (
    (maxSession?.skateQuiz ?? 0) +
    (maxSession?.surfQuiz ?? 0) +
    (maxSession?.breakQuiz ?? 0) +
    (maxSession?.climbingQuiz ?? 0)
  )
})
</script>
