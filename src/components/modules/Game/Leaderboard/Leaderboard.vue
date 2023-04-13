<template>
  <div class="c-leaderboard">
    <h2 class="c-leaderboard__subtitle">Les <span>big freak</span> des olympiques</h2>
    <div class="c-leaderboard__scores o-container">
      <ul class="c-leaderboard__scores__list">
        <li v-for="maxSession in maxSessions">
          <ResultCard :user="maxSession?.user" :maxSession="maxSession.maxSession" />
        </li>
      </ul>
      <Divider class="u-mt-double">
        <template v-slot:main>
          <span>Voir plus</span>
        </template>
      </Divider>
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from '@/components/modules/Game/Leaderboard/Divider.vue'
import ResultCard from '@/components/modules/Game/Leaderboard/Profile/ResultCard.vue'
import { IMaxSessionWUser } from '@/core/types/IScore'

interface Props {
  maxSessions: IMaxSessionWUser[]
}

const { maxSessions } = defineProps<Props>()
</script>
