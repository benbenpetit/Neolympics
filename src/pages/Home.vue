<template>
  <div>Home</div>
  <router-link to="/competition">Compétition</router-link>
  <router-link :to="publicRouters.TRAINING">Entraînement</router-link>
</template>

<script setup lang="ts">
import publicRouters from '@/data/publicRouters'
</script>
