<template>
  <div>
    <Leaderboard :maxSessions="maxSessions" />
  </div>
</template>

<script setup lang="ts">
import Leaderboard from '@/components/modules/Game/Leaderboard/Leaderboard.vue'
import { getAllMaxSessions } from '@/core/services/api/leaderboardApi'
import { IMaxSessionWUser } from '@/core/types/IScore'
import { ref, onMounted } from 'vue'

const maxSessions = ref<IMaxSessionWUser[]>([])

onMounted(async () => {
  maxSessions.value = await getAllMaxSessions()
})
</script>
