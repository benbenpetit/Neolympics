<template>
  <div class="c-leaderboard">
    <header class="c-leaderboard__header">
      <h1>Leaderboard</h1>
      <img src="/img/leaderboard-world.png" />
    </header>
    <div class="c-leaderboard__top-scores">
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
      <div class="c-signin" :class="isOpenSignIn && '--open'" v-if="!currentUser">
        <ButtonUI @onClick="toggleOpenSignIn" :isActive="false" class="--no-hover">
          <template v-slot:label>ENREGISTER MON SCORE</template>
        </ButtonUI>
        <div class="c-signin__inside">
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
const isOpenSignIn = ref(false)

onMounted(() => {
  isOpenScores.value = false
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

const toggleOpenSignIn = () => {
  isOpenSignIn.value = !isOpenSignIn.value
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
