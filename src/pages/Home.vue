<template>
  <div class="c-homepage-wrapper">
    <div class="c-homepage-banner" ref="homeBannerRef">
      <img src="/img/home-banner-bg.svg" alt="" />
      <img src="/img/home-banner-title.svg" alt="" class="--title" />
      <!-- <div class="title">
        <h1>NEO</h1>
        <h1>LYMPICS</h1>
      </div> -->
    </div>
    <div class="c-homepage-bg" ref="homeBgRef">
      <img src="/img/home-bg-full.svg" alt="" />
      <div class="c-homepage-figures">
        <Swiper
          :spaceBetween="300"
          :speed="500"
          loop
          :allowTouchMove="false"
          :autoplay="{ delay: 2000 }"
          :modules="[Navigation, Autoplay]"
          @slideChange="onFigureSlideChange"
        >
          <SwiperSlide class="c-homepage-figure" v-for="sport in SPORTS_IMAGES">
            <img :src="sport.figure" :alt="sport.name" loading="lazy" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="c-homepage-marquee" ref="homeMarqueeRef">
        <div class="c-marquee">
          <p>
            <span>BEN</span>
            <span>BEN</span>
          </p>
          <p>
            <span>ARTH</span>
            <span>ARTH</span>
          </p>
          <p>
            <span>EMI</span>
            <span>EMI</span>
          </p>
        </div>
      </div>
    </div>
    <div class="c-homepage-flag" ref="homeFlagRef">
      <img src="/img/paris2024.svg" alt="" />
    </div>
    <div class="c-homepage-brush" ref="homeBrushRef">
      <img src="/img/brush-home.png" alt="" />
      <p>
        Découvrez les <strong>sports<br />additionnels</strong> des JEUX OLYMPIQUES<br />2024
        et
        <strong>surpassez le monde entier</strong>
      </p>
    </div>
    <div class="c-homepage-athletes" ref="homeAthleteRef">
      <Swiper
        :spaceBetween="300"
        :speed="500"
        loop
        :allowTouchMove="false"
        :autoplay="{ delay: 2000 }"
        :modules="[Navigation, Autoplay]"
        @slideChange="onAthleteSlideChange"
      >
        <SwiperSlide class="c-homepage-athlete" v-for="sport in SPORTS_IMAGES">
          <img :src="sport.athlete" :alt="sport.name" loading="lazy" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <Cursor
    class="c-homepage-cursor"
    :style="{
      transform: `translate3d(calc(-50% + ${cursorPos.x}px), calc(-50% + ${cursorPos.y}px), 0)`,
    }"
    ref="cursorRef"
    @primaryAction="handleEnterGame"
  />
</template>

<script setup lang="ts">
import Cursor from '@/components/modules/Home/Cursor.vue'
import router from '@/core/router'
import publicRouters from '@/data/publicRouters'
import { onMounted, ref } from 'vue'
import { Howl, Howler } from 'howler'
import { gsap } from 'gsap/all'
import { SPORTS } from '@/data/constants'
import { Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

const cursorRef = ref<any>(null)
const cursorPos = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const homeBannerRef = ref<any | null>(null)
const homeBgRef = ref<any | null>(null)
const homeFlagRef = ref<any | null>(null)
const homeBrushRef = ref<any | null>(null)
const homeAthleteRef = ref<any | null>(null)
const homeMarqueeRef = ref<HTMLDivElement | null>(null)
let mouse = { x: 0, y: 0 }

const SPORTS_IMAGES = SPORTS.map((sport) => ({
  name: sport,
  figure: `/img/home/figure/${sport}.webp`,
  athlete: `/img/home/athlete/${sport}.webp`,
}))

onMounted(() => {
  animIn()
  Howler.stop()
  onFigureSlideChange()
  onAthleteSlideChange()
  marqueeAAA()
})

window.addEventListener('mousemove', (e: MouseEvent) => {
  mouse = { x: e.pageX, y: e.pageY }
})

gsap.ticker.add(() => {
  const dt = 1.0 - Math.pow(1.0 - 0.07, gsap.ticker.deltaRatio())
  cursorPos.value.x += (mouse.x - cursorPos.value.x) * dt
  cursorPos.value.y += (mouse.y - cursorPos.value.y) * dt
})

const marqueeAAA = () => {
  const marqueeContent = homeMarqueeRef.value?.firstChild
  if (!marqueeContent) return
  const marqueeContentClone = marqueeContent?.cloneNode(true)
  homeMarqueeRef.value?.append(marqueeContentClone)

  setTimeout(() => {
    const width = parseInt(
      getComputedStyle(marqueeContent as Element).getPropertyValue('width'),
      10,
    )
    const gap = parseInt(
      getComputedStyle(marqueeContent as Element).getPropertyValue('column-gap'),
      10,
    )

    const distanceToTranslate = -1 * (gap + width)

    gsap.fromTo(
      homeMarqueeRef.value,
      {
        x: 0,
        y: 0,
      },
      {
        x: Math.cos((12 * Math.PI) / 180) * distanceToTranslate,
        y:
          Math.tan((12 * Math.PI) / 180) *
          (Math.cos((12 * Math.PI) / 180) * distanceToTranslate),
        duration: 6,
        ease: 'none',
        repeat: -1,
      },
    )
  }, 1000)
}

const onFigureSlideChange = () => {
  setTimeout(() => {
    const currentSlide = document.querySelector('.swiper-slide-active.c-homepage-figure')
    gsap.fromTo(
      currentSlide,
      {
        x: 0,
      },
      {
        x: -120,
        duration: 3.5,
        ease: 'linear',
        onComplete: () => {
          gsap.set(currentSlide, {
            x: 0,
          })
        },
      },
    )
  }, 100)
}

const onAthleteSlideChange = () => {
  setTimeout(() => {
    const currentSlide = document.querySelector('.swiper-slide-active.c-homepage-athlete')
    gsap.fromTo(
      currentSlide,
      {
        x: 0,
      },
      {
        x: -70,
        duration: 3.5,
        ease: 'linear',
        onComplete: () => {
          gsap.set(currentSlide, {
            x: 0,
          })
        },
      },
    )
  }, 100)
}

const animIn = () => {
  gsap.from(homeBrushRef.value, {
    y: '150%',
    duration: 0.8,
    delay: 0.2,
    ease: 'Power4.easeInOut',
  })
  gsap.from(homeBgRef.value, {
    y: '-120%',
    duration: 1,
    delay: 0,
    ease: 'Power4.easeInOut',
  })
  gsap.from(homeFlagRef.value, {
    x: 400,
    duration: 1,
    delay: 0.2,
    ease: 'Power4.easeInOut',
  })
  gsap.from(homeAthleteRef.value, {
    x: '120%',
    duration: 1,
    delay: 0,
    ease: 'Power4.easeInOut',
  })
  gsap.from(homeBannerRef.value, {
    x: '-100%',
    duration: 0.8,
    delay: 0.2,
    ease: 'Power4.easeInOut',
  })
}

const handleEnterGame = () => {
  gsap.to('.c-homepage-brush', {
    y: '150%',
    duration: 0.8,
    delay: 0.2,
    ease: 'Power4.easeInOut',
  })
  gsap.to('.c-homepage-bg', {
    y: '-120%',
    duration: 1,
    delay: 0,
    ease: 'Power4.easeInOut',
  })
  gsap.to('.c-homepage-flag', {
    x: 400,
    duration: 1,
    delay: 0.2,
    ease: 'Power4.easeInOut',
  })
  gsap.to('.c-homepage-character', {
    x: '120%',
    duration: 1,
    delay: 0,
    ease: 'Power4.easeInOut',
  })
  gsap.to('.c-homepage-banner', {
    x: '-100%',
    duration: 0.8,
    delay: 0.2,
    ease: 'Power4.easeInOut',
    onComplete: () => {
      router.push('/competition/preparation')
    },
  })
}
</script>
