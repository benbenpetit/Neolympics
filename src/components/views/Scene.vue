<template>
  <Timer />
  <Modal v-if="state == 'tutorial'" imgSrc="null" class="--blue skate-tutorial">
    <template v-slot:title>Tutoriel</template>
    <template v-slot:content>
      <div class="tutoriel-content">
        <Pattern />
        <p>
          Reproduis les <b>motifs</b> le plus vite possible pour réaliser des
          <b>figures de skate</b> dans <b>le temps imparti.</b> <br /><br />
          Pour ce niveau, tu as <b>5 secondes</b> pour réaliser chaque figure !
        </p>
      </div>
    </template>
    <template v-slot:buttons>
      <div class="trial-details">
        <div class="detail-container"><IconTImer /> 45 secondes</div>
        <div class="detail-container"><IconSkate /> 5 figures</div>
      </div>
      <ButtonUI imgSrc="/icon/go.svg" class="--no-hover" @click="startTimer">
        <template v-slot:label>J'ai compris !</template>
      </ButtonUI>
    </template>
  </Modal>
  <SkateModal v-if="state == 'figure'" />
  <canvas class="webgl"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Experience from '@/webgl/Experience/Experience'
import Timer from '@/components/common/Timer.vue'
import SkateModal from '@/components/common/SkateModal.vue'
import Modal from '@/components/common/Modal.vue'
import Pattern from '@/pages/Pattern.vue'
import mittInstance from '@/core/lib/MittInstance'
import ButtonUI from '@/components/common/ButtonUI.vue'
import IconSkate from '@/components/common/IconSkate.vue'
import IconTImer from '@/components/common/IconTImer.vue'

const experience = ref<Experience | null>(null)

onMounted(() => {
  const experience = new Experience(document.querySelector('canvas.webgl'))
  mittInstance.emit('Start skate intro')
})

const state = ref<String>('')

mittInstance.on('Skate intro finished', () => {
  state.value = 'tutorial'
})

const startTimer = () => {
  mittInstance.emit('Start Timer')
  state.value = ''
}
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
  z-index: -2;
}
</style>
