<template>
  <div class="c-score-sport">
    <div class="c-score-sport__icon" v-if="sport">
      <img :src="sportIconSrc[sport]" />
    </div>
    <div class="c-score-sport__content">
      <span>
        <span class="c-score-sport__content__big">{{ points ?? 0 }}</span
        >pt{{ points && 's' }}&nbsp;&nbsp;-&nbsp;&nbsp;<span
          class="c-score-sport__content__big"
          >{{ stars ?? 0 }}</span
        >✨
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ISport } from '@/core/types/ISport'

interface Props {
  sport?: ISport
  points?: number
  stars?: number
}

const sportIconSrc: { [key in ISport]: string } = {
  break: '/icon/skate-icon.svg',
  climbing: '/icon/skate-icon.svg',
  skate: '/icon/skate-icon.svg',
  surf: '/icon/skate-icon.svg',
}

const { sport, points, stars } = defineProps<Props>()
</script>
