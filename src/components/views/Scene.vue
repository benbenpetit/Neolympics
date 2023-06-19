<template>
  <OverlayIlluSkate />
  <Header @onModalOpen="onModalOpen" @onModalClose="onModalClose" :background="false">
  </Header>
  <Timer :currentFigures="CURRENT_FIGURES" :score="score" />
  <Modal v-if="state == 'tutorial'" imgSrc="null" class="--blue skate-tutorial">
    <template v-slot:title>Tutoriel</template>
    <template v-slot:content>
      <div class="tutoriel-content">
        <Pattern
          class="tutoriel-content__pattern"
          :patternToDo="patternToDoTutorial"
          isAutoDrawing
          :onDrawEnd="handleTutoEnd"
        />
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
  <SkateModal
    v-if="state === 'figureGame'"
    :pattern="pattern"
    @onPatternEnd="handlePatternEnd"
  />
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
import Header from '@/components/common/Header.vue'
import mittInstance from '@/core/lib/MittInstance'
import ButtonUI from '@/components/common/ButtonUI.vue'
import IconSkate from '@/components/common/IconSkate.vue'
import IconTImer from '@/components/common/IconTImer.vue'
import OverlayIlluSkate from '@/components/common/OverlayIlluSkate.vue'
import { IScore } from '@/core/types/IScore'
import { GRINDFLIP, HARDFLIP, KICKFLIP, OLLIE } from '@/data/figures'
import { useScoreStore } from '@/core/store/score'
import { useSportStore } from '@/core/store/sport'
import Pattern from '@/pages/Pattern.vue'
import { Howl, Howler } from 'howler'

const CURRENT_FIGURES = [KICKFLIP, GRINDFLIP, HARDFLIP, KICKFLIP, OLLIE]

const { setCurrentScore } = useScoreStore()
const { sportState, setSportStep } = useSportStore()
const state = ref<'tutorial' | 'figureGame' | 'figureAnim' | 'result' | ''>('')
const step = ref(0)
const currentFigureIndex = ref(0)
const pattern = ref<number[][][]>([CURRENT_FIGURES[currentFigureIndex.value].pattern])
const figureResult = ref('')
const result = ref('')
const experience = ref<Experience | null>(null)
const patternToDoTutorial = ref<number[][]>([])
const score = ref<number>(0)

let skateTheme = new Howl({
  src: ['/sounds/soundtracks/skate-theme-long.mp3'],
  volume: 0.8,
  loop: true,
})

let validPatternSound = new Howl({
  src: ['/sounds/soundtracks/crowd-cheer.mp3'],
  volume: 0.5,
})

let wrongPatternSound = new Howl({
  src: ['/sounds/soundtracks/crowd-bouh.mp3'],
  volume: 0.5,
})

let startingSkateTheme = new Howl({
  src: ['/sounds/soundtracks/before-trial.mp3'],
  volume: 0.5,
})

onMounted(() => {
  experience.value = new Experience(document.querySelector('canvas.webgl'))
  mittInstance.emit('Start skate intro')
  Howler.stop()
  startingSkateTheme.play()
})

mittInstance.on('Start tutorial', () => {
  console.log('Tutorial')

  state.value = 'tutorial'
  patternToDoTutorial.value = KICKFLIP.pattern
})

mittInstance.on('Start Figure Game', () => {
  setTimeout(() => {
    state.value = 'figureGame'
    // @ts-ignore
    skateTheme.addFilter({
      filterType: 'lowpass',
      frequency: 1500.0,
      Q: 3.0,
    })
  }, 1500)
})

mittInstance.on('Skate Figure Anim 3D', () => {
  state.value = 'figureAnim'
  // @ts-ignore
  skateTheme.addFilter({
    filterType: 'lowpass',
    frequency: 20000.0,
    Q: 3.0,
  })
})

mittInstance.on('Start Figure Anim 3D End', () => {
  console.log('Reprendre le Timer')
  // @ts-ignore
  skateTheme.addFilter({
    filterType: 'lowpass',
    frequency: 20000.0,
    Q: 3.0,
  })
})

mittInstance.emit('Start Anim 3D', { step: step.value })

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
  setTimeout(() => {
    state.value = 'result'
  }, 1500)
})

const startTimer = (isValid?: boolean) => {
  mittInstance.emit('Start Timer', { step: step.value, isValid: isValid })
  state.value = ''
  if (step.value == 0) {
    mittInstance.emit('Start Skate Animation')
    skateTheme.play()
    skateTheme.fade(0, 0.8, 100)
    if (startingSkateTheme.playing()) {
      startingSkateTheme.fade(0.5, 0, 600)
    }
  }
  // } else {
  //   setTimeout(() => {
  //     experience.value?.world?.skater.animation?.play('P_Push')
  //   }, 2000)
  // }
  step.value = step.value + 1
}

const endEpreuve = () => {
  const score: IScore = { points: 75, sportId: 'skate' }
  setCurrentScore(score)
  setSportStep('skate', 1)
}

const handlePatternEnd = (isValid?: boolean) => {
  mittInstance.emit('Skate Figure Anim 3D')
  startTimer(isValid)
  pattern.value = [CURRENT_FIGURES[++currentFigureIndex.value].pattern]
  score.value += Math.floor(Math.random() * (20 - 10 + 1) + 10)
  if (isValid == true) {
    validPatternSound.play()
  } else {
    console.log('wrong pattern')
    wrongPatternSound.play()
  }
}

const handleTutoEnd = () => {
  patternToDoTutorial.value = []
  setTimeout(() => {
    patternToDoTutorial.value = KICKFLIP.pattern
  })
}

const onModalOpen = () => {
  // @ts-ignore
  skateTheme.addFilter({
    filterType: 'lowpass',
    frequency: 1500.0,
    Q: 3.0,
  })
}

const onModalClose = () => {
  // @ts-ignore
  skateTheme.addFilter({
    filterType: 'lowpass',
    frequency: 20000.0,
    Q: 3.0,
  })
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
