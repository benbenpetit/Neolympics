<template>
  <div>
    <Timer />
    <SkateModal />
  </div>
  <canvas class="webgl"></canvas>
</template>

<script setup lang="ts">
import Button from '@/components/common/Button.vue'
import { onMounted } from 'vue'
import Experience from '@/webgl/Experience/Experience'
import Timer from '@/components/common/Timer.vue'
import SkateModal from '@/components/common/SkateModal.vue'

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
