<template>
  <button @click="$emit('handleClick')" class="c-buttonUI --red">
    <div class="c-buttonUI-content">
      <p><slot name="label">Nom du bouton</slot></p>
      <slot name="icon"><img :src="imgSrc" alt="" /></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
const { imgSrc } = defineProps<Props>()

interface Props {
  imgSrc: string
}
</script>
