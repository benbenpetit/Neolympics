<template>
  <div>
    <h1>Scene Vue</h1>
    <Button label="Click me" />
  </div>
  <canvas class="webgl"></canvas>
</template>

<script setup lang="ts">
import Button from '@/components/common/Button.vue'
import Sketch from '@/webgl/Sketch'
import { onMounted } from 'vue'
import Experience from '@/webgl/Experience/Experience'

onMounted(() => {
  const experience = new Experience(document.querySelector('canvas.webgl'))
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.webgl {
  display: block;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
