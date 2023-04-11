<template>
  <div class="c-header-game-wrapper">
    <div class="c-header-game">
      <div class="c-header-game --left">
        <ButtonNavbar @handleClick="goBack" imgSrc="public/icon/arrow-left.svg">
          <template v-slot:label>Retour</template>
        </ButtonNavbar>
      </div>

      <div class="c-header-game --middle">
        <img src="public/icon/icon-skate.svg" alt="skate icon" />
        <h1>SKATE</h1>
      </div>
      <div class="c-header-game --right">
        <ButtonVolume />
        <ButtonNavbar @handleClick="goHome" imgSrc="public/icon/olympics.svg">
          <template v-slot:label>Accueil</template>
        </ButtonNavbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonNavbar from '@/components/common/ButtonNavbar.vue'
import ButtonVolume from '@/components/common/ButtonVolume.vue'

const goBack = () => {
  console.log('go back')
}

const goHome = () => {
  console.log('go home')
}
</script>
