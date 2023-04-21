<template>
  <IconFire :isValid="isValid" :isError="isError" />
  <span class="icon__minimarker" :class="[isValid && '--valid', isError && '--error']" />
</template>

<script setup lang="ts">
import IconFire from '@/components/common/IconFire.vue'
interface Props {
  isValid?: boolean
  isError?: boolean
}
const { isValid, isError } = defineProps<Props>()
</script>
