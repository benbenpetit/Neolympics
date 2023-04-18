<template>
  <svg class="lines" draggable="false">
    <line
      v-for="(line, index) in lines"
      :x1="`${line.coords.start.x}px`"
      :y1="`${line.coords.start.y}px`"
      :x2="`${line.coords.end.x}px`"
      :y2="`${line.coords.end.y}px`"
    />
  </svg>
  <div class="pattern-wrapper" draggable="false">
    <div
      class="pattern-container"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove($event)"
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
        @mouseover="handleMouseOver(point)"
      >
        <div
          class="pattern-point"
          @mousedown="handleMouseDown(point, $event)"
          draggable="false"
        ></div>
      </div>
    </div>
    <div class="game-side">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import { onMounted, ref } from 'vue'

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

const numRows = ref(4) // Nombre de lignes dans la grille
const numCols = ref(3) // Nombre de colonnes dans la grille
const pointRefs: Element[] = [] // Ref des Point dans le DOM
const lineRefs: Element[] = [] // Ref des Lignes dans le DOM
const isDragging = ref(false)
const isCorrectPattern = ref(false)
const gridRef = ref<any>(null)
const currentPattern = ref<Number[]>([])
const patternToDo = ref<Number[]>([])
const points = ref<Point[]>([])
const lines = ref<Line[]>([])

const startPoint = ref<any>({ x: 0, y: 0 })
const currentPoint = ref<any>({ x: 0, y: 0 })

const currentLine = ref<any>()

for (let i = 1; i <= numRows.value * numCols.value; i++) {
  points.value.push({ id: i, isActive: false, coords: { x: 0, y: 0 } })
}

for (let i = 1; i <= numRows.value * numCols.value - 1; i++) {
  lines.value.push({
    id: i,
    isTracing: false,
    coords: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
  })
}

const handleMouseDown = (point: any, event: MouseEvent) => {
  point.isActive = true
  isDragging.value = true

  // Ajouter le point a la liste des points
  currentPattern.value.push(point.id)

  // Update le SVG de ligne
  currentLine.value = lines.value[currentPattern.value.length - 1]
  currentLine.value.isTracing = true
  currentLine.value.coords.start.x = point.coords.x
  currentLine.value.coords.start.y = point.coords.y
  currentLine.value.coords.end.x = event.clientX
  currentLine.value.coords.end.y = event.clientY
}

const handleMouseUp = () => {
  points.value = points.value.map((point) => ({ ...point, isActive: false }))
  isDragging.value = false
  isCorrectPattern.value = checkIfWon()
  setTimeout(() => {
    clearPattern()
  }, 1000)
}

const clearPattern = () => {
  currentPattern.value = []
  clearLines()
}

const clearLines = () => {
  lines.value = lines.value.map((line) => ({
    ...line,
    coords: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
  }))
}
const checkIfWon = () => {
  console.log(patternToDo.value, currentPattern.value)

  return patternToDo.value.every((val, index) => val === currentPattern.value[index])
}

const handleMouseMove = (event: MouseEvent) => {
  if (isDragging.value && currentLine.value.isTracing) {
    currentLine.value.coords.end.x = event.clientX
    currentLine.value.coords.end.y = event.clientY
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
const generatePattern = () => {
  patternToDo.value = []
  while (
    patternToDo.value.length <
    Math.floor(Math.random() * (numRows.value * numCols.value - 5 + 1) + 5)
  ) {
    var candidateInt = Math.floor(Math.random() * (numRows.value * numCols.value)) + 1
    if (patternToDo.value.indexOf(candidateInt) === -1)
      patternToDo.value.push(candidateInt)
  }
}

const setPointsCoords = () => {
  points.value = points.value.map((point, index) => {
    const pointBounds = pointRefs[index].getBoundingClientRect()
    const x = pointBounds.left + pointBounds.width / 2
    const y = pointBounds.top + pointBounds.height / 2

    return { ...point, coords: { x, y } }
  })
}

const handleSetRefPoints = (index: number, ref: Element) => {
  pointRefs[index] = ref
}

window.addEventListener('resize', () => {
  setPointsCoords()
})

onMounted(() => {
  setPointsCoords()
})
</script>
