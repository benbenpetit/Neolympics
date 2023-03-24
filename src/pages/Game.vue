<template>
  <div>
    <div v-for="({ points }, index) in topScores">
      <span>.0{{ index + 1 }} : {{ points }} pts</span>
    </div>
    <div v-for="{ points } in surroundingScores">
      <span>{{ points }} pts</span>
    </div>
    <button
      @click="
        addScoreSkate({
          points: Math.floor(Math.random() * 40),
          userId: 'kZL5VUAUmZejNP1mYAx8SedtxqE3',
        })
      "
    >
      Click add score
    </button>
  </div>
</template>

<script setup lang="ts">
import { getAllScoresBySport, addScoreSkate } from '@/core/services/api/leaderboardApi'
import { IScore } from '@/core/types/IScore'
import { ref, onMounted } from 'vue'
import { useCurrentUser } from 'vuefire'

const topScores = ref<IScore[]>([])
const surroundingScores = ref<IScore[]>([])
const user = useCurrentUser()

const getUserSurroundingScores = (userId: string = '', inScores: IScore[]) => {
  const userScoreIndex = inScores.map((score) => score.userId).indexOf(userId)

  if (userScoreIndex === -1) {
    return []
  }

  return inScores.slice(userScoreIndex - 1, userScoreIndex + 2)
}

onMounted(async () => {
  const allSkateScores = await getAllScoresBySport('skate')
  topScores.value = allSkateScores.slice(0, 3)
  surroundingScores.value = getUserSurroundingScores(user.value?.uid, allSkateScores)
})
</script>
