<template>
  <IconFire :isValid="props.isValid" :isError="props.isError" />
  <span
    class="icon__minimarker"
    :class="[props.isValid && '--valid', props.isError && '--error']"
  />
</template>

<script setup lang="ts">
import IconFire from '@/components/common/IconFire.vue'
interface Props {
  isValid?: boolean
  isError?: boolean
}
const props = defineProps<Props>()
</script>
