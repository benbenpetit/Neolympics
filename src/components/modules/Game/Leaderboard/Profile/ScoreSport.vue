<template>
  <div class="c-score-sport" :class="!points && '--disabled'">
    <div class="c-score-sport__icon" v-if="sport">
      <img :src="sportIconSrc[sport]" />
    </div>
    <div class="c-score-sport__content">
      <span v-if="points">
        <span class="c-score-sport__content__big">{{ points ?? 0 }}</span
        >pt{{ points && 's' }}&nbsp;&nbsp;-&nbsp;&nbsp;<span
          class="c-score-sport__content__big"
          >{{ stars ?? 0 }}</span
        ><img src="/icon/microphone.svg" />
      </span>
      <span v-else class="c-score-sport__italic">À VENIR</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ISport } from '@/core/types/ISport'

interface Props {
  sport?: ISport
  points?: number
  stars?: number
}

const sportIconSrc: { [key in ISport]: string } = {
  break: '/icon/break-icon.svg',
  climbing: '/icon/climbing-icon.svg',
  skate: '/icon/skate-icon.svg',
  surf: '/icon/surf-icon.svg',
}

const { sport, points, stars } = defineProps<Props>()
</script>
