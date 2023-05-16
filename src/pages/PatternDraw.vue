<template>
  <div
    class="pattern-wrapper"
    :style="{ height: '30vh', width: '100%' }"
    draggable="false"
    ref="wrapperBox"
    @click="setupAnimLines"
  >
    <svg class="lines" draggable="false">
      <line
        v-for="(line, index) in lines"
        stroke-linecap="round"
        draggable="false"
        :style="{ opacity: line.isTracing ? 1 : 0 }"
        :ref="(ref: any) => handleSetRefLines(index, ref)"
        :x1="`${line.coords.start.x}px`"
        :y1="`${line.coords.start.y}px`"
        :x2="`${line.coords.end.x}px`"
        :y2="`${line.coords.end.y}px`"
      />
    </svg>
    <div
      class="pattern-container"
      ref="gridRef"
      draggable="false"
      :style="`grid-template-columns: repeat(${numCols}, 1fr); grid-template-rows: repeat(${numRows}, 1fr);`"
    >
      <div
        v-for="(point, index) in points"
        :key="point.id"
        class="pattern-point__zone"
        draggable="false"
        :class="{ active: point.isActive }"
        :ref="(ref: any) => handleSetRefPoints(index, ref)"
      >
        <div class="pattern-point" draggable="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'
import { DrawSVGPlugin } from 'gsap/all'

interface Props {
  patternToDo: number[][]
}

interface Point {
  id: number
  isActive: boolean
  coords: {
    x: number
    y: number
  }
}

interface Line {
  id: number
  isTracing: boolean
  coords: {
    start: {
      x: number
      y: number
    }
    end: {
      x: number
      y: number
    }
  }
}

gsap.registerPlugin(DrawSVGPlugin)

const { patternToDo } = defineProps<Props>()

const numRows = ref(3) // Nombre de lignes dans la grille
const numCols = ref(5) // Nombre de colonnes dans la grille
const pointRefs: Element[] = [] // Ref des Point dans le DOM
const lineRefs: SVGLineElement[] = [] // Ref des Lignes dans le DOM
const isDragging = ref(false)
const isCorrectPattern = ref(false)
const gridRef = ref<any>(null)
const currentPattern = ref<Number[]>([])
const points = ref<Point[]>([])
const lines = ref<Line[]>([])
const isAutoDraw = ref(false)
const currentLine = ref<any>()
const wrapperBox = ref<HTMLDivElement | null>(null)

onMounted(() => {
  for (let i = 1; i <= numRows.value * numCols.value; i++) {
    points.value.push({ id: i, isActive: false, coords: { x: 0, y: 0 } })
  }
  setPointsCoords()
  for (let i = 1; i <= numRows.value * numCols.value; i++) {
    lines.value.push({
      id: i,
      isTracing: false,
      coords: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
    })
  }
})

window.addEventListener('resize', () => {
  setPointsCoords()
})

const clearPattern = () => {
  currentPattern.value = []
  lines.value = lines.value.map((line) => ({
    ...line,
    coords: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
  }))
}

const setPointsCoords = () => {
  points.value = points.value.map((point, index) => {
    const wrapperBoxLeft = wrapperBox.value?.getBoundingClientRect().left || 0
    const wrapperBoxTop = wrapperBox.value?.getBoundingClientRect().top || 0
    const pointBounds = pointRefs[index]?.getBoundingClientRect()
    const x = pointBounds?.left + pointBounds?.width / 2 - wrapperBoxLeft
    const y = pointBounds?.top + pointBounds?.height / 2 - wrapperBoxTop

    return { ...point, coords: { x, y } }
  })
}

const setLine = (lineIndex: number, pointA: any, pointB: any) => {
  lines.value[lineIndex] = {
    ...lines.value[lineIndex],
    isTracing: false,
    coords: {
      start: { x: pointA.coords.x, y: pointA.coords.y },
      end: { x: pointB.coords.x, y: pointB.coords.y },
    },
  }
}

const getNormalizedLineDuration = (length: number) => {
  const minTime = 0.8
  const maxTime = 2.5
  const minLength = 2
  const maxLength = 15

  const time =
    (minTime + ((length - minLength) / (maxLength - minLength)) * (maxTime - minTime)) /
    length

  return time
}

const setupAnimLines = () => {
  isAutoDraw.value = true
  animLines(0, patternToDo[0].length, 0, patternToDo.length)
}

const animLines = (
  currentPatternIndex: number,
  patternLength: number,
  currentArrayIndex: number,
  arrayLength: number,
) => {
  if (currentArrayIndex >= arrayLength) {
    isAutoDraw.value = false
    return
  }

  setLine(
    patternToDo[currentArrayIndex][currentPatternIndex],
    points.value[patternToDo[currentArrayIndex][currentPatternIndex]],
    points.value[patternToDo[currentArrayIndex][currentPatternIndex + 1]],
  )

  gsap.fromTo(
    lineRefs[patternToDo[currentArrayIndex][currentPatternIndex]],
    {
      drawSVG: '0%',
    },
    {
      drawSVG: '100%',
      duration: getNormalizedLineDuration(patternToDo[currentArrayIndex].length - 1),
      ease: 'linear',
      onStart: () => {
        lines.value[patternToDo[currentArrayIndex][currentPatternIndex]].isTracing = true
      },
      onComplete: () => {
        if (currentPatternIndex + 1 >= patternLength - 1) {
          animLines(
            0,
            patternToDo[currentArrayIndex + 1]?.length,
            currentArrayIndex + 1,
            arrayLength,
          )
        } else {
          animLines(
            currentPatternIndex + 1,
            patternLength,
            currentArrayIndex,
            arrayLength,
          )
        }
      },
    },
  )
}

const handleSetRefLines = (index: number, ref: SVGLineElement) => {
  lineRefs[index] = ref
}

const handleSetRefPoints = (index: number, ref: Element) => {
  pointRefs[index] = ref
}
</script>
