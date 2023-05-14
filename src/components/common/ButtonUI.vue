<template>
  <button @click="$emit('handleClick')" class="c-buttonUI" :class="isActive && '--red'">
    <div class="c-buttonUI-content">
      <p><slot name="label">Nom du bouton</slot></p>
      <slot name="icon" v-if="imgSrc"><img :src="imgSrc" alt="" /></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
const { imgSrc, isActive } = withDefaults(defineProps<Props>(), {
  imgSrc: undefined,
  isActive: true,
})

interface Props {
  imgSrc?: string
  isActive?: boolean
}
</script>
