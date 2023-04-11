<template>
  <HeaderGame />
  <template v-if="isShowModal">
    <Modal class="--blue --fullscreen">
      <template v-slot:title>Commencer l'épreuve maintenant ?</template>
      <template v-slot:content>
        Tu es sur le point de commencer une épreuve qui comptera dans ton tableau des
        scores. Une fois l’épreuve commencée, il n’y aura pas de retour en arrière !
      </template>
      <template v-slot:buttons>
        <ButtonUI @handleClick="retourArriere" imgSrc="null" class="--white">
          <template v-slot:label>RETOUR EN ARRIÊRE</template>
        </ButtonUI>
        <ButtonUI @handleClick="continuer" imgSrc="null" class="--red">
          <template v-slot:label>CONTINUER !</template>
        </ButtonUI>
      </template>
    </Modal>
  </template>

  <Preparation>
    <template v-slot:footer>
      <ButtonUI imgSrc="/icon/barbell.svg" class="--white" @handleClick="startTraining">
        <template v-slot:label>ENTRAINEMENT</template>
      </ButtonUI>
      <ButtonUI imgSrc="/icon/play.svg" class="--red" @handleClick="startTrial">
        <template v-slot:label>EPREUVE OLYMPIQUE</template>
      </ButtonUI>
    </template>
  </Preparation>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import Modal from '@/components/common/Modal.vue'
import Preparation from '@/components/common/Preparation.vue'
import HeaderGame from '@/components/common/HeaderGame.vue'
import { ref } from 'vue'

let isShowModal = ref(false)

const retourArriere = () => {
  console.log('retour en arrière')
  isShowModal.value = false
}

const continuer = () => {
  console.log('continuer')
  isShowModal.value = false
}

const startTraining = () => {
  console.log('entrainement')
}

const startTrial = () => {
  console.log('epreuve olympique')
  isShowModal.value = true
}
</script>

<style>
body {
  background-color: peachpuff;
  margin: 0;
}
</style>
