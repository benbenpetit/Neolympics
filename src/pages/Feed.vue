<template>
  <div>
    <div v-for="{ createdAt, points, userId } in scoresSkate">
      <span>Time : {{ createdAt }};</span>
      <span>Points : {{ points }};</span>
      <span>User Id : {{ userId }};</span>
    </div>
    <form @submit="handleAddScoreSubmit">
      <input type="number" v-model="points" placeholder="points" />
      <input type="text" v-model="userId" placeholder="userId" />
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useCurrentUser } from 'vuefire'
import { ref, onMounted } from 'vue'
import { addScoreSkate, getAllScoresByUserId } from '@/core/services/api/leaderboardApi'
import { IScore } from '@/core/types/IScore'

const points = ref(0)
const userId = ref('')

const currentUserId = useCurrentUser().value?.uid || ''

const scoresSkate = ref<IScore[]>([])

onMounted(async () => {
  scoresSkate.value = await getAllScoresByUserId(currentUserId)
})

const handleAddScoreSubmit = (e: Event) => {
  e.preventDefault()

  addScoreSkate({
    createdAt: new Date(),
    points: points.value || 0,
    userId: userId.value,
  })
    .then(() => {
      points.value = 0
      userId.value = ''
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
