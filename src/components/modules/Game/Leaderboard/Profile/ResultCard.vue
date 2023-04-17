<template>
  <div
    class="c-result-card"
    :class="[isHorizontal && '--horizontal', isActive && '--active']"
  >
    <div class="c-result-card__rank" v-if="isHorizontal">
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
      />
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
}

const { user, maxSession, rank, isHorizontal, onlyTotalSession } = defineProps<Props>()
const isActive = computed(() => maxSession?.userId === currentUser?.value?.uid)
const currentUser = useCurrentUser()
</script>
