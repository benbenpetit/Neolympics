<template>
  <div>
    <Button @onClick="store.increment(1)">Count++</Button>
    <Button @onClick="store.reset">Reset</Button>
    <span>{{ store.count }}</span>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/common/Button.vue'
import { useCounterStore } from '@/core/store/counter'

const store = useCounterStore()
</script>
