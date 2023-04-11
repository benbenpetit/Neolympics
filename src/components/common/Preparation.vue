<template>
  <div class="c-preparation-wrapper">
    <div class="c-preparation">
      <Nametag>
        <template v-slot:name>YUTO</template>
        <template v-slot:info>SKATER DE RÉPUBLIQUE</template>
      </Nametag>

      <DisplayCharacter>
        <template v-slot:display>
          <img src="/img/perso-lapin.png" alt="character" style="width: 400px" />
        </template>
      </DisplayCharacter>

      <div class="c-difficulty-selector">
        <Modal class="--blue">
          <template v-slot:title>Difficulté</template>
          <template v-slot:content>blabla</template>
        </Modal>
      </div>
    </div>
    <div class="c-preparation-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Modal from '@/components/common/Modal.vue'
import Nametag from '@/components/common/Nametag.vue'
import DisplayCharacter from '@/components/common/DisplayCharacter.vue'

const startTraining = () => {
  console.log('click entrainement')
}

const startTrial = () => {
  console.log('click epreuve')
}
</script>
