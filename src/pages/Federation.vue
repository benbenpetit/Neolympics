<template>
  <div class="c-federation o-background-points">
    <div class="c-federation-modal-wrapper">
      <div class="c-federation-modal">
        <h1>merci d’avoir joué à neolympics !</h1>
        <p>
          N’hésite pas <strong>essayer d’améliorer ton score</strong>, et à visiter les
          <strong>sites des fédérations</strong> des sports additionnels des Jeux
          Olympiques de 2024 !
        </p>
      </div>
      <div class="c-federation-modal-buttons">
        <ButtonUI class="--white" imgSrc="/icon/share.svg"> </ButtonUI>
        <ButtonUI
          class="--red --playagain"
          imgSrc="/icon/go.svg"
          @click="handleAgainClick"
        >
          <template v-slot:label>rejouer</template>
        </ButtonUI>
      </div>
    </div>

    <div class="c-federation-animals">
      <div class="card-fede-wrapper">
        <div class="--fede-perso">
          <img src="/img/fede/skater.svg" alt="" />
        </div>

        <SportCard @click="handleFedeSkateClick()">
          <template v-slot:sportimg>
            <img src="/img/fede/logo-skate.svg" alt="" />
          </template>
          <template v-slot:footer>
            <p>découvrir</p>
            <img src="/icon/go.svg" alt="" />
          </template>
        </SportCard>
      </div>

      <div class="card-fede-wrapper">
        <div class="--fede-perso">
          <img src="/img/fede/surfer.svg" alt="" />
        </div>
        <SportCard @click="handleFedeSurfClick()">
          <template v-slot:sportimg>
            <img src="/img/fede/logo-surf.svg" alt="" />
          </template>
          <template v-slot:footer>
            <p>découvrir</p>
            <img src="/icon/go.svg" alt="" />
          </template>
        </SportCard>
      </div>

      <div class="card-fede-wrapper">
        <div class="--fede-perso">
          <img src="/img/fede/breaker.svg" alt="" />
        </div>
        <SportCard @click="handleFedeBreakClick()">
          <template v-slot:sportimg>
            <img src="/img/fede/logo-danse.svg" alt="" />
          </template>
          <template v-slot:footer>
            <p>découvrir</p>
            <img src="/icon/go.svg" alt="" />
          </template>
        </SportCard>
      </div>

      <div class="card-fede-wrapper">
        <div class="--fede-perso">
          <img src="/img/fede/climber.svg" alt="" />
        </div>
        <SportCard @click="handleFedeClimbClick()">
          <template v-slot:sportimg>
            <img src="/img/fede/logo-climb.svg" alt="" />
          </template>
          <template v-slot:footer>
            <p>découvrir</p>
            <img src="/icon/go.svg" alt="" />
          </template>
        </SportCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import SportCard from '@/components/common/SportCard.vue'
import { onMounted } from 'vue'
import router from '@/core/router'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const cardsAnim = gsap.timeline({})

const handleFedeSkateClick = () => {
  window.open('https://ffroller-skateboard.fr/', '_blank')
}

const handleFedeSurfClick = () => {
  window.open('https://www.surfingfrance.com/', '_blank')
}

const handleFedeBreakClick = () => {
  window.open('https://breaking.ffdanse.fr/', '_blank')
}

const handleFedeClimbClick = () => {
  window.open('https://www.ffme.fr/', '_blank')
}

const handleAgainClick = () => {
  router.push('/competition/preparation')
}

const openingAnim = () => {
  cardsAnim.fromTo(
    '.c-federation-modal-wrapper',
    { y: '-130%' },
    { y: '0%', duration: 1, ease: 'Power2.easeInOut' },
  ),
    cardsAnim.fromTo(
      '.c-federation-modal-buttons',
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'Power2.easeInOut' },
    ),
    cardsAnim.fromTo(
      '.card-fede-wrapper',
      { y: '+100%', opacity: 0 },
      {
        y: '0%',
        duration: 1.3,
        ease: 'Power2.easeInOut',
        opacity: 1,
        stagger: {
          each: 0.1,
          from: 0,
        },
      },
      '-=0.8',
    )
}

onMounted(() => {
  openingAnim()
})
</script>
