<template>
  <div class="c-sportslider-wrapper">
    <img
      class="c-sportslider-wrapper__forme"
      src="/img/forme-choix-epreuve.svg"
      alt=""
      ref="formeRef"
    />
    <div class="c-sportslider-buttons">
      <button @click="emit('previous')">
        <img src="/icon/arrow-slider.svg" alt="" />
        <h3>{{ props.prevLabel }}</h3>
      </button>
      <button @click="emit('next')">
        <h3>{{ props.nextLabel }}</h3>
        <img src="/icon/arrow-slider.svg" alt="" style="transform: rotate(180deg)" />
      </button>
    </div>

    <div class="c-sportslider-center">
      <div class="c-sportslider-center__info">
        <p>{{ props.sport.info }}</p>
      </div>
      <div class="sportimg-wrapper">
        <div class="sportimg">
          <!-- <img :src="props.sport.img" alt="" /> -->
          <model-viewer
            class="--3d-model"
            :src="props.sport.img"
            ar-modes="webxr"
            camera-controls
            shadow-intensity="0"
            disable-zoom
            disable-tap
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="500%"
            interaction-prompt="none"
            :camera-orbit="props.sport.cameraOrbit"
            scale="0.9 0.9 0.9"
            inputSensitivity="0.25"
          >
            <div slot="progress-bar" style="visibility: none"></div>
          </model-viewer>
        </div>
      </div>
    </div>

    <div class="c-sport-slider__floor c-floor" ref="floorRef">
      <span class="c-floor__circle" />
      <div class="c-floor__title">
        <span
          class="c-floor__title__inside"
          :style="{ fontSize: getNormalizedFontSize(props.sport.title) + 'vw' }"
          >{{ props.sport.title }}</span
        >
      </div>
    </div>

    <div class="sportslider-footer-wrapper">
      <footer class="c-sportslider-footer">
        <div class="footer-left">
          <template v-if="!!topThreePlayers?.length && props.sport.available">
            <p>Battez le score des champions !</p>
            <div class="footer-left-leaderboard">
              <CardLeaderboard
                v-for="(topPlayer, index) in topThreePlayers"
                :rank="index + 1"
                :user="topPlayer.user"
                :points="topPlayer.score.points"
                :quiz="topPlayer.score.quiz"
              />
            </div>
          </template>
        </div>
        <div class="footer-center" v-if="!props.sport.available">
          <p>À VENIR</p>
          <img src="/icon/lock.svg" alt="" />
        </div>
        <div class="footer-right" v-if="props.sport.available">
          <ButtonUI
            imgSrc="/icon/go.svg"
            @click="emit('onValidate')"
            style="width: 300px"
          >
            <template v-slot:label>VALIDER MON CHOIX</template>
          </ButtonUI>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { Howl, Howler } from 'howler'
import { IScoreWUser } from '@/core/types/IScore'
import CardLeaderboard from '@/components/common/CardLeaderboard.vue'
import ButtonUI from '@/components/common/ButtonUI.vue'
import '@google/model-viewer'

interface Props {
  topThreePlayers?: IScoreWUser[]
  sport: {
    title: string
    info: string
    img: string
    available: boolean
    icon?: string
    cameraOrbit?: string
  }
  prevLabel: string
  nextLabel: string
}

const props = defineProps<Props>()
const emit = defineEmits(['previous', 'next', 'onValidate'])

const floorRef = ref<HTMLDivElement | null>(null)
const formeRef = ref<HTMLDivElement | null>(null)

let sliderSweepSound = new Howl({
  src: ['/sounds/ui-sounds/appear-4.mp3'],
  volume: 0.1,
})

let sliderPopSound = new Howl({
  src: ['/sounds/ui-sounds/appear-3.mp3'],
  volume: 0.1,
})

gsap.registerPlugin(CustomEase)

const sliderEntry = gsap.timeline({})

const getNormalizedFontSize = (word = '') => {
  const minFontSize = 14
  const maxFontSize = 8
  const minLength = 4
  const maxLength = 10
  const currentLength = word.split('').length

  return (
    minFontSize +
    ((currentLength - minLength) / (maxLength - minLength)) * (maxFontSize - minFontSize)
  )
}

onMounted(() => {
  sliderEntry.fromTo(
    floorRef.value,
    {
      y: '70vh',
      opacity: 0,
    },
    {
      y: '30vh',
      opacity: 1,
      duration: 0.6,
      ease: 'Power2.easeInOut',
    },
  )

  sliderEntry.fromTo(
    formeRef.value,
    {
      // top: '200vh',
      // width: '0vw',
      // height: '0vh',
      opacity: 0,
    },
    {
      // top: '0%',
      // width: '100vw',
      // height: '100vh',
      opacity: 1,
      ease: 'Power2.easeInOut',
      duration: 0.6,
    },
    '-=0.4',
  )

  // sliderEntry.add(function () {
  //   sliderSweepSound.rate(1.5)
  //   sliderSweepSound.play()
  // })

  // sliderEntry.fromTo(
  //   '.sportimg .--3d-model',

  //   {
  //     scale: 0,
  //     y: '100%',
  //     opacity: 0,
  //     // filter: 'blur(20px)',
  //   },

  //   {
  //     scale: 1,
  //     y: '0%',
  //     duration: 0.8,
  //     ease: CustomEase.create('custom', 'M0,0,C0.2,0,0.604,1.392,1,1'),
  //     opacity: 1,
  //     // filter: 'blur(0px)',
  //   },
  // )

  sliderEntry.add(function () {
    sliderPopSound.rate(1.2)
    sliderPopSound.play()
  })

  sliderEntry.fromTo(
    '.c-sportslider-center__info',
    {
      opacity: 0,
      y: '-200%',
    },
    {
      y: '0',
      duration: 0.6,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
    '-=0.2',
  )

  sliderEntry.fromTo(
    '.sportslider-footer-wrapper',
    {
      y: '100%',
    },
    {
      y: '0%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
    '-=0.4',
  )

  sliderEntry.add(function () {
    sliderSweepSound.rate(1.5)
    sliderSweepSound.play()
  })

  sliderEntry.fromTo(
    '.sportimg .--3d-model',

    {
      scale: 0,
      y: '100%',
      opacity: 0,
      // filter: 'blur(20px)',
    },

    {
      scale: 1,
      y: '0%',
      duration: 0.6,
      ease: CustomEase.create('custom', 'M0,0,C0.2,0,0.604,1.392,1,1'),
      opacity: 1,
      // filter: 'blur(0px)',
    },
    '-=0.2',
  )

  sliderEntry.fromTo(
    '.c-sportslider-buttons button',
    {
      opacity: 0,
    },
    {
      duration: 0.5,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
    '-=0.2',
  )
})
</script>
