<template>
  <div
    class="c-result-card"
    :class="[
      props?.isHorizontal && '--horizontal',
      isActive && '--active',
      props?.podium === 1 && '--big',
    ]"
  >
    <div
      class="c-result-card__rank"
      v-if="props?.isHorizontal && (props?.rank || props?.maxSession?.rank)"
    >
      <span>{{ props?.rank ?? props?.maxSession?.rank }}e</span>
    </div>
    <div class="c-result-card__content">
      <img
        class="c-result-card__pic"
        :src="props?.user?.photoURL ?? placeholderPic"
        :alt="`${props?.user?.displayName}'s profile picture`"
        referrerpolicy="no-referrer"
      />
      <div class="c-result-card__pseudo">
        <span>@{{ props?.user?.displayName ?? 'Moi' }}</span>
      </div>
      <SessionDetails
        class="c-result-card__stat"
        :maxSession="props?.maxSession"
        :isHorizontal="props?.isHorizontal"
        :onlyTotalSession="props?.onlyTotalSession"
        :isInProgress="props?.isInProgress"
      />
      <div class="c-result-card__sticker" v-if="props?.podium">
        <img :src="rankBrush[props?.podium - 1]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaxSession } from '@/core/types/IScore'
import { IUser } from '@/core/types/IUser'
import { computed } from 'vue'
import placeholderPic from '@/assets/temp/profile-pic.webp'
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

const props = defineProps<Props>()
const isActive = computed(() => props?.user?.id === currentUser?.value?.uid)
const currentUser = useCurrentUser()

const rankBrush: string[] = [
  '/img/rank-brush-1.png',
  '/img/rank-brush-2.png',
  '/img/rank-brush-3.png',
]
</script>
