<template>
  <button class="c-button" @click="emit('onClick')">
    <slot />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['onClick'])
</script>
