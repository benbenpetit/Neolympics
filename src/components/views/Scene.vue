<template>
  <div>
    <FeedbackGame :imgSrc="feedbackImg" />
    <Header @onModalOpen="onModalOpen" @onModalClose="onModalClose" :background="false">
    </Header>
    <Timer :currentFigures="CURRENT_FIGURES" :score="score" />
    <Modal
      v-if="state == 'tutorial'"
      imgSrc="null"
      class="--blue skate-tutorial"
      :class="isTutorialOpen && '--big'"
    >
      <template v-slot:title>Entraîne-toi avant l'épreuve !</template>
      <template v-slot:content>
        <div class="c-tutorial">
          <div class="c-tutorial__text">
            <p>
              Reproduis les <strong>motifs</strong> le plus vite possible pour réaliser
              des <strong>figures de skate</strong> dans le
              <strong>temps imparti</strong>.
            </p>
            <p>
              Pour ce niveau, tu as <strong>5 secondes</strong> pour réaliser chaque
              figure !
            </p>
            <p>
              <strong
                >Tu peux t'entraîner autant que tu veux avec la planche avant de lancer
                l'épreuve</strong
              >
            </p>
          </div>
          <SkateModal
            v-if="isTutorialOpen"
            class="tuto-skate-modal"
            :pattern="tutoPattern"
            @onPatternEnd="handleTutoPatternEnd"
            repeat
            isSpeed
          />
        </div>
      </template>
      <template v-slot:buttons>
        <!-- <div class="trial-details">
          <div class="detail-container"><IconTImer /> 45 secondes</div>
          <div class="detail-container"><IconSkate /> 5 figures</div>
        </div> -->
        <ButtonUI
          :isActive="false"
          class="--white"
          @click="startGame"
          ref="firstButtonRef"
        >
          <template v-slot:label>Aller à l'épreuve</template>
        </ButtonUI>
        <ButtonUI
          imgSrc="/icon/go.svg"
          class="--no-hover"
          @click="!isTutorialOpen ? train() : startGame()"
        >
          <template v-slot:label>{{
            !isTutorialOpen ? ` M'entrainer` : `J'ai compris !`
          }}</template>
        </ButtonUI>
      </template>
    </Modal>
    <SkateModal
      v-if="state === 'figureGame'"
      :pattern="pattern"
      @onPatternEnd="handlePatternEnd"
    />
    <div v-if="showResult" class="c-modal-result-skate-wrapper">
      <div class="c-modal-result-skate">
        <img :src="resultImg" alt="" />
        <div class="--rotate">
          <p class="--texte">
            <span>{{ resultTxt }}</span>
            <span>{{ resultTxt }}</span>
          </p>
          <div class="--score-wrapper">
            <p class="--score">SCORE : {{ Math.round(score) }}<span>pts</span></p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="figureResult != ''"
      class="figure-result"
      :class="figureResult == 'Parfait !' ? 'blue' : 'red'"
    >
      <img
        :src="result == 'gagné' ? '/img/brush-blue.png' : '/img/brush-red.png'"
        alt=""
      />
    </div>

    <div v-if="showResult" class="footer-skate-result">
      <ButtonUI class="--white --startagain" :isActive="false" @click="startAgain">
        <template v-slot:label
          ><img src="/icon/gobackred.svg" alt="" />recommencer</template
        >
      </ButtonUI>
      <ButtonUI :imgSrc="'/icon/go.svg'" @click="endEpreuve">
        <template v-slot:label>passer à l'interview</template>
      </ButtonUI>
    </div>
    <LoadingScreen v-if="state == 'loading'" :skateDifficulty="skateDifficulty" />
  </div>

  <canvas class="webgl" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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
import LoadingScreen from '@/components/common/LoadingScreen.vue'
import router from '@/core/router'
import { IScore } from '@/core/types/IScore'
import { useScoreStore } from '@/core/store/score'
import { useSportStore } from '@/core/store/sport'
import Pattern from '@/pages/Pattern.vue'
import { Howl, Howler } from 'howler'
import { gsap } from 'gsap'
import arrayShuffle from 'array-shuffle'
import {
  FIGURES,
  FIGURES_EASY,
  FIGURES_MEDIUM,
  FIGURES_HARD,
  FB270_EASY,
  FB270_MEDIUM,
  FB270_HARD,
  KICKFLIP_EASY,
} from '@/data/figures'
import { IFigure } from '@/core/types/IFigure'

let CURRENT_FIGURES = [KICKFLIP_EASY]
const CURRENT_FIGURES_EASY: IFigure[] = [
  FB270_EASY,
  ...arrayShuffle(FIGURES_EASY.filter(({ name }) => name !== 'FS 270')),
]
const CURRENT_FIGURES_MEDIUM = [
  FB270_MEDIUM,
  ...arrayShuffle(FIGURES_MEDIUM.filter(({ name }) => name !== 'FS 270')),
]
const CURRENT_FIGURES_HARD = [
  FB270_HARD,
  ...arrayShuffle(FIGURES_HARD.filter(({ name }) => name !== 'FS 270')),
]

const { setCurrentScore } = useScoreStore()
const { sportState, setSportStep } = useSportStore()
const state = ref<
  'loading' | 'tutorial' | 'game' | 'figureGame' | 'figureAnim' | 'result' | ''
>('loading')
const step = ref(0)
const currentFigureIndex = ref(0)
const pattern = ref<number[][][]>(KICKFLIP_EASY.pattern)
const tutoPattern = ref<number[][][]>(KICKFLIP_EASY.pattern)
const figureResult = ref('')
const result = ref('')
const experience = ref<Experience | null>(null)
const patternToDoTutorial = ref<number[][]>([])
const score = ref<number>(0)
const sources = ref<number>(0)
const isTutorialOpen = ref(false)
const firstButtonRef = ref<any | null>(null)
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
let showResult = ref<boolean>(false)
let resultImg = ref<string>('')
let resultTxt = ref<string>('')

let feedbackImgAnim = gsap.timeline({})
let feedbackResultAnim = gsap.timeline({})

onMounted(() => {
  experience.value = new Experience(document.querySelector('canvas.webgl'))
})

mittInstance.on('All ressources loaded', () => {
  mittInstance.emit('Start skate intro')
  Howler.stop()
  startingSkateTheme.play()
  setTimeout(() => {
    state.value = ''
  }, 1000)
})

watch(
  skateDifficulty,
  () => {
    if (skateDifficulty.value === 1) {
      CURRENT_FIGURES = CURRENT_FIGURES_EASY
      pattern.value = FB270_EASY.pattern
      localStorage.setItem('modules', JSON.stringify(CURRENT_FIGURES_EASY))
    } else if (skateDifficulty.value === 2) {
      CURRENT_FIGURES = CURRENT_FIGURES_MEDIUM
      pattern.value = FB270_MEDIUM.pattern
      localStorage.setItem('modules', JSON.stringify(CURRENT_FIGURES_MEDIUM))
    } else {
      CURRENT_FIGURES = CURRENT_FIGURES_HARD
      pattern.value = FB270_HARD.pattern
      localStorage.setItem('modules', JSON.stringify(CURRENT_FIGURES_MEDIUM))
    }
  },
  { immediate: true },
)

mittInstance.on('Start tutorial', () => {
  state.value = 'tutorial'
  patternToDoTutorial.value = KICKFLIP_EASY.pattern[0]
})

mittInstance.on('Start Figure Game', () => {
  state.value = 'figureGame'
  setTimeout(() => {
    if (skateTheme.playing()) {
      // @ts-ignore
      skateTheme.addFilter({
        filterType: 'lowpass',
        frequency: 1500.0,
        Q: 3.0,
      })
    } else {
      // @ts-ignore
      skateThemeLoop.addFilter({
        filterType: 'lowpass',
        frequency: 1500.0,
        Q: 3.0,
      })
    }
  }, 1500)
})

mittInstance.on('Skate Figure Anim 3D', () => {
  state.value = 'figureAnim'
  if (skateTheme.playing()) {
    // @ts-ignore
    skateTheme.addFilter({
      filterType: 'lowpass',
      frequency: 20000.0,
      Q: 3.0,
    })
  } else {
    // @ts-ignore
    skateThemeLoop.addFilter({
      filterType: 'lowpass',
      frequency: 20000.0,
      Q: 3.0,
    })
  }
})

mittInstance.on('Skate Figure Anim 3D End', () => {
  mittInstance.emit('Start Timer', { step: step.value })
  if (skateTheme.playing()) {
    // @ts-ignore
    skateTheme.addFilter({
      filterType: 'lowpass',
      frequency: 20000.0,
      Q: 3.0,
    })
  } else {
    // @ts-ignore
    skateThemeLoop.addFilter({
      filterType: 'lowpass',
      frequency: 20000.0,
      Q: 3.0,
    })
  }
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
  showResult.value = true
  Math.round(score.value)
  if (score.value >= 50) {
    resultImg.value = '/img/skate/result-bravo.webp'
    resultTxt.value = 'bravo'
  } else if (score.value >= 20) {
    resultImg.value = '/img/skate/result-pas-mal.webp'
    resultTxt.value = 'pas mal'
  } else {
    resultImg.value = '/img/skate/result-dommage.webp'
    resultTxt.value = 'dommage'
  }

  setTimeout(() => {
    state.value = 'result'
    feedbackResultPlay()
  }, 1500)
})

const startGame = () => {
  mittInstance.emit('Start Timer', { step: step.value })
  mittInstance.emit('Start Skate Animation')
  state.value = 'game'
  skateTheme.play()
  skateTheme.fade(0, 0.8, 100)
  if (startingSkateTheme.playing()) {
    startingSkateTheme.fade(0.5, 0, 600)
  }
}

const train = () => {
  gsap.to(firstButtonRef.value?.domButtonRef, {
    marginLeft: '-35%',
    visibility: 'none',
    opacity: 0,
    duration: 0.4,
    ease: 'Power4.easeOut',
  })
  isTutorialOpen.value = true
}

const handleTutoPatternEnd = ({ isValid = false, timingRatio = 0 }) => {}

const startAgain = () => {
  Howler.stop()
  router.push('/competition/preparation')
  setTimeout(() => {
    mittInstance.emit('start again')
  }, 200)
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
  experience.value?.destroy()
}

const calculateFigureScore = (timing: number) => {
  const maxScoreByFigureDependingOnDifficulty = [16, 18, 20]
  const tiers = maxScoreByFigureDependingOnDifficulty[skateDifficulty.value - 1] / 3
  return tiers * 2 + tiers * timing
}

const handlePatternEnd = ({ isValid = false, timingRatio = 0 }) => {
  updateIcon(isValid)

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
  setTimeout(() => {
    mittInstance.emit('Skate Figure Anim 3D', {
      animation: CURRENT_FIGURES[currentFigureIndex.value].anims,
      isValid: isValid,
    })
    const nextPattern = CURRENT_FIGURES[++currentFigureIndex.value]?.pattern
    if (nextPattern) {
      pattern.value = nextPattern
    }
  }, 1200)
}

const onModalOpen = () => {
  if (skateTheme.playing()) {
    // @ts-ignore
    skateTheme.addFilter({
      filterType: 'lowpass',
      frequency: 1500.0,
      Q: 3.0,
    })
  } else {
    // @ts-ignore
    skateThemeLoop.addFilter({
      filterType: 'lowpass',
      frequency: 1500.0,
      Q: 3.0,
    })
  }
}

const onModalClose = () => {
  if (skateTheme.playing()) {
    // @ts-ignore
    skateTheme.addFilter({
      filterType: 'lowpass',
      frequency: 20000.0,
      Q: 3.0,
    })
  } else {
    // @ts-ignore
    skateThemeLoop.addFilter({
      filterType: 'lowpass',
      frequency: 20000.0,
      Q: 3.0,
    })
  }
}

const feedbackAnimPlay = () => {
  feedbackImgAnim.fromTo(
    '.c-feedbackGame',
    {
      x: '-100%',
      opacity: 0,
    },
    {
      x: '-0%',
      opacity: 1,
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
    '+=0.2',
  )

  feedbackImgAnim.to(
    '.c-feedbackGame',
    {
      x: '-100%',
      opacity: 0,
    },
    '+=1.2',
  )
}

const feedbackResultPlay = () => {
  feedbackResultAnim.to('.c-modal-result-skate-wrapper', {
    opacity: 1,
    duration: 0,
  })

  feedbackResultAnim.fromTo(
    '.c-modal-result-skate img',
    {
      opacity: 0,
      x: '100%',
    },
    {
      opacity: 1,
      x: '0%',
      duration: 0.3,
      ease: 'Power2.easeInOut',
    },
  )

  feedbackResultAnim.fromTo(
    '.c-modal-result-skate .--texte',
    {
      opacity: 0,
      x: '100%',
    },
    {
      opacity: 1,
      x: '0%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
    '-=0.2',
  )

  feedbackResultAnim.fromTo(
    '.c-modal-result-skate .--score-wrapper',
    {
      opacity: 0,
      x: '100%',
    },
    {
      opacity: 1,
      x: '0%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
    '-=0.2',
  )

  feedbackResultAnim.fromTo(
    '.footer-skate-result',
    {
      opacity: 0,
      y: '100%',
    },
    {
      opacity: 1,
      y: '0%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
    '-=0.2',
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
