<template>
  <div class="c-quiz">
    <!-- <div></div> -->
    <!-- <DisplayCharacter>
      <template v-slot:display>
        <img src="/img/perso.png" alt="character" style="width: 400px" />
      </template>
    </DisplayCharacter> -->
    <Modal imgSrc="/icon/mic.svg" class="--blue" v-if="showQuiz && !quizCompleted">
      <template v-slot:upper-img>
        <img :src="getCurrentQuestion.img" alt="" style="height: 200px" />
      </template>
      <template v-slot:title>Journaliste</template>
      <template v-slot:content>
        <img src="/icon/quote-open.svg" alt="" style="height: 20px" />
        <p>{{ getCurrentQuestion.question }}</p>
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
          v-for="(option, index) in getCurrentQuestion.options"
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
      <h1>fin du quiz</h1>
      <p>score :{{ score }}/3</p>
    </section>

    <div class="c-info" v-if="!showQuiz">
      <Modal imgSrc="/icon/info.svg" class="--blue">
        <template v-slot:title>Informations</template>
        <template v-slot:content>
          <p>{{ getCurrentQuestion.info }}</p>
        </template>
        <template v-slot:buttons>
          <ButtonUI imgSrc="/icon/go.svg" @click="nextQuestion" class="--no-hover">
            <template v-slot:label>SUIVANT</template>
          </ButtonUI>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import DisplayCharacter from '@/components/common/DisplayCharacter.vue'
import Modal from '@/components/common/Modal.vue'
import { ref, computed } from 'vue'

let score = 0
let showQuiz = ref(true)

const selectedAnswer = ref<number | null>(null)
const quizCompleted = ref(false)
const currentQuestion = ref(0)
const questions = ref([
  {
    question:
      'Très belle performance, mais cette troisième figure était si complexe que vous l’avez ratée ! Qu’est-ce que c’était ?',
    answer: 0,
    options: ['KICKFLIP', 'OLLIE', 'SHOVE-IT', 'PIGEON FLIP'],
    selected: null,
    img: '/img/skater.jpg',
    info: `Les Regular mettent le pied gauche devant.
          Les Goofy mettent le pied droit devant.

          Cette étape est déterminante puisqu’elle définit quel est votre pied avant et toutes les techniques de glisse et de virage à adapter en fonction.
          Notez qu’un Regular n’est pas forcément un gaucher, et un Goofy un droitier. En effet 75% des pratiquants évoluent en Regular (d'où le nom anglais de "Regular"...).`,
  },
  {
    question: "C'est quoi un skate ?",
    answer: 3,
    options: ['quoi', 'cou', 'beh', 'feur'],
    selected: null,
    img: '/img/quoi.jpeg',
    info: 'informations suplémentaires question 2',
  },
  {
    question: 'Tu préfères mourir ou devenir riche ????',
    answer: 2,
    options: ['rep1', 'rep2', 'rep3', 'rep4'],
    selected: null,
    img: '/img/guez.jpeg',
    info: 'informations suplémentaires question 3',
  },
])

const getCurrentQuestion = computed(() => {
  let question: any = questions.value[currentQuestion.value]
  question.index = currentQuestion.value
  return question
})

const handleQuizClick = (index: number) => {
  selectedAnswer.value = index
  // console.log(selectedAnswer)

  if (selectedAnswer.value === getCurrentQuestion.value.answer) {
    console.log('bonne reponse')
    score++
  } else {
    console.log('mauvaise reponse')
  }

  setTimeout(displayInfo, 1000)
  getOptionClasses(index)
}

const getOptionClasses = (index: number) => {
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

const displayInfo = () => {
  showQuiz.value = false
}

const nextQuestion = () => {
  showQuiz.value = true
  selectedAnswer.value = null
  if (currentQuestion.value <= 1) {
    currentQuestion.value++
  } else {
    quizCompleted.value = true
  }
}
</script>
