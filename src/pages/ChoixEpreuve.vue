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

  <SportSlider
    v-if="selectedTrial"
    @previous="gotoPreviousSport"
    @next="gotoNextSport"
    :class="[!sportParams[currentSport].available ? '--disabled' : '']"
  >
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
    <template v-slot:footerL v-if="sportParams[currentSport].available"></template>
    <template v-slot:footerC v-if="sportParams[currentSport].available"></template>
    <template v-slot:footerC v-if="!sportParams[currentSport].available">
      <p>À VENIR</p>
      <img src="/icon/lock.svg" alt="" />
    </template>
    <template v-slot:footerR v-if="sportParams[currentSport].available">
      <ButtonUI imgSrc="icon/go.svg" @click="gotoTrial()">
        <template v-slot:label>VALIDER MON CHOIX</template>
      </ButtonUI>
    </template>
  </SportSlider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import publicRouters from '@/data/publicRouters'
import ButtonUI from '@/components/common/ButtonUI.vue'
import SportCard from '@/components/common/SportCard.vue'
import SportSlider from '@/components/common/SportSlider.vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { onMounted } from 'vue'
import { Auth, getAuth, signOut } from 'firebase/auth'

gsap.registerPlugin(CustomEase)

const router = useRouter()
let selectedTrial = ref<boolean>(false)
let currentSport = ref<number>(0)
// let sliderDirection = ref<string | null>(null)

let auth: Auth

onMounted(async () => {
  auth = getAuth()
  signOut(auth).then(() => {
    console.log('Sign Out')
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

const removeCards = () => {
  gsap.to('.c-sportcard-wrapper', {
    y: '-110%',
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

const sportParams = [
  {
    title: 'SKATE',
    info: `L'épreuve de Street se déroule dans un décor reproduisant les éléments d'une rue, comme les escaliers, les rails, les bancs... Les athlètes doivent enchaîner 5 figures dans un run de 45 secondes, et sont jugés sur leur capacité à maîtriser leur planche.`,
    img: '/img/planche-skate-slider.png',
    available: true,
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
  sliderAnim.to('.c-sportslider-center h1', {
    filter: 'blur(25px)',
    duration: 0.3,
    ease: 'Power2.easeInOut',
  })

  sliderAnim.to(
    '.dropshadow',
    {
      scale: 1.3,
      duration: 0.3,
      ease: 'Power2.easeInOut',
    },
    '-=0.2',
  )

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
    '.footer-wrapper',
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
      y: '-100%',
      opacity: 0,
    },
    '-=0.4',
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
    },
    '-=0.2',
  )

  sliderAnim.to(
    '.footer-wrapper',
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
