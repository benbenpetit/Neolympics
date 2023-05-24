<template>
  <!-- <button @click="emit('handleClick')" class="c-buttonUI" :class="isActive && '--red'"> -->
  <button
    @click="sound ? clickSound() : ''"
    class="c-buttonUI"
    :class="isActive && '--red'"
  >
    <div class="c-buttonUI-content">
      <p><slot name="label"></slot></p>
      <slot name="icon" v-if="imgSrc"><img :src="imgSrc" alt="" /></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { Howl, Howler } from 'howler'

const { imgSrc, isActive } = withDefaults(defineProps<Props>(), {
  imgSrc: undefined,
  isActive: true,
  sound: true,
})

interface Props {
  imgSrc?: string
  isActive?: boolean
  sound?: boolean
}

let buttonUISound = new Howl({
  src: ['/sounds/ui-sounds/button-beep2.mp3'],
  volume: 0.1,
})

const clickSound = () => {
  buttonUISound.play()
}
</script>
