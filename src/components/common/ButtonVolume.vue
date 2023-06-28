<template>
  <button @click="volume = !volume" class="c-button-volume">
    <img :src="volume ? soundOnSrc : soundOffSrc" alt="speaker icon" />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const volume = ref(true)
const soundOnSrc = '/icon/sound-on.svg'
const soundOffSrc = '/icon/sound-off.svg'
</script>
