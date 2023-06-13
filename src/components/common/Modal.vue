<template>
  <div class="c-modal-wrapper">
    <span class="c-modal-wrapper__backdrop" @click="emits('onBackdropClick')" />
    <div class="c-modal-upper-img">
      <slot name="upper-img"></slot>
    </div>
    <div class="c-modal">
      <div class="c-modal-title">
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
</template>

<script setup lang="ts">
const { imgSrc } = defineProps<Props>()

interface Props {
  imgSrc?: string
}

const emits = defineEmits(['onBackdropClick'])
</script>
