<template>
  <div>
    <div class="timer-container">
      <h2>Timer</h2>
      <h2>{{ formatTime(elapsedTime) }}</h2>
      <button
        @click="
          () => {
            startTimer()
            mittInstance.emit('bntStart')
          }
        "
      >
        Démarrer
      </button>
      <button @click="stopTimer">Arrêter</button>
      <button @click="resetTimer">Réinitialiser</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import mittInstance from '@/core/lib/MittInstance'
import Experience from '@/webgl/Experience/Experience'
import { ref } from 'vue'

const isRunning = ref(false)
const elapsedTime = ref(0)
const stoppedTime = ref(0)
let startTime: any = null
let timerIntervalId: any = null

const startTimer = () => {
  console.log(Experience)
  if (!isRunning.value) {
    if (stoppedTime.value === 0) {
      startTime = new Date().getTime()
    } else {
      startTime = new Date().getTime() - stoppedTime.value
    }
    isRunning.value = true

    timerIntervalId = setInterval(() => {
      elapsedTime.value = (new Date().getTime() - startTime) / 1000
      if (elapsedTime.value >= 45) {
        clearInterval(timerIntervalId)
        isRunning.value = false
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
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  const centiseconds = Math.floor((time % 1) * 100)
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`
}
</script>

<style>
.timer-container {
  background: peachpuff;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 30px;
}
</style>
