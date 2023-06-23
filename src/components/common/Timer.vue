<template>
  <div class="infos-container">
    <div class="score-wrapper">
      <div class="skew-container">
        <div class="score-container" ref="scoreContainerRef">
          <div class="score--value">{{ Math.round(score) }}</div>
          <div class="score--unit">pts</div>
        </div>
      </div>
    </div>
    <div class="timer-wrapper">
      <div class="skew-container">
        <div class="timer-container">
          <div class="step-container">
            <div v-for="step in steps" class="icon-container">
              <IconContainer :is-valid="step.isValid" :is-error="step.isError" />
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
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useScoreStore } from '@/core/store/score'
import { useSportStore } from '@/core/store/sport'
import { IScore } from '@/core/types/IScore'
import publicRouters from '@/data/publicRouters'
import { IFigure } from '@/core/types/IFigure'
import { gsap } from 'gsap'

interface Props {
  currentFigures: IFigure[]
  score: number
}

const props = defineProps<Props>()

const router = useRouter()
const { setCurrentScore } = useScoreStore()
const { setSportStep } = useSportStore()
const isRunning = ref(false)
const elapsedTime = ref(0)
const stoppedTime = ref(0)
const timebarWidth = ref(0)
const scoreContainerRef = ref<HTMLDivElement | null>(null)
const step = ref(0)
const steps = ref([...Array(6)].map((_) => ({ isError: false, isValid: false })))
let startTime: any = null
let timerIntervalId: any = null
let maxTime: number = 30

const timerCreated = ref(false)

// declare global {
//   interface Window {
//     experience: Experience
//   }
// }

watch(
  () => props.score,
  () => {
    console.log('Value changed')
    gsap
      .timeline()
      .to(scoreContainerRef.value, { scale: 2, duration: 0.2 })
      .to(scoreContainerRef.value, { scale: 1, duration: 0.2 })
  },
)

mittInstance.on('Update Icon', (e: any) => {
  step.value = e.step

  if (e.isValid) {
    console.log('Valid', steps.value[step.value])
    steps.value[step.value].isValid = true
  } else {
    console.log('Not Valid', steps.value[step.value])
    steps.value[step.value].isError = true
  }
})

mittInstance.on('Start Timer', () => {
  startTimer()
})

mittInstance.on('Time tick', (time: any) => {
  if (timerCreated.value && isRunning.value) {
    elapsedTime.value += time.deltaTime / 1000
    timebarWidth.value = (elapsedTime.value / maxTime) * 100
    if (elapsedTime.value >= 10) {
      timebarWidth.value = 100
      isRunning.value = false
      mittInstance.emit('Sport finished')
    } else if (elapsedTime.value >= 24 && step.value == 3) {
      stopTimer()
      mittInstance.emit('Start Figure Game', { figure: props.currentFigures[3].name })
    } else if (elapsedTime.value >= 18 && step.value == 2) {
      stopTimer()
      mittInstance.emit('Start Figure Game', { figure: props.currentFigures[2].name })
    } else if (elapsedTime.value >= 12 && step.value == 1) {
      stopTimer()
      mittInstance.emit('Start Figure Game', { figure: props.currentFigures[1].name })
    } else if (elapsedTime.value >= 6 && step.value == 0) {
      stopTimer()
      mittInstance.emit('Start Figure Game', { figure: props.currentFigures[0].name })
    } else if (elapsedTime.value >= 5 && elapsedTime.value <= 5.1 && step.value == 0) {
      mittInstance.emit('Before Figure Game', { figure: props.currentFigures[0].name })
    }
  }
})

const startTimer = () => {
  console.log('Timer step value : ', step.value)
  console.log('Timer created : ', timerCreated.value)
  console.log('Timer isRunning : ', timerCreated.value)
  if (!timerCreated.value) {
    timerCreated.value = true
  }
  if (!isRunning.value) {
    isRunning.value = true
  }
  // if (!isRunning.value) {
  //   if (stoppedTime.value === 0) {
  //     startTime = new Date().getTime()
  //   } else {
  //     startTime = new Date().getTime() - stoppedTime.value
  //   }
  //   isRunning.value = true
  //   timerIntervalId = setInterval(() => {
  //     elapsedTime.value = (new Date().getTime() - startTime) / 1000
  //     timebarWidth.value = (elapsedTime.value / maxTime) * 100
  //     if (elapsedTime.value >= maxTime) {
  //       clearInterval(timerIntervalId)
  //       timebarWidth.value = 100
  //       isRunning.value = false
  //       mittInstance.emit('Sport finished')
  //     } else if (elapsedTime.value >= 24 && step.value == 3) {
  //       stopTimer()
  //       mittInstance.emit('Start Figure Game', { figure: props.currentFigures[3].name })
  //     } else if (elapsedTime.value >= 18 && step.value == 2) {
  //       stopTimer()
  //       mittInstance.emit('Start Figure Game', { figure: props.currentFigures[2].name })
  //     } else if (elapsedTime.value >= 12 && step.value == 1) {
  //       stopTimer()
  //       mittInstance.emit('Start Figure Game', { figure: props.currentFigures[1].name })
  //     } else if (elapsedTime.value >= 6 && step.value == 0) {
  //       stopTimer()
  //       mittInstance.emit('Start Figure Game', { figure: props.currentFigures[0].name })
  //     }
  //   }, 10)
  // }
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

const formatTime = (time: number) => {
  const seconds = Math.floor(time % 60)
  const centiseconds = Math.floor((time % 1) * 100)
  return `${seconds.toString().padStart(2, '0')},${centiseconds
    .toString()
    .padStart(2, '0')}`
}
</script>
