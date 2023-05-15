<template>
  <div>Home</div>
  <router-link to="/competition">Compétition</router-link>
  <router-link :to="publicRouters.TRAINING">Entraînement</router-link>
</template>

<script setup lang="ts">
import router from '@/core/router'
import publicRouters from '@/data/publicRouters'
import { onMounted } from 'vue'

onMounted(() => {
  router.push('/competition/preparation')
})
</script>
