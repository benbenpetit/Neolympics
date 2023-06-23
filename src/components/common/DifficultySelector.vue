<template>
  <div class="c-difficulty">
    <div class="c-difficulty__wrapper">
      <div class="c-difficulty__poster c-poster">
        <div>
          <!-- <svg
            id="mask-1"
            width="875"
            height="330"
            viewBox="0 0 875 330"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            clipPathUnits="objectBoundingBox"
            :style="{ display: 'none', clipRule: 'nonzero' }"
          >
            <path
              d="M0.5 21V308.783C0.5 321.659 12.2313 331.347 24.8753 328.913L857.875 168.552C867.526 166.694 874.5 158.249 874.5 148.422V21C874.5 9.67815 865.322 0.5 854 0.5H21C9.67816 0.5 0.5 9.67816 0.5 21Z"
              fill="#D9D9D9"
              stroke="black"
            />
          </svg> -->
          <img src="/img/difficulty/poster1.png" alt="" />
        </div>
        <div>
          <img src="/img/difficulty/poster2.png" alt="" />
        </div>
      </div>
      <div class="c-difficulty__selector c-selector">
        <Modal class="--blue">
          <template v-slot:title>Niveau de difficulté</template>
          <template v-slot:content>
            <div class="c-selector__wrapper">
              <div class="c-selector__content">
                <h2>Le niveau 1 est recommandé aux nouveaux joueurs !</h2>
                <p>
                  Étant donné que ce niveau est réservé aux débutants, le maximum de
                  points que tu peux obtenir est de 80pts.
                </p>
                <p>
                  Tu as 4s pour compléter un tracé sur ce skateboard et ainsi faire une
                  figure de skate.
                </p>
                <p>
                  Plus tu es rapide, plus tu gagnes des points mais si tu es trop lent et
                  échoues, tu n'en gagneras aucun !
                </p>
              </div>
              <div class="c-selector__board">
                <img src="/img/difficulty/skate-template.webp" />
              </div>
            </div>
            <div class="c-selector__difficulties">
              <ul>
                <li v-for="(_, index) in [...Array(3).fill(0)]">
                  <button
                    @click=";(chosenDifficulty = index), clickSound.play()"
                    :class="chosenDifficulty === index && '--selected'"
                  >
                    Niveau {{ index + 1 }}
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </Modal>
      </div>
    </div>
    <!-- <div class="c-difficulty-modal">
      <Modal class="--blue">
        <template v-slot:title>Choisis ta difficulté</template>
        <template v-slot:content>
          <h3>{{ difficultyInfo[chosenDifficulty - 1].title }}</h3>
          <p>
            {{ difficultyInfo[chosenDifficulty - 1].info }}
          </p>
        </template>
      </Modal>
    </div> -->

    <!-- <div class="difficulty-footer-wrapper">
      <footer class="c-difficulty-footer">
        <div class="footer-left"></div>
        <div class="footer-center">
          <ButtonUI class="--white" :isActive="false" @click="gotoTraining()">
            <template v-slot:label>ENTRAINEMENT</template>
          </ButtonUI>
          <ButtonUI class="--red" @click="showModalOlympics()" imgSrc="/icon/go.svg">
            <template v-slot:label>EPREUVE OLYMPIQUE</template>
          </ButtonUI>
        </div>
        <div class="footer-right"></div>
      </footer>
    </div> -->
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
