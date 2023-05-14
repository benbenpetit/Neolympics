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
      :class="isOpenScores && '--sticky'"
      ref="lowScoresRef"
    >
      <Divider class="u-mb-double u-mt-double" @onClick="toggleLowScores">
        <template v-slot:main>
          <span>{{ !isOpenScores ? 'Voir plus' : 'Voir moins' }}</span>
        </template>
      </Divider>
      <ul class="c-leaderboard__low-scores__list">
        <li
          v-for="maxSession in getSortedMaxSessionsWUser(maxSessions).slice(
            !isOpenScores ? currentUserIndex : 3,
            !isOpenScores ? currentUserIndex + 2 : Infinity,
          )"
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
import { computed, onMounted, ref, watch } from 'vue'
import { useCurrentUser } from 'vuefire'

interface Props {
  maxSessions: IMaxSessionWUser[]
  isInProgress?: boolean
}

const { maxSessions, isInProgress } = defineProps<Props>()
const tl = gsap.timeline({ ease: 'Power2.easeInOut' })
const isOpenScores = ref(false)
const currentUser = useCurrentUser()
const currentUserIndex = computed(() =>
  maxSessions
    .map((maxSession) => maxSession.user?.id)
    .findIndex((maxSessionUserId) => maxSessionUserId == currentUser.value?.uid),
)

const lowScoresRef = ref<HTMLDivElement | null>(null)
const baseLowScoresOffsetTop = ref(0)

onMounted(() => {
  isOpenScores.value = false
})

const getLowScoresOffsetTop = () => {
  return lowScoresRef.value?.getBoundingClientRect().top
}

const toggleLowScores = () => {
  const lowScoresOffsetTop = getLowScoresOffsetTop() ?? 0

  if (!isOpenScores.value) {
    baseLowScoresOffsetTop.value = lowScoresOffsetTop
    isOpenScores.value = true
    gsap.fromTo(
      lowScoresRef.value,
      {
        position: 'fixed',
        top: lowScoresOffsetTop + 'px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
      },
      {
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        duration: 0.8,
        ease: 'Power3.easeInOut',
      },
    )
  } else {
    gsap.fromTo(
      lowScoresRef.value,
      {
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
      {
        position: 'fixed',
        top: baseLowScoresOffsetTop.value + 'px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        duration: 0.8,
        ease: 'Power3.easeInOut',
        onComplete: () => {
          isOpenScores.value = false
          gsap.set(lowScoresRef.value, {
            position: 'initial',
            top: 0,
          })
        },
      },
    )
  }
}
</script>
