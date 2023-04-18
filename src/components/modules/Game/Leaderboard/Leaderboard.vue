<template>
  <div class="c-leaderboard o-container">
    <h2 class="c-leaderboard__subtitle">Les <span>big freak</span> des olympiques</h2>
    <div class="c-leaderboard__top-scores">
      <ul class="c-leaderboard__top-scores__list">
        <li
          v-for="(maxSession, index) in getSortedMaxSessionsWUser(maxSessions).slice(
            0,
            3,
          )"
        >
          <ResultCard
            :user="maxSession?.user"
            :maxSession="maxSession.maxSession"
            onlyTotalSession
            :podium="index + 1"
          />
        </li>
      </ul>
    </div>
    <Divider class="u-mt-double">
      <template v-slot:main>
        <span>Voir plus</span>
      </template>
    </Divider>
    <div class="c-leaderboard__low-scores">
      <ul class="c-leaderboard__low-scores__list">
        <li v-for="maxSession in getSortedMaxSessionsWUser(maxSessions).slice(3)">
          <ResultCard
            :user="maxSession?.user"
            :maxSession="maxSession.maxSession"
            :rank="maxSession?.maxSession?.rank"
            isHorizontal
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from '@/components/modules/Game/Leaderboard/Divider.vue'
import ResultCard from '@/components/modules/Game/Leaderboard/Profile/ResultCard.vue'
import { IMaxSessionWUser } from '@/core/types/IScore'
import { getSortedMaxSessionsWUser } from '@/core/utils/scores'

interface Props {
  maxSessions: IMaxSessionWUser[]
}

const { maxSessions } = defineProps<Props>()
</script>
