<template>
  <div class="c-leaderboard o-background-points">
    <Header imgSrc="/img/leaderboard-world.png">
      <template v-slot:title>CLASSEMENT</template>
    </Header>
    <div class="c-leaderboard__top-scores">
      <img
        class="c-leaderboard__top-scores-lines"
        src="/img/lines-leaderboard.svg"
        alt=""
      />
      <ul class="c-leaderboard__top-scores__list">
        <li
          v-for="(maxSession, index) in getSortedMaxSessionsWUser(maxSessions).slice(
            0,
            3,
          )"
        >
          <ResultCard
            :user="maxSession?.user"
            :maxSession="maxSession.maxSession"
            onlyTotalSession
            :podium="index + 1"
            :isInProgress="isInProgress"
          />
        </li>
      </ul>
    </div>
    <div
      class="c-leaderboard__low-scores"
      :class="isOpenScores && '--open'"
      ref="lowScoresRef"
    >
      <div class="c-low-scores" :class="currentUserIndex < 4 && 'u-mt-double'">
        <Divider
          v-if="currentUserIndex >= 4"
          class="c-low-scores__divider u-pb-double u-pt-double"
          @onClick="toggleLowScores"
        >
          <template v-slot:main>
            <span>{{ !isOpenScores ? 'Voir plus' : 'Voir moins' }}</span>
          </template>
        </Divider>
        <div class="c-low-scores__list" :class="isOpenScores && '--open'">
          <ul class="c-low-scores__list__inside" ref="lowScoresListRef">
            <li
              v-for="maxSession in getSortedMaxSessionsWUser(maxSessions).slice(3)"
              :key="maxSession?.user?.id"
            >
              <ResultCard
                :user="maxSession?.user"
                :maxSession="maxSession.maxSession"
                :rank="maxSession?.maxSession?.rank"
                isHorizontal
                :isInProgress="isInProgress"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <footer class="c-leaderboard__footer">
      <div class="c-btn-wrapper" v-if="!currentUser">
        <ButtonUI imgSrc="/icon/share.svg" :isActive="false" class="--white" />
        <div class="c-btn-wrapper__inside">
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
      <div class="c-btn-wrapper" v-if="!currentUser">
        <ButtonUI :isActive="false" class="--white">
          <template v-slot:label>ENREGISTRER MON SCORE</template>
        </ButtonUI>
        <div class="c-btn-wrapper__inside">
          <button @click="handleGoogleSignIn">
            <img src="/icon/google.svg" alt="" />
            <span>Se connecter avec Google</span>
          </button>
          <button @click="handleTwitterSignIn">
            <img src="/icon/twitter.svg" alt="" />
            <span>Se connecter avec Twitter</span>
          </button>
        </div>
      </div>
      <ButtonUI imgSrc="/icon/go.svg" class="--no-hover">
        <template v-slot:label>SUIVANT</template>
      </ButtonUI>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import Header from '@/components/common/Header.vue'
import Divider from '@/components/modules/Game/Leaderboard/Divider.vue'
import ResultCard from '@/components/modules/Game/Leaderboard/Profile/ResultCard.vue'
import router from '@/core/router'
import { addMaxSession } from '@/core/services/api/leaderboardApi'
import { IMaxSessionWUser } from '@/core/types/IScore'
import { signInWithGoogle, signInWithTwitter } from '@/core/utils/auth'
import { getSortedMaxSessionsWUser } from '@/core/utils/scores'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/all'
import { computed, onMounted, ref, watch } from 'vue'
import { useCurrentUser } from 'vuefire'
import { Howl, Howler } from 'howler'
gsap.registerPlugin(ScrollToPlugin)

interface Props {
  maxSessions: IMaxSessionWUser[]
  isInProgress?: boolean
}

const props = defineProps<Props>()

const isOpenScores = ref(false)
const currentUser = useCurrentUser()
const currentUserIndex = computed(() =>
  props.maxSessions
    .map((maxSession) => maxSession.user?.id)
    .findIndex((maxSessionUserId) => maxSessionUserId == currentUser.value?.uid),
)
const lowScoresRef = ref<HTMLDivElement | null>(null)
const lowScoresListRef = ref<HTMLUListElement | null>(null)

const leaderboardTheme = new Howl({
  src: ['/sounds/soundtracks/main-theme.mp3'],
  volume: 0.8,
  loop: true,
})

onMounted(() => {
  isOpenScores.value = false
  Howler.stop()
  leaderboardTheme.play()
  // addMaxSession(
  //   {
  //     createdAt: new Date(),
  //     break: 90,
  //     breakQuiz: 2,
  //     climbing: 60,
  //     climbingQuiz: 1,
  //     skate: 75,
  //     skateQuiz: 3,
  //     surf: 50,
  //     surfQuiz: 0,
  //   },
  //   '3qzA8K6JyhPfwH6nlU8uuDBrOcJ3',
  // )
})

watch(
  isOpenScores,
  () => {
    if (isOpenScores.value) {
      document.querySelector('body')?.classList.add('unscroll')
    } else {
      document.querySelector('body')?.classList.remove('unscroll')
    }
  },
  { immediate: true },
)

const getLowScoresListOffset = (offset = 0) =>
  lowScoresListRef.value?.children?.length
    ? (lowScoresListRef.value.offsetHeight * (currentUserIndex.value - 3 - offset)) /
      (lowScoresListRef.value?.children?.length ?? 0)
    : 0

watch(
  () => props.maxSessions,
  () => {
    if (currentUserIndex.value >= 4) {
      gsap.to(lowScoresListRef.value, {
        duration: 0,
        marginTop: -getLowScoresListOffset(),
        ease: 'Power3.easeInOut',
      })
    }
  },
  { immediate: true, deep: true },
)

const toggleLowScores = () => {
  const lowScoresListOffset = getLowScoresListOffset()
  const lowScoresListOffsetMax = getLowScoresListOffset(
    currentUserIndex.value < 5 ? 2 : 1,
  )
  if (!isOpenScores.value) {
    isOpenScores.value = true
    gsap.to(window, {
      duration: 0.8,
      scrollTo: '.c-leaderboard__low-scores',
      ease: 'Power3.easeInOut',
    })
    gsap.to(lowScoresListRef.value, {
      duration: 0.8,
      marginTop: 0,
      ease: 'Power3.easeInOut',
    })
    gsap.to(lowScoresRef.value, {
      duration: 0.8,
      scrollTo:
        lowScoresListOffsetMax < 0
          ? lowScoresListOffset - 50
          : lowScoresListOffsetMax - 50,
      ease: 'Power3.easeInOut',
    })
  } else {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: 0,
      ease: 'Power3.easeInOut',
      onComplete: () => {
        isOpenScores.value = false
      },
    })
    gsap.to(lowScoresRef.value, {
      duration: 0.8,
      scrollTo: 0,
      ease: 'Power3.easeInOut',
    })
    gsap.to(lowScoresListRef.value, {
      duration: 0.8,
      marginTop: -getLowScoresListOffset(),
      ease: 'Power3.easeInOut',
    })
  }
}

const TEXT = `Je viens de réaliser un super score de 307pts🔥 sur Neolympics ! Viens essayer de me battre ⚔.`

const handleShareWhatsapp = () => {
  window.open(`https://web.whatsapp.com/send/?text=${TEXT} ${window.location.host}`)
}

const handleShareFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php/?u=${window.location.host}`)
}

const handleShareTwitter = () => {
  window.open(
    `https://twitter.com/share?text=${`Je viens de réaliser un super score de 307pts🔥 sur Neolympics ! Viens essayer de me battre ⚔`}&url=${
      window.location.host
    }&hashtags=neolympics,Paris2024`,
  )
}

const handleShareCopy = () => {
  const text = `Je viens de réaliser un super score de 307pts sur Neolympics ! ${window.location.host}`

  navigator.clipboard.writeText(text).then(
    () => {
      console.log('Async: Copying to clipboard was successful!')
    },
    (err) => {
      console.error('Async: Could not copy text: ', err)
    },
  )
}

const handleGoogleSignIn = async () => {
  await signInWithGoogle(window.location.pathname)
  router.go(0)
}

const handleTwitterSignIn = async () => {
  await signInWithTwitter(window.location.pathname)
  router.go(0)
}
</script>
