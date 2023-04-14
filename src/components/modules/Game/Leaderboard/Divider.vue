<template>
  <div class="c-divider" @click="emit('onClick')">
    <div class="c-divider__inside" v-if="hasSlot('main')">
      <slot name="main" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const emit = defineEmits(['onClick'])
const slots = useSlots()

const hasSlot = (name: string) => !!slots[name]
</script>
