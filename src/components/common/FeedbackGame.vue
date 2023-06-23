<template>
  <img :src="props.imgSrc" alt="" class="c-feedbackGame" />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  imgSrc: undefined,
})
interface Props {
  imgSrc?: string
}
</script>
