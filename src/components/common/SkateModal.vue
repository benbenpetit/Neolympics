<template>
  <div class="w-modal">
    <div
      class="pattern-title"
      :class="[
        !isAutoDrawing && 'is-drawing',
        titleWin && 'is-valid',
        titleWrong && 'is-wrong',
      ]"
    >
      <div ref="titleRef">{{ title }}</div>
    </div>
    <div class="pattern-timer">
      <span
        class="pattern-timer__inside"
        :class="!isAutoDrawing && '--show'"
        ref="patternTimerRef"
        :style="{ transform: `skewX(-30deg) scaleX(${1 - timerProgress})` }"
      />
    </div>
    <Pattern
      :patternToDo="patternToDo"
      :isAutoDrawing="isAutoDrawing"
      :onDrawEnd="handleDrawEnd"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useSportStore } from '@/core/store/sport'
import Pattern from '@/pages/Pattern.vue'
import mittInstance from '@/core/lib/MittInstance'
import { FIGURES } from '@/data/figures'
import { getIsArraysEqual } from '@/core/utils/functions'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/all'
gsap.registerPlugin(CustomEase)
CustomEase.create('shakeEasing', '.36,.07,.19,.97')

const { sportState } = useSportStore()
const currentPatternIndex = ref(0)
const patternToDo = ref<number[][]>([])
const currentPatternToDoIndex = ref(0)
const isAutoDrawing = ref(true)
const isPret = ref(false)
const isWin = ref(false)
const isLose = ref(false)
const isEnd = ref(false)
const title = ref('')
const titleRef = ref<HTMLDivElement | null>(null)
const patternTimerRef = ref<HTMLSpanElement | null>(null)
const titleWin = ref(false)
const titleWrong = ref(false)
const elapsedTime = ref(0)
const skateDifficulty = computed(
  () =>
    sportState.doneSports.find((doneSport) => doneSport.sport === 'skate')?.difficulty ??
    1,
)
const maxTime = computed(() => 5 + 3 - skateDifficulty.value)
const timerProgress = computed(() => elapsedTime.value / maxTime.value)
const scoreTimings = ref<number[]>([])

interface Props {
  pattern: number[][][]
}

const props = defineProps<Props>()
const emits = defineEmits(['onPatternEnd'])

onMounted(() => {
  setTimeout(() => {
    patternToDo.value = props.pattern[0]
  }, 2000)
})

const getTitle = () => {
  if (!patternToDo.value?.length) {
    return 'Mémorise les tracés'
  }

  if (isPret.value) {
    return 'Prêt ?'
  }

  const figure = FIGURES.find((figure) => {
    return getIsArraysEqual(
      figure.pattern.flat(Infinity),
      patternToDo.value.flat(Infinity),
    )
  })

  return figure?.name ?? ''
}

let timerIntervalId: any = null

const startTimer = () => {
  if (!isAutoDrawing.value) {
    const startTime = new Date().getTime()
    elapsedTime.value = 0

    timerIntervalId = setInterval(() => {
      elapsedTime.value = (new Date().getTime() - startTime) / 1000
      if (elapsedTime.value >= maxTime.value) {
        handleDrawEnd(true)
        clearInterval(timerIntervalId)
      }
    }, 10)
  }
}

const clearTimer = () => {
  clearInterval(timerIntervalId)
}

watch([patternToDo, isAutoDrawing], () => {
  if (!isAutoDrawing.value) {
    startTimer()
  }
})

watch(
  [patternToDo, isPret],
  () => {
    if (!isPret) {
      return
    }
    gsap.fromTo(
      titleRef.value,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: '-100%',
        opacity: 0,
        duration: 0.35,
        ease: 'Power4.easeInOut',
        onComplete: () => {
          title.value = getTitle()
          gsap.fromTo(
            titleRef.value,
            {
              y: '100%',
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'Power4.easeInOut',
            },
          )
        },
      },
    )
  },
  { immediate: true },
)

const animText = (isWrong?: boolean) => {
  if (!isWrong) {
    titleWin.value = true
    setTimeout(() => {
      titleWin.value = false
    }, 1000)
  } else {
    titleWrong.value = true
    setTimeout(() => {
      titleWrong.value = false
    }, 1000)
  }
}

const handleEndPattern = (isValid?: boolean) => {
  const timingRatio =
    scoreTimings.value.reduce((prev, curr) => prev + curr, 0) / scoreTimings.value.length
  emits('onPatternEnd', { isValid, timingRatio })
  scoreTimings.value = []
  // isWin.value = false
  // isLose.value = false
  // isAutoDrawing.value = true
  // currentPatternToDoIndex.value = 0
  // if (currentPatternIndex.value < props.pattern[currentPatternIndex.value].length - 1) {
  //   patternToDo.value = props.pattern[++currentPatternIndex.value][0]
  // } else {
  //   isEnd.value = true
  // }
}

const handleFlop = () => {
  isLose.value = true
  setTimeout(() => {
    animText(true)
  }, 300)
  setTimeout(() => {
    handleEndPattern()
  }, 1500)
}

const handleWin = () => {
  isWin.value = true
  setTimeout(() => {
    animText()
  }, 300)
  setTimeout(() => {
    handleEndPattern(true)
  }, 1500)
}

const handleDrawEnd = (isWrong?: boolean) => {
  clearTimer()
  if (isWrong) {
    handleFlop()
    return
  }

  if (!isAutoDrawing.value) {
    scoreTimings.value.push(1 - timerProgress.value)
  }

  if (currentPatternToDoIndex.value < props.pattern.length - 1) {
    if (isAutoDrawing.value) {
      patternToDo.value = props.pattern[++currentPatternToDoIndex.value]
    } else {
      if (isWrong) {
        setTimeout(() => {
          handleFlop()
        }, 1000)
      } else {
        setTimeout(() => {
          animText()
        }, 300)
        setTimeout(() => {
          patternToDo.value = props.pattern[++currentPatternToDoIndex.value]
        }, 1000)
      }
    }
  } else {
    if (isAutoDrawing.value) {
      isPret.value = true
      setTimeout(() => {
        isAutoDrawing.value = false
        currentPatternToDoIndex.value = 0
        patternToDo.value = props.pattern[0]
        isPret.value = false
      }, 1500)
    } else {
      handleWin()
    }
  }
}

// setTimeout(() => {
//   state.value = 'playing'
//   setTimeout(() => {
//     mittInstance.emit('Pattern time finished')
//   }, 5000)
// }, 10000)
</script>
