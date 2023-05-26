<template>
  <div>Home</div>
  <router-link to="/competition">Compétition</router-link>
  <router-link :to="publicRouters.TRAINING">Entraînement</router-link>
  <div class="c-homepage-wrapper">
    <div class="c-homepage-banner">
      <img src="/img/home-banner-bg.svg" alt="" />
      <img src="/img/home-banner-title.svg" alt="" class="--title" />
      <!-- <div class="title">
        <h1>NEO</h1>
        <h1>LYMPICS</h1>
      </div> -->
    </div>
    <div class="c-homepage-bg">
      <!-- <img src="/img/home-illu1.png" alt="" /> -->
      <img src="/img/home-bg-full.svg" alt="" />
      <!-- <svg width="0" height="0">
        <defs>
          <clipPath id="home-bg-mask">
            <path
              d="M0 30C0 13.4315 13.4315 0 30 0H1308.46C1325.03 0 1338.46 13.4315 1338.46 30V199V440C1338.46 456.569 1325.03 470 1308.46 470H884C867.431 470 854 483.431 854 500V657.5V766C854 782.569 840.569 796 824 796H669.23H29.9999C13.4314 796 0 782.569 0 766V30Z"
            />
          </clipPath>
        </defs>
      </svg> -->
      <div class="c-homepage-illu">
        <img src="/img/home-illu-skater.svg" alt="" />
      </div>
      <div class="c-homepage-text">
        <p>AAAAHHH</p>
        <p class="--shadow">AAAAHHH</p>
      </div>
    </div>
    <div class="c-homepage-flag">
      <img src="/img/paris2024.svg" alt="" />
    </div>
    <div class="c-homepage-brush">
      <img src="/img/brush-home.png" alt="" />
      <p>
        Découvrez les <strong>sports<br />additionnels</strong> des JEUX OLYMPIQUES<br />2024
        et
        <strong>surpassez le monde entier</strong>
      </p>
    </div>
    <div class="c-homepage-character">
      <img src="/img/home-character.svg" alt="" />
    </div>
  </div>
  <Cursor
    class="c-homepage-cursor"
    :style="{
      transform: `translate3d(calc(-50% + ${cursorPos.x}px), calc(-50% + ${cursorPos.y}px), 0)`,
    }"
    ref="cursorRef"
    @primaryAction="handleCursorClick"
  />
  <!-- <ButtonHome></ButtonHome> -->
</template>

<script setup lang="ts">
import Cursor from '@/components/modules/Home/Cursor.vue'
import router from '@/core/router'
import publicRouters from '@/data/publicRouters'
import { onMounted, ref } from 'vue'
import { Howl, Howler } from 'howler'
import { gsap } from 'gsap/all'

onMounted(() => {
  // router.push('/competition/preparation')
  Howler.stop()
})

const cursorRef = ref<any>(null)
const cursorPos = ref<{ x: number; y: number }>({ x: 0, y: 0 })
let mouse = { x: 0, y: 0 }

window.addEventListener('mousemove', (e: MouseEvent) => {
  mouse = { x: e.pageX, y: e.pageY }
})

gsap.ticker.add(() => {
  const dt = 1.0 - Math.pow(1.0 - 0.1, gsap.ticker.deltaRatio())
  cursorPos.value.x += (mouse.x - cursorPos.value.x) * dt
  cursorPos.value.y += (mouse.y - cursorPos.value.y) * dt
})

const handleCursorClick = () => {
  console.log(cursorRef.value.cursorRef)
}
</script>
