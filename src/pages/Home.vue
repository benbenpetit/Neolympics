<template>
  <Mobile v-if="isMobile" />
  <div v-if="!isMobile" class="c-homepage-wrapper">
    <div class="c-homepage-banner" ref="homeBannerRef">
      <img src="/img/home-banner-bg.svg" alt="" />
      <img src="/img/home-banner-title.svg" alt="" class="--title" />
    </div>
    <div class="c-homepage-bg o-background-points" ref="homeBgRef">
      <div class="c-homepage-figures">
        <Swiper
          :spaceBetween="300"
          :speed="500"
          loop
          :allowTouchMove="false"
          :autoplay="{
            delay: 2000,
          }"
          :modules="[Navigation, Autoplay]"
          @swiper="(swiper: SwiperType) => figuresSwiperRef = swiper"
          @slideChange="onFigureSlideChange"
        >
          <SwiperSlide class="c-homepage-figure" v-for="sport in SPORTS_IMAGES">
            <img :src="sport.figure" :alt="sport.name" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="c-homepage-marquee" ref="homeMarqueeRef">
        <div class="c-marquee">
          <p>
            <span>SKATE</span>
            <span>SKATE</span>
          </p>
          <p>
            <span>SURF</span>
            <span>SURF</span>
          </p>
          <p>
            <span>CLIMB</span>
            <span>CLIMB</span>
          </p>
          <p>
            <span>BREAK</span>
            <span>BREAK</span>
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
        Découvrez les <strong>sports additionnels</strong> des JEUX OLYMPIQUES 2024 et
        <strong>décrochez la première place du classement en ligne</strong>
      </p>
    </div>
    <div class="c-homepage-athletes" ref="homeAthleteRef">
      <Swiper
        :spaceBetween="300"
        :speed="500"
        loop
        :allowTouchMove="false"
        :autoplay="{
          delay: 2000,
        }"
        @swiper="(swiper: SwiperType) => athletesSwiperRef = swiper"
        :modules="[Navigation, Autoplay]"
        @slideChange="onAthleteSlideChange"
      >
        <SwiperSlide class="c-homepage-athlete" v-for="sport in SPORTS_IMAGES">
          <img :src="sport.athlete" :alt="sport.name" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <Cursor
    v-if="!isMobile"
    class="c-homepage-cursor"
    :style="{
      transform: `translate3d(calc(-50% + ${cursorPos.x}px), calc(-50% + ${cursorPos.y}px), 0)`,
    }"
    ref="cursorRef"
    @primaryAction="handleEnterGame"
  />
</template>

<script setup lang="ts">
import Mobile from '@/components/modules/Home/Mobile.vue'
import Cursor from '@/components/modules/Home/Cursor.vue'
import router from '@/core/router'
import publicRouters from '@/data/publicRouters'
import { onMounted, ref, watch } from 'vue'
import { Howl, Howler } from 'howler'
import { gsap } from 'gsap/all'
import { SPORTS } from '@/data/constants'
import SwiperType, { Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useMediaQuery } from '@vueuse/core'

const cursorRef = ref<any>(null)
const cursorPos = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const homeBannerRef = ref<any | null>(null)
const homeBgRef = ref<any | null>(null)
const homeFlagRef = ref<any | null>(null)
const homeBrushRef = ref<any | null>(null)
const homeAthleteRef = ref<any | null>(null)
const homeMarqueeRef = ref<HTMLDivElement | null>(null)
const figuresSwiperRef = ref<SwiperType | null>(null)
const athletesSwiperRef = ref<SwiperType | null>(null)
const isMobile = useMediaQuery('(max-width: 930px)')

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

watch([figuresSwiperRef, athletesSwiperRef], () => {
  if (figuresSwiperRef.value && athletesSwiperRef.value) {
    setTimeout(() => {
      figuresSwiperRef.value?.autoplay.start()
      athletesSwiperRef.value?.autoplay.start()
    }, 1000)
  }
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

  const playMarquee = () => {
    // @ts-ignore
    const width = marqueeContent.offsetWidth
    const gap = 88

    const distanceToTranslate = -1 * (gap + width)
    const x = Math.cos((12 * Math.PI) / 180) * distanceToTranslate
    const y =
      Math.tan((12 * Math.PI) / 180) *
      (Math.cos((12 * Math.PI) / 180) * distanceToTranslate)

    gsap.fromTo(
      homeMarqueeRef.value,
      {
        x: 0,
        y: 0,
      },
      {
        x: x,
        y: y,
        duration: 5,
        ease: 'none',
        repeat: -1,
      },
    )
  }

  setTimeout(() => {
    playMarquee()
  }, 500)

  window.addEventListener('resize', playMarquee)
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
  gsap.to('.c-homepage-athletes', {
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
      location.replace('/competition/preparation')
    },
  })
}
</script>
