<template>
  <div>
    <h1>Animation qui joue</h1>
    <template v-for="sport in SPORTS">
      <router-link :to="`${publicRouters.TRAINING}/${sport}`">{{
        sport.toUpperCase()
      }}</router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { SPORTS } from '@/data/constants'
import publicRouters from '@/data/publicRouters'
</script>
