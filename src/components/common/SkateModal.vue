<template>
  <div class="w-modal" :class="isEnd && 'is-active'">
    <div class="pattern-title" :class="!isAutoDrawing && 'is-valid'">
      <div ref="titleRef">{{ title }}</div>
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
import Pattern from '@/pages/Pattern.vue'
import mittInstance from '@/core/lib/MittInstance'
import { FIGURES } from '@/data/constants'
import { getIsArraysEqual } from '@/core/utils/functions'
import { gsap } from 'gsap'

const currentPatternIndex = ref(0)
const patternToDo = ref<number[][]>([])
const currentPatternToDoIndex = ref(0)
const isAutoDrawing = ref(true)
const isWin = ref(false)
const isLose = ref(false)
const isEnd = ref(false)
const title = ref('')
const titleRef = ref<HTMLDivElement | null>(null)

interface Props {
  patterns: number[][][][]
}

const props = defineProps<Props>()

onMounted(() => {
  patternToDo.value = props.patterns[0][0]
})

const getTitle = () => {
  if (!patternToDo.value?.length) {
    return 'Mémorise les tracés'
  }

  const figure = FIGURES.find((figure) => {
    return getIsArraysEqual(
      figure.pattern.flat(Infinity),
      patternToDo.value.flat(Infinity),
    )
  })

  return figure?.name ?? ''
}

watch(patternToDo, () => {
  gsap.fromTo(
    titleRef.value,
    {
      y: 0,
    },
    {
      y: '-100%',
      duration: 0.4,
      ease: 'Power4.easeInOut',
      onComplete: () => {
        title.value = getTitle()
        gsap.fromTo(
          titleRef.value,
          {
            y: '100%',
          },
          {
            y: 0,
            duration: 0.4,
            ease: 'Power4.easeInOut',
          },
        )
      },
    },
  )
})

const handleEndPattern = () => {
  isWin.value = false
  isLose.value = false
  isAutoDrawing.value = true
  currentPatternToDoIndex.value = 0
  if (currentPatternIndex.value < props.patterns[currentPatternIndex.value].length - 1) {
    patternToDo.value = props.patterns[++currentPatternIndex.value][0]
  } else {
    isEnd.value = true
  }
}

const handleFlop = () => {
  isLose.value = true
  setTimeout(() => {
    handleEndPattern()
  }, 1000)
}

const handleWin = () => {
  isWin.value = true
  setTimeout(() => {
    handleEndPattern()
  }, 1000)
}

const handleDrawEnd = (isWrong?: boolean) => {
  if (isWrong) {
    handleFlop()
    return
  }

  if (
    currentPatternToDoIndex.value <
    props.patterns[currentPatternIndex.value].length - 1
  ) {
    if (isAutoDrawing.value) {
      patternToDo.value =
        props.patterns[currentPatternIndex.value][++currentPatternToDoIndex.value]
    } else {
      if (isWrong) {
        handleFlop()
      } else {
        patternToDo.value =
          props.patterns[currentPatternIndex.value][++currentPatternToDoIndex.value]
      }
    }
  } else {
    if (isAutoDrawing.value) {
      isAutoDrawing.value = false
      currentPatternToDoIndex.value = 0
      patternToDo.value = props.patterns[currentPatternIndex.value][0]
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
