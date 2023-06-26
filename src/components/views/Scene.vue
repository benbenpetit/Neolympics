<template>
  <div>
    <FeedbackGame :imgSrc="feedbackImg" />
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
            isRepeat
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
        <ButtonUI imgSrc="/icon/go.svg" class="--no-hover" @click="startGame">
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

    <!-- <div v-if="state == 'result'" class="c-modal-result-skate-wrapper">
      <div class="c-modal-result-skate">
        <img :src="resultImg" alt="" />
        <div class="--rotate">
          <h1>Bravo</h1>
          <div class="--score-wrapper">
            <p class="--score">Score</p>
          </div>
        </div>
      </div>
    </div> -->

    <div
      v-if="figureResult != ''"
      class="figure-result"
      :class="figureResult == 'Parfait !' ? 'blue' : 'red'"
    >
      <img
        :src="result == 'gagné' ? '/img/brush-blue.png' : '/img/brush-red.png'"
        alt=""
      />
      <span class="result-text">{{ figureResult }}</span>
    </div>
    <canvas class="webgl" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Experience from '@/webgl/Experience/Experience'
import Timer from '@/components/common/Timer.vue'
import SkateModal from '@/components/common/SkateModal.vue'
import Modal from '@/components/common/Modal.vue'
import Header from '@/components/common/Header.vue'
import mittInstance from '@/core/lib/MittInstance'
import ButtonUI from '@/components/common/ButtonUI.vue'
import IconSkate from '@/components/common/IconSkate.vue'
import IconTImer from '@/components/common/IconTImer.vue'
import FeedbackGame from '@/components/common/FeedbackGame.vue'
import { IScore } from '@/core/types/IScore'
import { GRINDFLIP, HARDFLIP, KICKFLIP, OLLIE, PIGEON } from '@/data/figures'
import { useScoreStore } from '@/core/store/score'
import { useSportStore } from '@/core/store/sport'
import Pattern from '@/pages/Pattern.vue'
import { Howl, Howler } from 'howler'
import { gsap } from 'gsap'

const CURRENT_FIGURES = [PIGEON, KICKFLIP, KICKFLIP, KICKFLIP, KICKFLIP]

const { setCurrentScore } = useScoreStore()
const { sportState, setSportStep } = useSportStore()
const state = ref<'tutorial' | 'figureGame' | 'figureAnim' | 'result' | ''>('')
const step = ref(0)
const currentFigureIndex = ref(0)
const pattern = ref<number[][][]>(CURRENT_FIGURES[currentFigureIndex.value].pattern)
const figureResult = ref('')
const result = ref('')
const experience = ref<Experience | null>(null)
const patternToDoTutorial = ref<number[][]>([])
const score = ref<number>(0)
const skateDifficulty = computed(
  () =>
    sportState.doneSports.find((doneSport) => doneSport.sport === 'skate')?.difficulty ??
    1,
)

let skateTheme = new Howl({
  src: ['/sounds/soundtracks/skate-theme-long.mp3'],
  volume: 0.8,
  onend: function () {
    skateThemeLoop.play()
  },
})

let skateThemeLoop = new Howl({
  src: ['/sounds/soundtracks/skate-theme-loop.mp3'],
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

let feedbackImg = ref<string>('')
let resultImg = ref<string>('')

let feedbackImgAnim = gsap.timeline({})

onMounted(() => {
  experience.value = new Experience(document.querySelector('canvas.webgl'))
  mittInstance.emit('Start skate intro')
  Howler.stop()
  startingSkateTheme.play()
})

mittInstance.on('Start tutorial', () => {
  // console.log('Tutorial')

  state.value = 'tutorial'
  patternToDoTutorial.value = KICKFLIP.pattern[0]
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

mittInstance.on('Skate Figure Anim 3D End', () => {
  mittInstance.emit('Start Timer', { step: step.value })
  // @ts-ignore
  skateTheme.addFilter({
    filterType: 'lowpass',
    frequency: 20000.0,
    Q: 3.0,
  })
})

mittInstance.emit('Start Anim 3D', { step: step.value })

// mittInstance.on('Pattern joué', (e: any) => {
//   figureResult.value = e.status ? 'Parfait !' : 'Incorrect'
//   result.value = e.status ? 'gagné' : 'perdu'
//   setTimeout(() => {
//     state.value = ''
//     figureResult.value = ''
//     startTimer()
//   }, 3000)
// })

// mittInstance.on('Pattern time finished', () => {
//   if (figureResult.value == '') {
//     figureResult.value = 'Trop lent'
//     setTimeout(() => {
//       state.value = ''
//       figureResult.value = ''
//       startTimer()
//     }, 3000)
//     feedbackImg.value = '/img/skate/trop-lent.webp'
//     feedbackAnimPlay()
//   }
// })

mittInstance.on('Sport finished', () => {
  Math.round(score.value)
  if (score.value >= 50) {
    resultImg.value = '/img/skate/result-bravo.svg'
  } else {
    resultImg.value = '/img/skate/result-pas-mal.svg'
  }

  setTimeout(() => {
    state.value = 'result'
  }, 1500)
})

const startGame = () => {
  mittInstance.emit('Start Timer', { step: step.value })
  mittInstance.emit('Start Skate Animation')
  state.value = ''
  skateTheme.play()
  skateTheme.fade(0, 0.8, 100)
  if (startingSkateTheme.playing()) {
    startingSkateTheme.fade(0.5, 0, 600)
  }
}

const updateIcon = (isValid?: boolean) => {
  step.value = step.value + 1
  mittInstance.emit('Update Icon', { step: step.value, isValid: isValid })
  state.value = ''
}

const endEpreuve = () => {
  const tempScore: IScore = { points: Math.round(score.value), sportId: 'skate' }
  setCurrentScore(tempScore)
  setSportStep('skate', 1)
}

const calculateFigureScore = (timing: number) => {
  const maxScoreByFigureDependingOnDifficulty = [16, 18, 20]
  const tiers = maxScoreByFigureDependingOnDifficulty[skateDifficulty.value - 1] / 3
  return tiers * 2 + tiers * timing
}

const handlePatternEnd = ({ isValid = false, timingRatio = 0 }) => {
  updateIcon(isValid)
  mittInstance.emit('Skate Figure Anim 3D', {
    animation: CURRENT_FIGURES[currentFigureIndex.value].anims,
    isValid: isValid,
  })

  const nextPattern = CURRENT_FIGURES[++currentFigureIndex.value]?.pattern

  if (nextPattern) {
    pattern.value = nextPattern
  }

  if (isValid === true) {
    const calculatedScore = calculateFigureScore(timingRatio)
    score.value += calculatedScore
  }

  if (isValid === true) {
    validPatternSound.play()
    feedbackImg.value = '/img/skate/parfait.webp'
    feedbackAnimPlay()
  } else {
    console.log('wrong pattern')
    wrongPatternSound.play()
    feedbackImg.value = '/img/skate/incorrect.webp'
    feedbackAnimPlay()
  }
}

const handleTutoEnd = () => {
  patternToDoTutorial.value = []
  setTimeout(() => {
    patternToDoTutorial.value = KICKFLIP.pattern[0]
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

const feedbackAnimPlay = () => {
  feedbackImgAnim.to('.c-feedbackGame', {
    opacity: 1,
    duration: 0,
  })

  feedbackImgAnim.fromTo(
    '.c-feedbackGame',
    {
      x: '-100%',
    },
    {
      x: '0%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
  )

  feedbackImgAnim.to(
    '.c-feedbackGame',
    {
      x: '-100%',
    },
    '+=0.6',
  )
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
