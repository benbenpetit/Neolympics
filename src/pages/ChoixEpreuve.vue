<template>
  <div class="c-trialrow" v-if="!selectedTrial">
    <SportCard>
      <template v-slot:sportname>SKATE</template>
      <template v-slot:sportimg>
        <img src="/img/planche-skate-verticale.png" alt="" />
      </template>
      <template v-slot:footer>
        <ButtonUI imgSrc="/icon/go.svg" @click="selectSkate">
          <template v-slot:label>CHOISIR</template>
        </ButtonUI>
      </template>
    </SportCard>
    <SportCard class="--disabled">
      <template v-slot:sportname>SURF</template>
      <template v-slot:sportimg>
        <img src="/img/planche-skate-verticale.png" alt="" />
      </template>
      <template v-slot:footer>À VENIR</template>
    </SportCard>
    <SportCard class="--disabled">
      <template v-slot:sportname>ESCALADE</template>
      <template v-slot:sportimg> <img src="/img/hand.png" alt="" /> </template>
      <template v-slot:footer>À VENIR</template>
    </SportCard>
    <SportCard class="--disabled">
      <template v-slot:sportname>BREAKING</template>
      <template v-slot:sportimg> <img src="/img/basket-breaking.png" alt="" /> </template>
      <template v-slot:footer>À VENIR</template>
    </SportCard>
  </div>

  <SportSlider v-if="selectedTrial" @previous="setPreviousSport" @next="setNextSport">
    <template v-slot:sportinfo>{{ sportParams[currentSport].info }}</template>
    <template v-slot:sportimg>
      <img :src="sportParams[currentSport].img" alt="" />
    </template>
    <template v-slot:sporttitle>{{ sportParams[currentSport].title }}</template>
    <template v-slot:buttonLtext>{{
      sportParams[currentSport - 1 == -1 ? 3 : (currentSport - 1) % 4].title
    }}</template>
    <template v-slot:buttonRtext>{{
      sportParams[Math.abs((currentSport + 1) % 4)].title
    }}</template>
    <template v-slot:footerL></template>
    <template v-slot:footerC></template>
    <template v-slot:footerR>
      <ButtonUI imgSrc="null" @click="gotoTrial()">
        <template v-slot:label>VALIDER MON CHOIX</template>
      </ButtonUI>
    </template>
  </SportSlider>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import SportCard from '@/components/common/SportCard.vue'
import SportSlider from '@/components/common/SportSlider.vue'
import { ref } from 'vue'

let selectedTrial = ref<boolean>(false)
let currentSport = ref<number>(0)

const selectSkate = () => {
  selectedTrial.value = true
  currentSport.value = 0
}

const setPreviousSport = () => {
  currentSport.value = --currentSport.value % 4

  if (currentSport.value == -1) {
    currentSport.value = 3
  }
}

const setNextSport = () => {
  currentSport.value = Math.abs(++currentSport.value % 4)
}

const gotoTrial = () => {
  console.log('go to ' + sportParams[currentSport.value].title)
}

const sportParams = [
  {
    title: 'SKATE',
    info: 'L’épreuve de Street se déroule dans un décor reproduisant les éléments d’une rue, comme les escaliers, les rails, les bancs... Les athlètes doivent enchaîner 5 figures dans un run de 45 secondes, et sont jugés sur leur capacité à maîtriser leur planche.',
    img: '/img/planche-skate-horizontale.png',
    available: true,
  },
  {
    title: 'SURF',
    info: 'L’épreuve de surf se déroule dans un environnement marin comme la mer ou locéan, blablablablablablablabla',
    img: '/img/planche-surf.png',
    available: false,
  },
  {
    title: 'BREAKING',
    info: 'L’épreuve de breaking a lieu blablablablablablablabla',
    img: '/img/basket-breaking.png',
    available: false,
  },
  {
    title: 'ESCALADE',
    info: 'Il faut grimper blablablablablablablabla',
    img: '/img/hand.png',
    available: false,
  },
]
</script>
