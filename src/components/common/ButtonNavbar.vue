<template>
  <button @click="$emit('handleClick')" class="c-button-navbar">
    <img :src="imgSrc" alt="" />
    <p><slot name="label">Nom du bouton</slot></p>
  </button>
</template>

<script setup lang="ts">
const { imgSrc } = defineProps<Props>()

interface Props {
  imgSrc: string
}
</script>
