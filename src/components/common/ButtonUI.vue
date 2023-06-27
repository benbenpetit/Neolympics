<template>
  <button
    @click="
      () => {
        clickSound()
        emit('onClick')
      }
    "
    class="c-buttonUI"
    :class="isActive && '--red'"
    ref="domButtonRef"
  >
    <div class="c-buttonUI-content">
      <p><slot name="label"></slot></p>
      <slot name="icon" v-if="imgSrc"><img :src="imgSrc" alt="" /></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { Howl, Howler } from 'howler'
import { ref } from 'vue'

const emit = defineEmits(['onClick'])

const { imgSrc, isActive, sound } = withDefaults(defineProps<Props>(), {
  imgSrc: undefined,
  isActive: true,
  sound: true,
})

interface Props {
  imgSrc?: string
  isActive?: boolean
  sound?: boolean
}

const domButtonRef = ref<HTMLButtonElement | null>(null)

defineExpose({ domButtonRef })

let buttonUISound = new Howl({
  src: ['/sounds/ui-sounds/button-beep2.mp3'],
  volume: 0.1,
})

const clickSound = () => {
  if (sound) {
    buttonUISound.play()
  }
}
</script>
