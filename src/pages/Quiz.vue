<template>
  <div class="quiz-background"></div>
  <QuizOverlay />

  <div class="c-quiz-wrapper" style="visibility: hidden">
    <div class="character-quiz">
      <video autoplay loop>
        <source src="/video/yuto-VP9.webm" type="video/webm" />
      </video>
    </div>

    <div class="c-quiz">
      <div class="c-quiz-modals">
        <Modal imgSrc="/icon/mic.svg" class="--blue" v-if="showQuiz && !quizCompleted">
          <template v-slot:upper-img>
            <img
              :src="getCurrentQuestion?.img"
              alt=""
              style="height: 200px, z-index::10"
            />
          </template>
          <template v-slot:title>Journaliste</template>
          <template v-slot:content>
            <img src="/icon/quote-open.svg" alt="" style="height: 20px" />
            <p>{{ getCurrentQuestion?.question }}</p>
            <img
              src="/icon/quote-close.svg"
              alt=""
              style="height: 20px; align-self: flex-end"
            />
          </template>
          <template v-slot:buttons>
            <ButtonUI
              imgSrc="null"
              @click="handleQuizClick(index)"
              v-for="(option, index) in getCurrentQuestion?.options"
              :key="index"
              class="--white"
              :class="getOptionClasses(index)"
              :disabled="selectedAnswer != null"
            >
              <template v-slot:label>
                {{ option }}
              </template>
            </ButtonUI>
          </template>
        </Modal>
        <section v-if="quizCompleted">
          <div
            :style="{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '2px solid #3656FF',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }"
          >
            <h1>Fin du Quiz</h1>
            <p>Score : {{ score }}/3</p>
            <ButtonUI @click="endQuiz" imgSrc="/icon/go.svg">
              <template v-slot:label>Suivant</template>
            </ButtonUI>
          </div>
        </section>
        <div class="c-info" v-if="!showQuiz">
          <Modal imgSrc="/icon/info.svg" class="gsap-quiz-info --blue">
            <template v-slot:title>Informations</template>
            <template v-slot:content>
              <p>{{ getCurrentQuestion?.info }}</p>
            </template>
            <template v-slot:buttons>
              <ButtonUI imgSrc="/icon/go.svg" @click="nextQuestion" class="--no-hover">
                <template v-slot:label>SUIVANT</template>
              </ButtonUI>
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import Modal from '@/components/common/Modal.vue'
import QuizOverlay from '@/components/modules/Quiz/QuizOverlay.vue'
import { IQuestion } from '@/core/types/IQuiz'
import { ref, computed, onMounted } from 'vue'
import { QUESTIONS_DATA } from '@/data/constants'
import { gsap } from 'gsap'
import { useSportStore } from '@/core/store/sport'
import { IScore } from '@/core/types/IScore'
import { useScoreStore } from '@/core/store/score'
import arrayShuffle from 'array-shuffle'
import { Howl, Howler } from 'howler'

onMounted(async () => {
  questions.value = arrayShuffle(QUESTIONS_DATA)
})

const { setCurrentScore } = useScoreStore()
const { setSportStep } = useSportStore()
const showQuiz = ref(true)
const selectedAnswer = ref<number | null>(null)
const quizCompleted = ref(false)
const questions = ref<IQuestion[]>([])
const currentQuestion = ref(0)

let score = 0
let questionAnswered = 0
let quizOverlaySound = new Howl({
  src: ['/sounds/ui-sounds/sweep-quiz.mp3'],
})

const quizOverlayTimeline = gsap.timeline({
  onComplete: function () {
    quizAnimation()
  },
})
const quizTimeline = gsap.timeline({})

const getCurrentQuestion = computed(() => {
  const question: IQuestion = questions.value[currentQuestion.value]
  if (!question) return
  question.index = currentQuestion.value
  return question
})

const endQuiz = () => {
  const tempScore: IScore = { points: score, sportId: 'skateQuiz' }
  setCurrentScore(tempScore)
  setSportStep('skate', 2)
}

const handleQuizClick = (index: number) => {
  if (!getCurrentQuestion.value) return
  selectedAnswer.value = index

  if (selectedAnswer.value === getCurrentQuestion.value.answer) {
    score++
  } else {
  }

  setTimeout(displayInfo, 1000)
  getOptionClasses(index)
}

const getOptionClasses = (index: number) => {
  if (!getCurrentQuestion.value) return
  const isCorrect =
    selectedAnswer.value !== null && index === getCurrentQuestion.value.answer
  const isWrong =
    selectedAnswer.value === index &&
    selectedAnswer.value !== getCurrentQuestion.value.answer

  const classes: { [key: string]: boolean } = {
    '--correct': isCorrect,
    '--wrong': isWrong,
  }

  return Object.keys(classes)
    .filter((key) => classes[key])
    .join(' ')
}

const setNextQuestion = () => {
  showQuiz.value = true
  selectedAnswer.value = null
  if (questionAnswered < 2) {
    currentQuestion.value++
    questionAnswered++
  } else {
    quizCompleted.value = true
  }
}

const quizOverlayAnimation = () => {
  quizOverlayTimeline.add(function () {
    quizOverlaySound.volume(0.5)
    quizOverlaySound.play()
  })

  quizOverlayTimeline.fromTo(
    '.intro-quiz-title img',
    {
      x: '-100%',
    },
    {
      x: '0%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
  )
  quizOverlayTimeline.fromTo(
    '.intro-quiz-title .text p',
    {
      x: '-300%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
    {
      x: '0%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
    '-=0.3',
  )
  quizOverlayTimeline.fromTo(
    '.intro-quiz-mic',
    {
      x: '150%',
      rotation: '45_short',
    },
    {
      x: '10%',
      rotation: '355_short',
      duration: 0.8,
      ease: 'Power2.easeInOut',
    },
    '-=0.2',
  )

  quizOverlayTimeline.to('.intro-quiz-title img', {
    x: '-100%',
    duration: 0.4,
    ease: 'Power2.easeInOut',
  })

  quizOverlayTimeline.to(
    '.intro-quiz-title .text p',
    {
      x: '-300%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
    '-=0.4',
  )

  quizOverlayTimeline.to(
    '.intro-quiz-mic',
    {
      x: '150%',
      rotation: '45_short',
      duration: 0.6,
      ease: 'Power2.easeInOut',
    },
    '-=0.4',
  )

  quizOverlayTimeline.to('.intro-quiz-wrapper', {
    visibility: 'hidden',
    duration: 0,
  })
}

const quizAnimation = () => {
  quizTimeline.fromTo(
    '.c-quiz-wrapper',
    {
      visibility: 'hidden',
      y: '-100%',
    },
    {
      visibility: 'visible',
      y: '0%',
      duration: 0,
      ease: 'Power4.easeInOut',
    },
  )

  quizTimeline.from('.character-quiz', {
    x: '-100%',
    duration: 0.4,
    ease: 'Power4.easeInOut',
  })

  quizTimeline.from(
    '.c-modal-wrapper',
    {
      x: '100%',
      duration: 0.4,
      ease: 'Power4.easeInOut',
    },
    '-=0.3',
  )
}

const displayInfo = () => {
  quizTimeline.to('.c-quiz-modals', {
    x: '120%',
    duration: 0.4,
    ease: 'Power4.easeInOut',
  })

  quizTimeline.add(function () {
    showQuiz.value = false
  })

  quizTimeline.to('.c-quiz-modals', {
    x: '0%',
    duration: 0.4,
    ease: 'Power4.easeInOut',
  })
}

const nextQuestion = () => {
  quizTimeline.to('.c-quiz-modals', {
    x: '120%',
    duration: 0.4,
    ease: 'Power4.easeInOut',
  })

  quizTimeline.add(function () {
    setNextQuestion()
  })

  quizTimeline.to('.c-quiz-modals', {
    x: '0%',
    duration: 0.4,
    ease: 'Power4.easeInOut',
  })
}

onMounted(() => {
  quizOverlayAnimation()
})
</script>
