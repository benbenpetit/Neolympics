<template>
  <div
    class="c-loading-screen o-background-points"
    :class="`--difficulty-${skateDifficulty}`"
  >
    <img src="/img/loading.gif" alt="" class="loading-sreen__gif" />
    <div class="loading-screen__title">CHARGEMENT</div>
    <div class="loading-screen__bar-container">
      <div class="loading-screen__bar">
        <div
          class="loading-screen__bar-inside"
          :style="{ '--loadingWidth': `${Math.floor(loadingProgress)}%` }"
        ></div>
      </div>
      <div class="loading-screen__value invisible">100%</div>
      <div class="loading-screen__value">{{ Math.floor(loadingProgress) }}%</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import mittInstance from '@/core/lib/MittInstance'
import { gsap } from 'gsap'
import { ref } from 'vue'

const { skateDifficulty } = defineProps<Props>()

interface Props {
  skateDifficulty?: number
}

const loadingProgress = ref<number>(0)

mittInstance.on('Ressources loaded', (data: any) => {
  loadingProgress.value = data.loadingProgress
})

mittInstance.on('All ressources loaded', () => {
  gsap.to('.c-loading-screen', {
    y: '-100vw',
    duration: 1,
  })
})
</script>
