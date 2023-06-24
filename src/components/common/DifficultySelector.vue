<template>
  <div class="c-difficulty">
    <div class="c-difficulty__wrapper">
      <div class="c-difficulty__poster c-poster">
        <div class="c-poster__cell">
          <img src="/img/difficulty/poster1.webp" alt="" />
          <img src="/img/difficulty/poster2.webp" alt="" />
        </div>
        <div class="c-poster__cell">
          <model-viewer
            class="c-poster__cell__object"
            src="/models/YutoSkate.glb"
            poster="/img/difficulty/poster-model.webp"
            loading="lazy"
            ar-modes="webxr"
            shadow-intensity="0"
            autoplay
            animation-name="P_PointerDuDoigt"
            disable-zoom
            disable-tap
            disable-pan
            interaction-prompt="none"
            camera-orbit="-10deg 90deg 0m"
            camera-target="0m 0.5m 0m"
          >
            <div slot="progress-bar" style="visibility: none"></div>
          </model-viewer>
          <div class="c-poster__cell__overlay">
            <h3>Yuto</h3>
            <p>Premier médaillé d'or en skateboard aux JO d'été 2020</p>
          </div>
        </div>
        <div class="c-poster__cell">
          <img src="/img/difficulty/poster4.webp" alt="" />
        </div>
      </div>
      <div class="c-difficulty__selector c-selector">
        <Modal class="--blue">
          <template v-slot:title>Niveau de difficulté</template>
          <template v-slot:content>
            <div class="c-selector__wrapper">
              <div class="c-selector__content">
                <h2>{{ DIFFICULTY_INFOS[chosenDifficulty - 1].title }}</h2>
                <div v-html="DIFFICULTY_INFOS[chosenDifficulty - 1].info" />
              </div>
              <div class="c-selector__board">
                <img src="/img/difficulty/skate-template.webp" />
              </div>
            </div>
            <div class="c-selector__difficulties">
              <ul>
                <li v-for="(_, index) in [...Array(3).fill(0)]">
                  <button
                    @click=";(chosenDifficulty = index + 1), clickSound.play()"
                    :class="chosenDifficulty === index + 1 && '--selected'"
                  >
                    Niveau {{ index + 1 }}
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </Modal>
        <ButtonUI imgSrc="/icon/go.svg" @click="showModalOlympics()">
          <template v-slot:label>C'EST PARTI !</template>
        </ButtonUI>
      </div>
    </div>
  </div>

  <Modal
    v-if="modalOlympicsVisible"
    @onBackdropClick="() => (modalOlympicsVisible = false)"
    class="--blue --fullscreen"
  >
    <template v-slot:title>Commencer l'épreuve ?</template>
    <template v-slot:content>
      Tu es sur le point de commencer une épreuve qui comptera dans ton tableau des
      scores. Une fois l’épreuve commencée, il n’y aura pas de retour posssible !
    </template>
    <template v-slot:buttons>
      <ButtonUI :isActive="false" @click="modalOlympicsVisible = false" class="--white">
        <template v-slot:label>RETOUR</template>
      </ButtonUI>
      <ButtonUI @click="gotoOlympics" class="--red">
        <template v-slot:label>COMMENCER !</template>
      </ButtonUI>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import Modal from '@/components/common/Modal.vue'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import publicRouters from '@/data/publicRouters'
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { Howl, Howler } from 'howler'
import { useSportStore } from '@/core/store/sport'
import '@google/model-viewer'

gsap.registerPlugin(CustomEase)
const { setSportStep, setSportDifficulty } = useSportStore()

let chosenDifficulty = ref<number>(1)
let sweepSound = new Howl({
  src: ['/sounds/ui-sounds/appear-1.mp3'],
  volume: 0.1,
})
let clickSound = new Howl({
  src: ['/sounds/ui-sounds/beep1.mp3'],
  volume: 0.05,
  rate: 0.8,
})

watch(
  chosenDifficulty,
  () => {
    setSportDifficulty('skate', chosenDifficulty.value)
  },
  { immediate: true },
)

const router = useRouter()
const difficultyAnim = gsap.timeline({})

const modalOlympicsVisible = ref<boolean>(false)

const DIFFICULTY_INFOS = [
  {
    title: `Le niveau 1 est recommandé pour les nouveaux joueurs`,
    info: `
      <p>C'est plus dur, donc le <strong>maximum de points que tu peux obtenir est de 80pts.</strong></p>
      <p>Tu as <strong>6s pour compléter un tracé</strong> sur ce skateboard et ainsi faire une figure de skate. </p>
      <p><strong>Plus tu es rapide, plus tu gagnes des points</strong> mais si tu es trop lent et échoues, tu n'en gagneras aucun ! </p>
      `,
  },
  {
    title: `Le niveau 2 est idéal si tu connais le jeu !`,
    info: `
      <p>C'est plus dur, donc le <strong>maximum de points que tu peux obtenir est de 80pts.</strong></p>
      <p>Tu as <strong>6s pour compléter un tracé</strong> sur ce skateboard et ainsi faire une figure de skate. </p>
      <p><strong>Plus tu es rapide, plus tu gagnes des points</strong> mais si tu es trop lent et échoues, tu n'en gagneras aucun ! </p>
      `,
  },
  {
    title: `Le niveau 3 cible les joueurs experts`,
    info: `
      <p>C'est plus dur, donc le <strong>maximum de points que tu peux obtenir est de 80pts.</strong></p>
      <p>Tu as <strong>6s pour compléter un tracé</strong> sur ce skateboard et ainsi faire une figure de skate. </p>
      <p><strong>Plus tu es rapide, plus tu gagnes des points</strong> mais si tu es trop lent et échoues, tu n'en gagneras aucun ! </p>
      `,
  },
]

const gotoTraining = () => {}

const showModalOlympics = () => {
  modalOlympicsVisible.value = true
}

const gotoOlympics = () => {
  modalOlympicsVisible.value = false
  setSportStep('skate', 0)
  router.push('/competition/skate')
}

onMounted(() => {
  difficultyAnim.add(function () {
    sweepSound.rate(1)
    sweepSound.play()
  })

  difficultyAnim.fromTo(
    '.c-difficulty__poster',
    {
      y: '100vh',
      opacity: 0,
    },
    {
      y: '0',
      opacity: 1,
      ease: 'Power3.easeInOut',
      duration: 1,
    },
    // '-=0.1',
  )

  difficultyAnim.add(function () {
    sweepSound.rate(1)
    sweepSound.play()
  })

  difficultyAnim.fromTo(
    '.c-difficulty__selector',
    {
      x: '100vw',
      opacity: 0,
    },
    {
      x: '0',
      opacity: 1,
      ease: 'Power3.easeInOut',
      duration: 1,
      onStart: () => {
        gsap.set('.c-selector__difficulties ul li', {
          opacity: 0,
        })
        gsap.fromTo(
          '.c-selector__difficulties ul li',
          {
            y: '20px',
            opacity: 0,
          },
          {
            y: '0',
            opacity: 1,
            ease: 'Power3.easeInOut',
            stagger: 0.05,
            delay: 0.8,
            duration: 0.6,
          },
        )
      },
    },
    '-=0.6',
  )
})
</script>
