<template>
  <div class="c-mobile o-background-points">
    <div class="c-mobile__top">
      <img src="/img/mobile/top-text.svg" alt="Neolympics" />
    </div>
    <div class="c-mobile__middle">
      <img src="/img/mobile/middle-character.webp" />
      <Modal class="--blue c-mobile__middle__modal">
        <template v-slot:content>
          <div class="c-mobile__middle__modal__content">
            <p>Cette expérience n'est pas jouable sur smartphone.</p>
            <p>
              Vous pouvez y jouer sur le navigateur de votre <strong>ordinateur</strong> !
            </p>
          </div>
        </template>
      </Modal>
      <a href="https://www.instagram.com/neolympics/">
        <img src="/img/mobile/instagram.svg" />
        <span>Voir l'instagram</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import Modal from '@/components/common/Modal.vue'
</script>
