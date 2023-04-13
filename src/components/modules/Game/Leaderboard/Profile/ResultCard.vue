<template>
  <div class="c-result-card" :class="isHorizontal && '--horizontal'">
    <div class="c-result-card__rank" v-if="isHorizontal">
      <span>{{ rank }}</span>
    </div>
    <div>
      <img
        class="c-result-card__pic"
        :src="user?.photoURL ?? placeholderPic"
        :alt="`${user?.displayName}'s profile picture`"
        referrerpolicy="no-referrer"
      />
      <span class="c-result-card__pseudo">@{{ user?.displayName ?? 'Pseudo' }}</span>
      <div class="c-result-card__stat">
        <span>{{ sportPoints }}pts + {{ quizPoints }}✨</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaxSession } from '@/core/types/IScore'
import { IUser } from '@/core/types/IUser'
import { computed } from 'vue'
import placeholderPic from '@/assets/temp/profile-pic.png'

interface Props {
  user?: IUser
  maxSession: IMaxSession
  rank?: number
  isHorizontal?: boolean
}

const { user, maxSession, rank, isHorizontal } = defineProps<Props>()

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
