<template>
  <div class="c-divider" @click="emit('onClick')">
    <button class="c-divider__inside" v-if="hasSlot('main')">
      <slot name="main" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const emit = defineEmits(['onClick'])
const slots = useSlots()

const hasSlot = (name: string) => !!slots[name]
</script>
