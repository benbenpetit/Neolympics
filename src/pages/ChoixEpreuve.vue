<template>
  <div class="choix-epreuve-background"></div>
  <div class="c-trialrow" v-if="!selectedTrial">
    <SportCard @click="selectSkate">
      <template v-slot:sportname>SKATE</template>
      <template v-slot:sportimg>
        <img src="/img/planche-skate-verticale.png" alt="" />
      </template>
      <template v-slot:footer>
        <p>DISPONIBLE</p>
        <img src="/icon/go.svg" alt="" />
      </template>
    </SportCard>

    <SportCard class="--disabled" @click="selectSurf">
      <template v-slot:sportname>SURF</template>
      <template v-slot:sportimg>
        <img src="/img/planche-skate-verticale.png" alt="" />
      </template>
      <template v-slot:footer>
        <p>À VENIR</p>
        <img src="/icon/lock.svg" alt="" />
      </template>
    </SportCard>

    <SportCard class="--disabled" @click="selectBreak">
      <template v-slot:sportname>BREAKING</template>
      <template v-slot:sportimg> <img src="/img/basket-breaking.png" alt="" /> </template>
      <template v-slot:footer>
        <p>À VENIR</p>
        <img src="/icon/lock.svg" alt="" />
      </template>
    </SportCard>

    <SportCard class="--disabled" @click="selectClimb">
      <template v-slot:sportname>ESCALADE</template>
      <template v-slot:sportimg> <img src="/img/hand.png" alt="" /> </template>
      <template v-slot:footer>
        <p>À VENIR</p>
        <img src="/icon/lock.svg" alt="" />
      </template>
    </SportCard>
  </div>

  <SportSlider v-if="selectedTrial" @previous="gotoPreviousSport" @next="gotoNextSport">
    <template v-slot:sportinfo>{{ sportParams[currentSport].info }}</template>
    <template v-slot:sportimg>
      <img :src="sportParams[currentSport].img" alt="" />
    </template>
    <template v-slot:sporttitle>{{ sportParams[currentSport].title }}</template>
    <template v-slot:buttonLtext>{{
      sportParams[currentSport - 1 == -1 ? 3 : (currentSport - 1) % 4].title
    }}</template>
    <template v-slot:buttonRtext>{{
      sportParams[Math.abs((currentSport + 1) % 4)].title
    }}</template>
    <template v-slot:footerL></template>
    <template v-slot:footerC></template>
    <template v-slot:footerR>
      <ButtonUI imgSrc="icon/go.svg" @click="gotoTrial()">
        <template v-slot:label>VALIDER MON CHOIX</template>
      </ButtonUI>
    </template>
  </SportSlider>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import SportCard from '@/components/common/SportCard.vue'
import SportSlider from '@/components/common/SportSlider.vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ref } from 'vue'

gsap.registerPlugin(CustomEase)

let selectedTrial = ref<boolean>(false)
let currentSport = ref<number>(0)
// let sliderDirection = ref<string | null>(null)

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

const removeCards = () => {
  gsap.to('.c-sportcard-wrapper', {
    y: '-110%',
    x: 80,
    duration: 0.8,
    ease: 'Power4.easeInOut',
    stagger: 0.1,
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

const gotoTrial = () => {
  console.log('go to ' + sportParams[currentSport.value].title)
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

const sportParams = [
  {
    title: 'SKATE',
    info: 'L’épreuve de Street se déroule dans un décor reproduisant les éléments d’une rue, comme les escaliers, les rails, les bancs... Les athlètes doivent enchaîner 5 figures dans un run de 45 secondes, et sont jugés sur leur capacité à maîtriser leur planche.',
    img: '/img/planche-skate-horizontale.png',
    available: true,
  },
  {
    title: 'SURF',
    info: `Les surfeurs effectuent des manœuvres et des figures sur une vague, et sont ensuite notés par cinq juges en fonction de la variété de leur enchaînement, du type de figures réalisées et de leur difficulté.`,
    img: '/img/planche-surf.png',
    available: false,
  },
  {
    title: 'BREAKING',
    info: `Les athlètes enchaîneront les « powermoves » comme les coupoles, les six-step ou encore les freezes en s’adaptant et en improvisant sur le son du DJ pour s’adjuger les votes des juges.`,
    img: '/img/basket-breaking.png',
    available: false,
  },
  {
    title: 'ESCALADE',
    info: `L’épreuve de vitesse s’effectue sur un mur de 15 mètres et les athlètes sont assurés par des assureurs automatiques. Les athlètes doivent terminer une voie d’un niveau de complexité très élevé sans tomber, car une chute résulte en la fin de leur essai.`,
    img: '/img/hand.png',
    available: false,
  },
]

const sliderAnimOut = () => {
  sliderAnim.to('.c-sportslider-center h1', {
    filter: 'blur(25px)',
    duration: 0.5,
    ease: 'circ.easeIn',
  })

  sliderAnim.to(
    '.dropshadow',
    {
      scaleX: 1.2,
      duration: 0.2,
      ease: 'Power4.easeInOut',
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.c-sportslider-center img',
    {
      y: '120%',
      // ease: 'Power4.easeInOut',
      ease: CustomEase.create(
        'custom',
        'M0,0,C0.42,-0.32,0.396,0.956,0.944,0.946,0.944,0.946,0.932,0.93,1,1',
      ),
      duration: 0.5,
      opacity: 0.5,
      scale: 0,
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.c-sportslider-center p',
    {
      ease: 'Power4.easeInOut',
      duration: 0.4,
      y: '-100%',
      opacity: 0,
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.c-sportslider-button h3',
    {
      ease: 'Power2.easeInOut',
      duration: 0.2,
      opacity: 0,
    },
    '-=0.1',
  )
}

const sliderAnimIn = () => {
  sliderAnim.to('.c-sportslider-center img', {
    y: '0%',
    ease: 'Power4.easeInOut',
    duration: 0.4,
    opacity: 1,
    scale: 1,
  }),
    '-=0.2',
    sliderAnim.to(
      '.dropshadow',
      {
        scaleX: 1,
        duration: 0.2,
        ease: 'Power4.easeInOut',
      },
      '-=0.2',
    )

  sliderAnim.to(
    '.c-sportslider-center h1',
    {
      filter: 'blur(2px)',
      duration: 0.3,
      ease: 'circ.easeOut',
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.c-sportslider-center p',
    {
      ease: 'Power4.easeInOut',
      duration: 0.4,
      y: '0%',
      opacity: 1,
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.c-sportslider-button h3',
    {
      ease: 'Power2.easeInOut',
      duration: 0.2,
      opacity: 1,
    },
    '-=0.1',
  )
}
</script>
