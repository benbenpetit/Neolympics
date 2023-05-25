<template>
  <div class="infos-container">
    <div class="score-wrapper">
      <div class="skew-container">
        <div class="score-container">
          <div class="score--value">0</div>
          <div class="score--unit">pts</div>
        </div>
      </div>
    </div>
    <div class="timer-wrapper">
      <div class="skew-container">
        <div class="timer-container">
          <div class="step-container">
            <div v-for="n in 6" class="icon-container">
              <IconContainer />
            </div>
          </div>
          <div class="timebar-wrapper">
            <div class="timebar" :style="{ width: timebarWidth + '%' }"></div>
          </div>
          <h2 class="timer-value">{{ formatTime(elapsedTime) }}</h2>
        </div>
      </div>
      <!-- <button
        @click="
          () => {
            startTimer()
            // mittInstance.emit('bntStart')
          }
        "
      >
        Démarrer
      </button>
      <button @click="stopTimer">Arrêter</button>
      <button @click="resetTimer">Réinitialiser</button>
      <button @click="endSport">Terminer</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import IconContainer from '@/components/common/IconContainer.vue'
import mittInstance from '@/core/lib/MittInstance'
import Experience from '@/webgl/Experience/Experience'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useScoreStore } from '@/core/store/score'
import { useSportStore } from '@/core/store/sport'
import { IScore } from '@/core/types/IScore'
import publicRouters from '@/data/publicRouters'
import { IFigure } from '@/core/types/IFigure'

interface Props {
  currentFigures: IFigure[]
}

const props = defineProps<Props>()

const router = useRouter()
const { setCurrentScore } = useScoreStore()
const { setSportStep } = useSportStore()
const isRunning = ref(false)
const elapsedTime = ref(0)
const stoppedTime = ref(0)
const timebarWidth = ref(0)
const step = ref(0)
let startTime: any = null
let timerIntervalId: any = null
let maxTime: number = 45

// declare global {
//   interface Window {
//     experience: Experience
//   }
// }

mittInstance.on('Start Timer', (e: any) => {
  step.value = e.step
  startTimer()
})

const startTimer = () => {
  // console.log('Timer step value : ', step.value)

  if (!isRunning.value) {
    if (stoppedTime.value === 0) {
      startTime = new Date().getTime()
    } else {
      startTime = new Date().getTime() - stoppedTime.value
    }
    isRunning.value = true

    timerIntervalId = setInterval(() => {
      elapsedTime.value = (new Date().getTime() - startTime) / 1000
      timebarWidth.value = (elapsedTime.value / maxTime) * 100
      if (elapsedTime.value >= maxTime) {
        clearInterval(timerIntervalId)
        timebarWidth.value = 100
        isRunning.value = false
      } else if (elapsedTime.value >= 36 && step.value == 3) {
        stopTimer()
        mittInstance.emit('Start Figure Game', { figure: props.currentFigures[3].name })
      } else if (elapsedTime.value >= 27 && step.value == 2) {
        stopTimer()
        mittInstance.emit('Start Figure Game', { figure: props.currentFigures[2].name })
      } else if (elapsedTime.value >= 18 && step.value == 1) {
        stopTimer()
        mittInstance.emit('Start Figure Game', { figure: props.currentFigures[1].name })
      } else if (elapsedTime.value >= 9 && step.value == 0) {
        stopTimer()
        mittInstance.emit('Start Figure Game', { figure: props.currentFigures[0].name })
      }
    }, 10)
  }
}

const stopTimer = () => {
  if (isRunning.value) {
    clearInterval(timerIntervalId)
    isRunning.value = false
    stoppedTime.value = new Date().getTime() - startTime
  }
}

const resetTimer = () => {
  if (isRunning.value) {
    clearInterval(timerIntervalId)
    isRunning.value = false
  }
  elapsedTime.value = 0
  stoppedTime.value = 0
  timebarWidth.value = 0
}

const endSport = () => {
  const score: IScore = { points: 87, sportId: 'skate' }
  setCurrentScore(score)
  setSportStep('skate', 1)
}

const formatTime = (time: number) => {
  const seconds = Math.floor(time % 60)
  const centiseconds = Math.floor((time % 1) * 100)
  return `${seconds.toString().padStart(2, '0')},${centiseconds
    .toString()
    .padStart(2, '0')}`
}
</script>
