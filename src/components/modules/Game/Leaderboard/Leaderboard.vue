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
      <div class="c-low-scores">
        <Divider
          class="c-low-scores__divider u-pb-double u-pt-double"
          @onClick="toggleLowScores"
        >
          <template v-slot:main>
            <span>{{ !isOpenScores ? 'Voir plus' : 'Voir moins' }}</span>
          </template>
        </Divider>
        <div class="c-low-scores__list" :class="isOpenScores && '--open'">
          <ul class="c-low-scores__list__inside" ref="lowScores">
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
      <ButtonUI :isActive="false" class="--no-hover">
        <template v-slot:label>ENREGISTER MON SCORE</template>
      </ButtonUI>
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
import { IMaxSessionWUser } from '@/core/types/IScore'
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
const baseLowScoresOffsetTop = ref(0)

onMounted(() => {
  isOpenScores.value = false
})

const getLowScoresOffsetTop = () => {
  return (lowScoresRef.value?.getBoundingClientRect().top ?? 0) + window.scrollY
}

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

const toggleLowScores = () => {
  if (!isOpenScores.value) {
    isOpenScores.value = true
    gsap.to(window, {
      duration: 0.8,
      scrollTo: '.c-leaderboard__low-scores',
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
  }
}
</script>
