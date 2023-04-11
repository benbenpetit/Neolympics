<template>
  <button class="c-button">{{ label }}</button>
</template>

<script setup lang="ts">
interface Props {
  label: string
}

const { label } = defineProps<Props>()
</script>
