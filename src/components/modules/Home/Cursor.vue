<template>
  <button
    ref="cursorRef"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    class="c-cursor"
  >
    <div class="c-cursor__outer" ref="outerRef">
      <img src="/icon/cursor/outer.svg" alt="GOBELINS & JO" draggable="false" />
    </div>
    <div class="c-cursor__inner" ref="innerRef">
      <img src="/icon/cursor/inner.svg" alt="ENTRER" draggable="false" />
    </div>
    <img
      class="c-cursor__play"
      src="/icon/cursor/play.svg"
      alt="Triangle rouge"
      draggable="false"
    />
  </button>
</template>

<script setup lang="ts">
import { gsap } from 'gsap/all'
import { onMounted, ref } from 'vue'

const cursorRef = ref<HTMLButtonElement | null>(null)
const outerRef = ref<HTMLDivElement | null>(null)
const innerRef = ref<HTMLDivElement | null>(null)
const isMouseDown = ref(false)
let rotating: GSAPTimeline
let speed = 1

const emit = defineEmits(['primaryAction'])
defineExpose({ cursorRef })

onMounted(() => {
  rotating = gsap
    .timeline({ repeat: -1 })
    .to(innerRef.value, { rotate: 360, ease: 'linear', duration: 5 })
})

const rotateLoop = () => {
  if (isMouseDown.value) {
    speed *= 1.05
    if (speed > 20) {
      emit('primaryAction')
      return
    }
    rotating.timeScale(1 + Math.log(speed) * 3)
    requestAnimationFrame(rotateLoop)
  }
}

const handleMouseDown = () => {
  isMouseDown.value = true
  gsap.to(cursorRef.value, {
    width: '40vmin',
    height: '40vmin',
    duration: 2,
    ease: 'Power4.easeOut',
  })
  rotateLoop()
}

window.addEventListener('mouseup', () => {
  handleMouseUp()
})

const decreaseSpeed = () => {
  if (!isMouseDown.value) {
    speed *= 0.95
    if (speed <= 1) {
      return
    }
    rotating.timeScale(speed)
    requestAnimationFrame(decreaseSpeed)
  }
}

const handleMouseUp = () => {
  isMouseDown.value = false
  gsap.to(cursorRef.value, {
    width: '35vmin',
    height: '35vmin',
    duration: 2,
    ease: 'Power4.easeOut',
  })
  decreaseSpeed()
}
</script>
