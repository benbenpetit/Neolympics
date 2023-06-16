<template>
  <div class="o-background-points">
    <Header
      ref="headerRef"
      @onModalOpen="onModalOpen"
      @onModalClose="onModalClose"
      :imgSrc="headerIcon"
    >
      <template v-slot:title>
        {{
          sportConfirmed ? sportParams[currentSport].title : `CHOIX D'ÉPREUVE`
        }}</template
      >
    </Header>
    <div class="c-trialrow" v-if="!selectedTrial" ref="sportCardsWrapperRef">
      <SportCard @click="selectSkate">
        <template v-slot:sportname>SKATE</template>
        <template v-slot:sportimg>
          <img src="/img/planche-skate-verticale.webp" alt="" />
        </template>
        <template v-slot:footer>
          <p>DISPONIBLE</p>
          <img src="/icon/go.svg" alt="" />
        </template>
      </SportCard>

      <SportCard class="--disabled" @click="selectSurf">
        <template v-slot:sportname>SURF</template>
        <template v-slot:sportimg></template>
        <template v-slot:footer>
          <p>À VENIR</p>
          <img src="/icon/lock.svg" alt="" />
        </template>
      </SportCard>

      <SportCard class="--disabled" @click="selectBreak">
        <template v-slot:sportname>BREAKING</template>
        <template v-slot:sportimg></template>
        <template v-slot:footer>
          <p>À VENIR</p>
          <img src="/icon/lock.svg" alt="" />
        </template>
      </SportCard>

      <SportCard class="--disabled" @click="selectClimb">
        <template v-slot:sportname>ESCALADE</template>
        <template v-slot:sportimg></template>
        <template v-slot:footer>
          <p>À VENIR</p>
          <img src="/icon/lock.svg" alt="" />
        </template>
      </SportCard>
    </div>
    <SportSlider
      v-if="selectedTrial && !sportConfirmed"
      @previous="gotoPreviousSport"
      @next="gotoNextSport"
      :class="[!sportParams[currentSport].available ? '--disabled' : '']"
    >
      <template v-slot:sportinfo>{{ sportParams[currentSport].info }}</template>
      <template v-slot:sportimg>
        <img :src="sportParams[currentSport].img" alt="" />
      </template>
      <template v-slot:sporttitle>{{ sportParams[currentSport].title }}</template>
      <template v-slot:buttonLtext
        >{{ sportParams[currentSport - 1 == -1 ? 3 : (currentSport - 1) % 4].title }}
      </template>
      <template v-slot:buttonRtext>{{
        sportParams[Math.abs((currentSport + 1) % 4)].title
      }}</template>
      <template
        v-slot:footerL
        v-if="sportParams[currentSport].available && topThreePlayers.length"
      >
        <p>battez le score des champions !</p>
        <div class="footer-left-leaderboard">
          <CardLeaderboard
            v-for="(topPlayer, index) in topThreePlayers"
            :rank="index + 1"
            :user="topPlayer.user"
            :points="topPlayer.score.points"
            :quiz="topPlayer.score.points"
          />
        </div>
      </template>
      <template v-slot:footerC v-if="sportParams[currentSport].available"></template>
      <template v-slot:footerC v-if="!sportParams[currentSport].available">
        <p>À VENIR</p>
        <img src="/icon/lock.svg" alt="" />
      </template>
      <template v-slot:footerR v-if="sportParams[currentSport].available">
        <ButtonUI
          imgSrc="/icon/go.svg"
          @click="gotoDifficultySelector()"
          style="width: 300px"
        >
          <template v-slot:label>VALIDER MON CHOIX</template>
        </ButtonUI>
      </template>
    </SportSlider>

    <DifficultySelector v-if="sportConfirmed">
      <template v-slot:nametag-title>YUTO</template>
      <template v-slot:nametag-desc>
        <p>-</p>
        <p>SKATER DE<br />RÉPUBLIQUE</p>
      </template>
    </DifficultySelector>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import publicRouters from '@/data/publicRouters'
import ButtonUI from '@/components/common/ButtonUI.vue'
import SportCard from '@/components/common/SportCard.vue'
import SportSlider from '@/components/common/SportSlider.vue'
import DifficultySelector from '@/components/common/DifficultySelector.vue'
import Header from '@/components/common/Header.vue'
import CardLeaderboard from '@/components/common/CardLeaderboard.vue'

import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { onMounted } from 'vue'
import { Auth, getAuth, signOut } from 'firebase/auth'
import { NONAME } from 'dns'
import { Howl, Howler } from 'howler'
import { getTopScoresBySport } from '@/core/services/api/leaderboardApi'
import { IScoreWUser } from '@/core/types/IScore'

gsap.registerPlugin(CustomEase)

const router = useRouter()
const headerRef = ref<any | null>(null)
const sportCardsWrapperRef = ref<HTMLDivElement | null>(null)
//false pour commenncer du début
let selectedTrial = ref<boolean>(false)
let sportConfirmed = ref<boolean>(false)
let currentSport = ref<number>(0)
let headerIcon = computed<string>(() =>
  !sportConfirmed.value ? '/icon/whistle-icon.svg' : '/icon/skateboarding.svg',
)
let showCardIndex = 0
const topThreePlayers = ref<IScoreWUser[]>([])

const onModalOpen = () => {
  // @ts-ignore
  gameSoundtrack.addFilter({
    filterType: 'lowpass',
    frequency: 1500.0,
    Q: 3.0,
  })
}

const onModalClose = () => {
  // @ts-ignore
  gameSoundtrack.addFilter({
    filterType: 'lowpass',
    frequency: 20000.0,
    Q: 3.0,
  })
}

let auth: Auth

let sweepCardSound = new Howl({
  src: ['/sounds/ui-sounds/sweep-card.mp3'],
  volume: 0.1,
})

let gameSoundtrack = new Howl({
  src: ['/sounds/soundtracks/game-intro.mp3'],
  loop: true,
  volume: 0.8,
})

let sliderAppearSound = new Howl({
  src: ['/sounds/ui-sounds/appear-4.mp3'],
  volume: 0.1,
})

let sliderDisappearSound = new Howl({
  src: ['/sounds/ui-sounds/disappear.mp3'],
  volume: 0.1,
  rate: 0.9,
})

let sliderPopSound = new Howl({
  src: ['/sounds/ui-sounds/appear-3.mp3'],
  volume: 0.1,
  rate: 1.1,
})

onMounted(async () => {
  Howler.stop()

  const topScoresBySport = await getTopScoresBySport('skate', 3)
  topThreePlayers.value = topScoresBySport.reverse()

  gameSoundtrack.play()
  gameSoundtrack.fade(0, 0.8, 300)
})

onMounted(() => {
  showCards()
  gsap.from(headerRef.value?.headerRef, {
    y: '-120%',
    duration: 0.6,
    ease: 'Power4.easeInOut',
  })
})

const sliderAnim = gsap.timeline({})

const selectSkate = () => {
  currentSport.value = 0
  removeCards()
}

const selectSurf = () => {
  currentSport.value = 1
  removeCards()
}

const selectBreak = () => {
  currentSport.value = 2
  removeCards()
}

const selectClimb = () => {
  currentSport.value = 3
  removeCards()
}

const showCards = () => {
  showCardIndex = 0
  for (const sportCard of sportCardsWrapperRef.value?.children ?? []) {
    gsap.fromTo(
      sportCard,
      {
        y: '120%',
        x: '-30%',
      },
      {
        y: 0,
        x: 0,
        duration: 0.8,
        delay: 0.15 * showCardIndex++,
        ease: 'Power4.easeInOut',
      },
    )
  }
}

const removeCards = () => {
  sliderAnim.add(function () {
    sweepCardSound.rate(0.8)
    sweepCardSound.play()
  })

  sliderAnim.to('.c-sportcard-wrapper', {
    y: '-125%',
    x: '+30%',
    duration: 0.8,
    ease: 'Power4.easeInOut',
    stagger: {
      each: 0.1,
      from: currentSport.value,
    },
    onComplete: () => {
      selectedTrial.value = true
    },
  })
}

const setPreviousSport = () => {
  currentSport.value = --currentSport.value % 4
  if (currentSport.value == -1) {
    currentSport.value = 3
  }
}

const setNextSport = () => {
  currentSport.value = Math.abs(++currentSport.value % 4)
}

const setDifficultySelector = () => {
  sportConfirmed.value = true
}

const gotoTrial = () => {
  router.push(
    `${publicRouters.COMPETITION}/${sportParams[currentSport.value].title.toLowerCase()}`,
  )
}

const gotoNextSport = () => {
  // sliderDirection.value = 'next'
  sliderAnimOut()
  sliderAnim.add(setNextSport)
  sliderAnimIn()
}

const gotoPreviousSport = () => {
  // sliderDirection.value = 'previous'
  sliderAnimOut()
  sliderAnim.add(setPreviousSport)
  sliderAnimIn()
}

const gotoDifficultySelector = () => {
  sliderAnimOut()
  sliderAnim.add(setDifficultySelector)
}

const sportParams = [
  {
    title: 'SKATE',
    info: `L'épreuve de Street se déroule dans un décor reproduisant les éléments d'une rue, comme les escaliers, les rails, les bancs... Les athlètes doivent enchaîner 5 figures dans un run de 45 secondes, et sont jugés sur leur capacité à maîtriser leur planche.`,
    img: '/img/planche-skate-slider.png',
    available: true,
    icon: '/icon/skateboarding.svg',
  },
  {
    title: 'SURF',
    info: `Les surfeurs effectuent des manœuvres et des figures sur une vague, et sont ensuite notés par cinq juges en fonction de la variété de leur enchaînement, du type de figures réalisées et de leur difficulté.`,
    img: '/img/planche-surf-slider.png',
    available: false,
  },
  {
    title: 'BREAKING',
    info: `Les athlètes enchaîneront les « powermoves » comme les coupoles, les six-step ou encore les freezes en s'adaptant et en improvisant sur le son du DJ pour s'adjuger les votes des juges.`,
    img: '/img/sneakers-slider.png',
    available: false,
  },
  {
    title: 'ESCALADE',
    info: `L'épreuve de vitesse s'effectue sur un mur de 15 mètres et les athlètes sont assurés par des assureurs automatiques. Les athlètes doivent terminer une voie d'un niveau de complexité très élevé sans tomber, car une chute résulte en la fin de leur essai.`,
    img: '/img/baudrier-slider.png',
    available: false,
  },
]

const sliderAnimOut = () => {
  sliderAnim.to(
    '.c-sportslider-buttons button',
    {
      ease: 'Power2.easeInOut',
      duration: 0.2,
      opacity: 0,
    },
    // '-=0.1',
  )

  sliderAnim.to('.c-sportslider-buttons button', {
    visibility: 'hidden',
    duration: 0,
  })

  sliderAnim.to(
    '.c-sportslider-center h1',
    {
      filter: 'blur(25px)',
      duration: 0.3,
      ease: 'Power2.easeInOut',
      opacity: 0,
    },
    '-=0.1',
  )

  sliderAnim.to(
    '.dropshadow',
    {
      scale: 1.3,
      duration: 0.3,
      ease: 'Power2.easeInOut',
    },
    '-=0.2',
  )

  sliderAnim.add(function () {
    sliderDisappearSound.play()
  })

  sliderAnim.to(
    '.c-sportslider-center img',
    {
      y: '100%',
      // ease: 'Power4.easeInOut',
      ease: CustomEase.create('custom', 'M0,0 C0.4,-0.354 0.798,1 1,1'),
      duration: 0.4,
      opacity: 0,
      scale: 0,
      filter: 'blur(20px)',
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.dropshadow',
    {
      scale: 0,
      duration: 0.4,
      ease: 'Power2.easeInOut',
      opacity: 0,
    },
    '-=0.3',
  )

  sliderAnim.to(
    '.sportslider-footer-wrapper',
    {
      y: '100%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.c-sportslider-center p',
    {
      ease: 'Power2.easeInOut',
      duration: 0.4,
      y: '-200%',
      opacity: 0,
    },
    '-=0.4',
  )
}

const sliderAnimIn = () => {
  sliderAnim.to(
    '.dropshadow',
    {
      scale: 1.3,
      duration: 0.4,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
    '-=0.2',
  )

  sliderAnim.add(function () {
    sliderAppearSound.play()
  })

  sliderAnim.to(
    '.c-sportslider-center img',
    {
      y: '0%',
      ease: CustomEase.create('custom', 'M0,0,C0.2,0,0.604,1.392,1,1'),
      duration: 0.4,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.dropshadow',
    {
      scale: 1,
      duration: 0.3,
      ease: 'Power2.easeInOut',
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.c-sportslider-center h1',
    {
      filter: 'blur(2px)',
      duration: 0.3,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
    '-=0.2',
  )

  sliderAnim.add(function () {
    sliderPopSound.play()
  })

  sliderAnim.to(
    '.sportslider-footer-wrapper',
    {
      y: '0%',
      duration: 0.3,
      ease: 'Power2.easeInOut',
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.c-sportslider-center p',
    {
      ease: 'Power2.easeInOut',
      duration: 0.3,
      y: '0%',
      opacity: 1,
    },
    '-=0.3',
  )

  sliderAnim.to(
    '.c-sportslider-buttons button',
    {
      visibility: 'visible',
      ease: 'Power2.easeInOut',
      duration: 0.2,
      opacity: 1,
    },
    '-=0.1',
  )
}
</script>
