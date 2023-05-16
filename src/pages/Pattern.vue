<template>
  <div class="skate-container">
    <div class="skate-layout">
      <div v-for="n in 24" class="layout-cell"></div>
    </div>
    <div
      class="pattern-wrapper"
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
          <div class="pattern-point" draggable="false"></div>
        </div>
      </div>
      <!-- <div class="game-side">
        <div class="pattern-to-do">
          <h2>Pattern à faire</h2>
          <span>{{ patternToDo }}</span>
        </div>
        <div class="current-pattern">
          <h2>Pattern en cours</h2>
          <span>{{ currentPattern }}</span>
        </div>
        <div class="current-pattern">
          <h2>Résultat</h2>
          <span>{{ isCorrectPattern ? 'Gagné' : 'Perdu' }}</span>
        </div>
        <ButtonUI @click="generatePattern" imgSrc="null" class="pattern-generator">
          <template v-slot:label>Générer un pattern à faire</template>
        </ButtonUI>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import mittInstance from '@/core/lib/MittInstance'
import { onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/all'

gsap.registerPlugin(DrawSVGPlugin)

const { patternToDo } = defineProps<Props>()

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

const numRows = ref(3) // Nombre de lignes dans la grille
const numCols = ref(5) // Nombre de colonnes dans la grille
const lineRefs: SVGLineElement[] = [] // Ref des Point dans le DOM
const pointRefs: Element[] = [] // Ref des Point dans le DOM
const isAutoDraw = ref(false)
const isDragging = ref(false)
const isCorrectPattern = ref(false)
const gridRef = ref<any>(null)
const currentPattern = ref<number[]>([])
// const patternToDo = ref<Number[]>([])
const points = ref<Point[]>([])
const lines = ref<Line[]>([])

const startPoint = ref<any>({ x: 0, y: 0 })
const currentPoint = ref<any>({ x: 0, y: 0 })

const currentLine = ref<any>()
const wrapperBox = ref<HTMLDivElement | null>(null)

for (let i = 1; i <= numRows.value * numCols.value; i++) {
  points.value.push({ id: i, isActive: false, coords: { x: 0, y: 0 } })
}

for (let i = 1; i <= numRows.value * numCols.value; i++) {
  lines.value.push({
    id: i,
    isTracing: false,
    coords: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
  })
}

onMounted(() => {
  setPointsCoords()
})

window.addEventListener('resize', () => {
  setPointsCoords()
})

const clearPattern = () => {
  currentPattern.value = []
  lines.value = []
}

const checkIfWon = () => {
  console.log(patternToDo, currentPattern.value)

  return patternToDo.flat().every((point, index) => point === currentPattern.value[index])
}

const handleMouseDown = (point: Point, event: MouseEvent) => {
  const wrapperBoxLeft = wrapperBox.value?.getBoundingClientRect().left || 0
  const wrapperBoxTop = wrapperBox.value?.getBoundingClientRect().top || 0
  point.isActive = true
  isDragging.value = true

  // Ajouter le point a la liste des points
  currentPattern.value.push(point.id)

  // Update le SVG de ligne
  currentLine.value = lines.value[currentPattern.value.length - 1]
  currentLine.value.isTracing = true
  currentLine.value.coords.start.x = point.coords.x
  currentLine.value.coords.start.y = point.coords.y
  currentLine.value.coords.end.x = event.clientX - wrapperBoxLeft
  currentLine.value.coords.end.y = event.clientY - wrapperBoxTop
}

const handleMouseUp = () => {
  isDragging.value = false
  isCorrectPattern.value = checkIfWon()
  console.log(isCorrectPattern.value)
  mittInstance.emit('Pattern joué', { status: isCorrectPattern.value })

  setTimeout(() => {
    points.value = points.value.map((point) => ({ ...point, isActive: false }))
    clearPattern()
  }, 1000)
}

const handleMouseMove = (event: MouseEvent) => {
  const wrapperBoxLeft = wrapperBox.value?.getBoundingClientRect().left || 0
  const wrapperBoxTop = wrapperBox.value?.getBoundingClientRect().top || 0
  if (isDragging.value && currentLine.value.isTracing) {
    currentLine.value.coords.end.x = event.clientX - wrapperBoxLeft
    currentLine.value.coords.end.y = event.clientY - wrapperBoxTop
  }
}

const handleMouseOver = (point: Point) => {
  if (isDragging.value && !currentPattern.value.includes(point.id)) {
    point.isActive = true
    currentPattern.value.push(point.id)
    currentLine.value.isTracing = false
    currentLine.value.coords.end.x = point.coords.x
    currentLine.value.coords.end.y = point.coords.y
    currentLine.value = lines.value[currentPattern.value.length - 1]
    currentLine.value.isTracing = true
    currentLine.value.coords.start.x = point.coords.x
    currentLine.value.coords.start.y = point.coords.y
    currentLine.value.coords.end.x = point.coords.x
    currentLine.value.coords.end.y = point.coords.y
  }
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

  return (
    (minTime + ((length - minLength) / (maxLength - minLength)) * (maxTime - minTime)) /
    length
  )
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
      duration: getNormalizedLineDuration(patternToDo[currentArrayIndex]?.length - 1),
      ease: 'linear',
      onStart: () => {
        lines.value[patternToDo[currentArrayIndex][currentPatternIndex]].isTracing = true
        points.value[patternToDo[currentArrayIndex][currentPatternIndex]].isActive = true
      },
      onComplete: () => {
        points.value[patternToDo[currentArrayIndex][currentPatternIndex + 1]].isActive =
          true
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
