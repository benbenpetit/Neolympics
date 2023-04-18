<template>
  <div class="c-session-details" :class="isHorizontal && '--horizontal'">
    <ScoreSport v-if="onlyTotalSession" :points="sportPoints" :stars="quizPoints" />
    <template v-else>
      <ScoreSport
        v-if="maxSession?.break"
        sport="break"
        :points="maxSession?.break"
        :stars="maxSession?.breakQuiz"
      />
      <ScoreSport
        v-if="maxSession?.climbing"
        sport="climbing"
        :points="maxSession?.climbing"
        :stars="maxSession?.climbingQuiz"
      />
      <ScoreSport
        v-if="maxSession?.skate"
        sport="skate"
        :points="maxSession?.skate"
        :stars="maxSession?.skateQuiz"
      />
      <ScoreSport
        v-if="maxSession?.surf"
        sport="surf"
        :points="maxSession?.surf"
        :stars="maxSession?.surfQuiz"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import ScoreSport from '@/components/modules/Game/Leaderboard/Profile/ScoreSport.vue'
import { IMaxSession } from '@/core/types/IScore'
import { computed } from '@vue/reactivity'

interface Props {
  maxSession?: IMaxSession
  isHorizontal?: boolean
  onlyTotalSession?: boolean
}

const { maxSession, isHorizontal, onlyTotalSession } = defineProps<Props>()

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
