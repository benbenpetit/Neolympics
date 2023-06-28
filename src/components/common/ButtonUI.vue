<template>
  <button
    @click="
      () => {
        clickSound()
        emit('onClick')
      }
    "
    class="c-buttonUI"
    :class="props.isActive && '--red'"
    ref="domButtonRef"
  >
    <div class="c-buttonUI-content">
      <p v-if="hasSlot('label')"><slot name="label"></slot></p>
      <slot name="icon" v-if="props.imgSrc"><img :src="props.imgSrc" alt="" /></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { Howl, Howler } from 'howler'
import { ref, useSlots } from 'vue'

const emit = defineEmits(['onClick'])

const props = withDefaults(defineProps<Props>(), {
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
const slots = useSlots()

defineExpose({ domButtonRef })

const hasSlot = (name: string) => {
  return !!slots[name]
}

let buttonUISound = new Howl({
  src: ['/sounds/ui-sounds/button-beep2.mp3'],
  volume: 0.1,
})

const clickSound = () => {
  if (props.sound) {
    buttonUISound.play()
  }
}
</script>
