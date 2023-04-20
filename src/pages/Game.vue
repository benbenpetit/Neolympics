<template>
  <div>
    <GameNav />
    <h1>{{ $route.params.id }}</h1>
    <KeepAlive>
      <component :is="dynamicComponent" />
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import GameNav from '@/components/common/GameNav.vue'
import Skate from '@/components/modules/Game/Skate/Skate.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const dynamicComponent = computed(() => {
  switch (route.params.id) {
    case 'skate':
      return Skate
  }
})
</script>
