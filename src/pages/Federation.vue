<template>
  <div class="c-federation o-background-points">
    <img
      class="c-leaderboard__top-scores__lines"
      src="/img/lines-leaderboard.svg"
      alt=""
    />
    <div class="c-federation-modal-wrapper">
      <div class="c-federation-modal">
        <h1>merci d’avoir joué à neolympics !</h1>
        <p>
          Rejoue et essaye <strong>d’améliorer ton score</strong>, ou découvre les
          <strong>sites des fédérations</strong> des sports additionnels des Jeux
          Olympiques de 2024 !
        </p>
      </div>
      <div class="c-federation-modal-buttons">
        <div class="c-btn-wrapper">
          <ButtonUI imgSrc="/icon/share.svg" :isActive="false" class="--white" />
          <div class="c-btn-wrapper__inside --fedesharing">
            <button @click="handleShareCopy">
              <img src="/icon/link.svg" alt="" />
              <span>Copier le lien</span>
            </button>
            <button @click="handleShareWhatsapp">
              <img src="/icon/whatsapp.svg" alt="" />
              <span>Partager sur WhatsApp</span>
            </button>
            <button @click="handleShareFacebook">
              <img src="/icon/facebook.svg" alt="" />
              <span>Partager sur Facebook</span>
            </button>
            <button @click="handleShareTwitter">
              <img src="/icon/twitter.svg" alt="" />
              <span>Partager sur Twitter</span>
            </button>
          </div>
        </div>

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
          <img src="/img/fede/skater.webp" alt="" />
        </div>

        <SportCard @click="handleFedeSkateClick()">
          <template v-slot:sportimg>
            <img src="/img/fede/logo-skate.webp" alt="" />
          </template>
          <template v-slot:footer>
            <p>découvrir</p>
            <img src="/icon/go.svg" alt="" />
          </template>
        </SportCard>
      </div>

      <div class="card-fede-wrapper">
        <div class="--fede-perso">
          <img src="/img/fede/surfer.webp" alt="" />
        </div>
        <SportCard @click="handleFedeSurfClick()">
          <template v-slot:sportimg>
            <img src="/img/fede/logo-surf.webp" alt="" />
          </template>
          <template v-slot:footer>
            <p>découvrir</p>
            <img src="/icon/go.svg" alt="" />
          </template>
        </SportCard>
      </div>

      <div class="card-fede-wrapper">
        <div class="--fede-perso">
          <img src="/img/fede/breaker.webp" alt="" />
        </div>
        <SportCard @click="handleFedeBreakClick()">
          <template v-slot:sportimg>
            <img src="/img/fede/logo-danse.webp" alt="" />
          </template>
          <template v-slot:footer>
            <p>découvrir</p>
            <img src="/icon/go.svg" alt="" />
          </template>
        </SportCard>
      </div>

      <div class="card-fede-wrapper">
        <div class="--fede-perso">
          <img src="/img/fede/climber.webp" alt="" />
        </div>
        <SportCard @click="handleFedeClimbClick()">
          <template v-slot:sportimg>
            <img src="/img/fede/logo-climb.webp" alt="" />
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
import { useCurrentUser } from 'vuefire'
import { useScoreStore } from '@/core/store/score'

const currentUser = useCurrentUser()
const { scoreState } = useScoreStore()

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
  location.replace('/competition/preparation')
}

const TEXT = `Je viens de réaliser un super score de ${scoreState.currentScores.skate}pts🔥 sur Neolympics ! Viens essayer de me battre ⚔.`

const handleShareWhatsapp = () => {
  window.open(`https://web.whatsapp.com/send/?text=${TEXT} ${window.location.host}`)
}

const handleShareFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php/?u=${window.location.host}`)
}

const handleShareTwitter = () => {
  window.open(
    `https://twitter.com/share?text=${TEXT}&url=${window.location.host}&hashtags=neolympics,Paris2024`,
  )
}

const handleShareCopy = () => {
  navigator.clipboard.writeText(TEXT).then(
    () => {
      console.log('Async: Copying to clipboard was successful!')
    },
    (err) => {
      console.error('Async: Could not copy text: ', err)
    },
  )
}

const openingAnim = () => {
  cardsAnim.fromTo(
    '.c-federation-modal-wrapper',
    { y: '-200%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.6, ease: 'Power2.easeInOut' },
  )

  cardsAnim.fromTo(
    '.c-federation-modal-buttons button',
    { opacity: 0, x: '-60vw' },
    {
      opacity: 1,
      duration: 0.4,
      x: '0',
      stagger: {
        each: 0.1,
        from: 1,
      },
      ease: 'Power2.easeInOut',
    },
    '-=0.2',
  )

  cardsAnim.fromTo(
    '.card-fede-wrapper',
    { y: '+100%', opacity: 0 },
    {
      y: '0%',
      duration: 1.2,
      ease: 'Power2.easeInOut',
      opacity: 1,
      stagger: {
        each: 0.1,
        from: 0,
      },
    },
    '-=0.4',
  )
}

onMounted(() => {
  openingAnim()
})
</script>
