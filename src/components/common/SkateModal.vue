<template>
  <div class="w-modal">
    <div class="pattern-title">
      <div v-if="state == 'preparation'">Reproduis ce tracé</div>
      <div v-if="state == 'playing'" class="playing">A toi de jouer !</div>
      <div v-if="state == 'playing'" class="timebar"></div>
    </div>
    <SkatePattern v-if="state == 'preparation'" />
    <Pattern v-if="state == 'playing'" :patternToDo="[11, 2, 13, 9, 10]" />
  </div>
</template>

<script setup lang="ts">
import Pattern from '@/pages/Pattern.vue'
import SkatePattern from '@/components/common/SkatePattern.vue'
import mittInstance from '@/core/lib/MittInstance'
import { ref } from 'vue'

const state = ref<String>('')

state.value = 'preparation'

setTimeout(() => {
  state.value = 'playing'
  setTimeout(() => {
    mittInstance.emit('Pattern time finished')
  }, 5000)
}, 10000)
</script>
