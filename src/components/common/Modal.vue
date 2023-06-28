<template>
  <div class="c-modal-wrapper">
    <span class="c-modal-wrapper__backdrop" @click="emits('onBackdropClick')" />
    <div class="c-modal-upper-img">
      <slot name="upper-img"></slot>
    </div>
    <div class="c-modal-wrapper__voila" ref="modalRef">
      <div class="c-modal">
        <div class="c-modal-title" v-if="hasSlot('title')">
          <img v-if="imgSrc" :src="imgSrc" alt="" />
          <h1>
            <slot name="title">nom</slot>
          </h1>
        </div>
        <div class="c-modal-content">
          <slot name="content"><p>content</p></slot>
        </div>
      </div>

      <div class="c-modal-buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { onMounted, ref, useSlots } from 'vue'

const { imgSrc, isAnim } = withDefaults(defineProps<Props>(), {
  isAnim: true,
})

interface Props {
  imgSrc?: string
  isAnim?: boolean
}

const emits = defineEmits(['onBackdropClick'])
const slots = useSlots()
const modalRef = ref<HTMLDivElement | null>(null)

const hasSlot = (name: string) => {
  return !!slots[name]
}

onMounted(() => {
  if (isAnim) {
    gsap.from(modalRef.value, {
      opacity: 0,
      y: 8,
      duration: 0.4,
      ease: 'Power2.easeInOut',
    })
  }
})
</script>
