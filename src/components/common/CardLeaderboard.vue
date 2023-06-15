<template>
  <div class="c-card-leaderboard-wrapper">
    <div class="c-card-leaderboard">
      <div class="c-card-leaderboard-name">
        <span class="--inverted-skew">
          #{{ props.rank }} @{{ props.user?.displayName }}
        </span>
      </div>
      <div class="c-card-leaderboard-content">
        <img
          :src="props.user?.photoURL ?? placeholderPic"
          alt=""
          referrerpolicy="no-referrer"
        />
        <span class="card-score"
          >{{ props.points }}pts + {{ props.quiz }} <img src="/icon/microphone.svg"
        /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IUser } from '@/core/types/IUser'
import placeholderPic from '@/assets/temp/profile-pic.webp'

interface Props {
  rank: number
  user?: IUser
  points: number
  quiz: number
}

const props = defineProps<Props>()
</script>
