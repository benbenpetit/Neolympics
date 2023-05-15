<template>
  <Timer />
  <Modal v-if="state == 'tutorial'" imgSrc="null" class="--blue skate-tutorial">
    <template v-slot:title>Tutoriel</template>
    <template v-slot:content>
      <div class="tutoriel-content">
        <SkatePattern />
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
  <SkateModal v-if="state == 'figure'" :patternToDo="patternToDo" />
  <Modal v-if="state == 'result'" imgSrc="null" class="--blue skate-tutorial">
    <template v-slot:title>Fin de l'épreuve</template>
    <template v-slot:content>
      <div>
        <p>Bravo tu as fini l'épreuve !</p>
        <ButtonUI imgSrc="/icon/go.svg" class="--no-hover" @click="endEpreuve">
          <template v-slot:label>Continuer</template>
        </ButtonUI>
      </div>
    </template>
  </Modal>
  <div
    v-if="figureResult != ''"
    class="figure-result"
    :class="figureResult == 'Parfait !' ? 'blue' : 'red'"
  >
    <img :src="result == 'gagné' ? '/img/brush-blue.png' : '/img/brush-red.png'" alt="" />
    <span class="result-text">{{ figureResult }}</span>
  </div>
  <canvas class="webgl"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Experience from '@/webgl/Experience/Experience'
import Timer from '@/components/common/Timer.vue'
import SkateModal from '@/components/common/SkateModal.vue'
import Modal from '@/components/common/Modal.vue'
import SkatePattern from '@/components/common/SkatePattern.vue'
import mittInstance from '@/core/lib/MittInstance'
import ButtonUI from '@/components/common/ButtonUI.vue'
import IconSkate from '@/components/common/IconSkate.vue'
import IconTImer from '@/components/common/IconTImer.vue'
import { IScore } from '@/core/types/IScore'
import { useScoreStore } from '@/core/store/score'
import { useSportStore } from '@/core/store/sport'

const experience = ref<Experience | null>(null)
const { setCurrentScore } = useScoreStore()
const { setSportStep } = useSportStore()

onMounted(() => {
  // const experience = new Experience(document.querySelector('canvas.webgl'))
  mittInstance.emit('Start skate intro')
})

const state = ref<String>('')
const step = ref<any>(0)
const patternToDo = ref<Number[]>([])
const figureResult = ref<String>('')
const result = ref<any>('')

mittInstance.on('Skate intro finished', () => {})
state.value = 'tutorial'

mittInstance.on('Skate Figure', () => {
  state.value = 'figure'
})

mittInstance.on('Pattern joué', (e: any) => {
  figureResult.value = e.status ? 'Parfait !' : 'Incorrect'
  result.value = e.status ? 'gagné' : 'perdu'
  setTimeout(() => {
    state.value = ''
    figureResult.value = ''
    startTimer()
  }, 3000)
})
mittInstance.on('Pattern time finished', () => {
  if (figureResult.value == '') {
    figureResult.value = 'Trop lent'
    setTimeout(() => {
      state.value = ''
      figureResult.value = ''
      startTimer()
    }, 3000)
  }
})

mittInstance.on('Sport finished', () => {
  state.value = 'result'
})

const startTimer = () => {
  mittInstance.emit('Start Timer', { step: step.value })
  state.value = ''
  step.value = step.value + 1
}

const endEpreuve = () => {
  const score: IScore = { points: 83, sportId: 'skate' }
  setCurrentScore(score)
  setSportStep('skate', 1)
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
