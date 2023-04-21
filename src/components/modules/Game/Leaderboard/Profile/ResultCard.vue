<template>
  <div
    class="c-result-card"
    :class="[
      isHorizontal && '--horizontal',
      isActive && '--active',
      podium === 1 && '--big',
    ]"
  >
    <div class="c-result-card__rank" v-if="isHorizontal && (rank || maxSession?.rank)">
      <span>{{ rank ?? maxSession?.rank }}e</span>
    </div>
    <div class="c-result-card__content">
      <img
        class="c-result-card__pic"
        :src="user?.photoURL ?? placeholderPic"
        :alt="`${user?.displayName}'s profile picture`"
        referrerpolicy="no-referrer"
      />
      <div class="c-result-card__pseudo">
        <span>@{{ user?.displayName ?? 'Pseudo' }}</span>
      </div>
      <SessionDetails
        class="c-result-card__stat"
        :maxSession="maxSession"
        :isHorizontal="isHorizontal"
        :onlyTotalSession="onlyTotalSession"
        :isInProgress="isInProgress"
      />
      <div class="c-result-card__sticker" v-if="podium">
        <img :src="rankBrush[podium - 1]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaxSession } from '@/core/types/IScore'
import { IUser } from '@/core/types/IUser'
import { computed } from 'vue'
import placeholderPic from '@/assets/temp/profile-pic.png'
import SessionDetails from '@/components/modules/Game/Leaderboard/Profile/SessionDetails.vue'
import { useCurrentUser } from 'vuefire'

interface Props {
  user?: IUser
  maxSession: IMaxSession
  rank?: number
  isHorizontal?: boolean
  onlyTotalSession?: boolean
  podium?: number
  isInProgress?: boolean
}

const { user, maxSession, rank, isHorizontal, onlyTotalSession, podium, isInProgress } =
  defineProps<Props>()
const isActive = computed(() => maxSession?.userId === currentUser?.value?.uid)
const currentUser = useCurrentUser()

const rankBrush: string[] = [
  '/img/rank-brush-1.png',
  '/img/rank-brush-2.png',
  '/img/rank-brush-3.png',
]
</script>
