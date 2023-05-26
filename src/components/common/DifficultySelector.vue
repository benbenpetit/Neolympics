<template>
  <div class="c-difficulty-wrapper">
    <div class="c-difficulty-nametag">
      <div class="nametag-title">
        <slot name="nametag-title">okok</slot>
      </div>
      <div class="nametag-desc">
        <slot name="nametag-desc"></slot>
      </div>
    </div>

    <div class="c-difficulty-modal">
      <Modal class="--blue">
        <template v-slot:title>Choisis ta difficulté</template>
        <template v-slot:content>
          <h3>{{ difficultyInfo[chosenDifficulty - 1].title }}</h3>
          <p>
            {{ difficultyInfo[chosenDifficulty - 1].info }}
          </p>
        </template>
      </Modal>
      <div class="c-difficulty-buttons">
        <button
          class="--nv1"
          @click=";(chosenDifficulty = 1), clickSound.play()"
          :class="chosenDifficulty == 1 ? '--selected' : ''"
        >
          Niveau 1
        </button>
        <button
          class="--nv2"
          @click=";(chosenDifficulty = 2), clickSound.play()"
          :class="chosenDifficulty == 2 ? '--selected' : ''"
        >
          Niveau 2
        </button>
        <button
          class="--nv3"
          @click=";(chosenDifficulty = 3), clickSound.play()"
          :class="chosenDifficulty == 3 ? '--selected' : ''"
        >
          Niveau 3
        </button>
      </div>
    </div>

    <div class="character-middle">
      <video width="700" autoplay loop>
        <source src="/video/yuto-VP9.webm" type="video/webm" />
      </video>
    </div>

    <div class="difficulty-footer-wrapper">
      <footer class="c-difficulty-footer">
        <div class="footer-left"></div>
        <div class="footer-center">
          <ButtonUI class="--white" @click="gotoTraining()">
            <template v-slot:label>ENTRAINEMENT</template>
          </ButtonUI>
          <ButtonUI class="--red" @click="showModalOlympics()" imgSrc="/icon/go.svg">
            <template v-slot:label>EPREUVE OLYMPIQUE</template>
          </ButtonUI>
        </div>
        <div class="footer-right"></div>
      </footer>
    </div>
  </div>

  <Modal v-if="modalOlympicsVisible" class="--blue --fullscreen">
    <template v-slot:title>Commencer l'épreuve ?</template>
    <template v-slot:content>
      Tu es sur le point de commencer une épreuve qui comptera dans ton tableau des
      scores. Une fois l’épreuve commencée, il n’y aura pas de retour posssible !
    </template>
    <template v-slot:buttons>
      <ButtonUI @click="modalOlympicsVisible = false" class="--white">
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
import publicRouters from '@/data/publicRouters'
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ref } from 'vue'
import { Howl, Howler } from 'howler'
import { useSportStore } from '@/core/store/sport'

gsap.registerPlugin(CustomEase)

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

const router = useRouter()
const difficultyAnim = gsap.timeline({})

const modalOlympicsVisible = ref<boolean>(false)
const { setSportStep } = useSportStore()

const difficultyInfo = [
  {
    title: `Niveau recommandé pour les nouveaux joueurs`,
    info: `Tu as 5s pour compléter les tracés, donc il te sera plus facile de faire un bon
          score mais il te rapportera moins de points !`,
  },
  {
    title: `Niveau pour les joueurs expérimentés`,
    info: `Tu as 4s pour compléter un tracé, les figures sont plus complexes mais rapportent plus de points !`,
  },
  {
    title: `Niveau pour les joueurs experts`,
    info: `Les figures sont complexes et s'enchainent rapidement, mais elles rapportent beaucoup de points !`,
  },
]

const gotoTraining = () => {
  console.log('training')
}

const showModalOlympics = () => {
  modalOlympicsVisible.value = true
}

const gotoOlympics = () => {
  modalOlympicsVisible.value = false
  setSportStep('skate', 0)
  router.push('/competition/skate')
  console.log('olympics')
}

onMounted(() => {
  difficultyAnim.add(function () {
    sweepSound.rate(1)
    sweepSound.play()
  })

  difficultyAnim.fromTo(
    '.character-middle',
    {
      y: '150%',
      opacity: 0,
    },
    {
      y: '10%',
      opacity: 1,
      ease: 'Power2.easeInOut',
      duration: 0.5,
    },
    // '-=0.1',
  )

  difficultyAnim.add(function () {
    sweepSound.rate(1)
    sweepSound.play()
  })

  difficultyAnim.fromTo(
    '.c-difficulty-nametag',
    {
      x: '-100%',
      opacity: 0,
    },
    {
      x: '0%',
      opacity: 1,
      ease: 'Power2.easeInOut',
      duration: 0.3,
    },
    '-=0.2',
  )

  difficultyAnim.fromTo(
    '.c-difficulty-modal',
    {
      x: '100%',
      opacity: 0,
    },
    {
      x: '0%',
      opacity: 1,
      ease: 'Power2.easeInOut',
      duration: 0.3,
    },
    '-=0.2',
  )

  difficultyAnim.add(function () {
    sweepSound.rate(1.2)
    sweepSound.play()
  })

  difficultyAnim.fromTo(
    '.difficulty-footer-wrapper',
    {
      y: '100%',
      opacity: 0,
    },
    {
      y: '0%',
      opacity: 1,
      ease: 'Power2.easeInOut',
      duration: 0.4,
    },
    '-=0.1',
  )
})
</script>
