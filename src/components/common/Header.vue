<template>
  <header class="c-header" ref="headerRef">
    <div class="c-header-wrapper" :class="!background ? '--no-bg' : ''">
      <img src="/img/brush-header.png" class="c-header-wrapper__brush" />
      <div class="c-header-left">
        <slot name="icon" v-if="props.imgSrc">
          <img :src="props.imgSrc" alt="" />
        </slot>
        <p><slot name="title"></slot></p>
      </div>
      <div class="c-header-center"></div>
      <div class="c-header-right">
        <ButtonUI
          @click="soundClick()"
          :isActive="false"
          class="--white"
          style="border: none"
        >
          <template v-slot:label>
            <img :src="soundEnabled ? soundOnSrc : soundOffSrc" alt="" />
          </template>
        </ButtonUI>
        <ButtonUI
          @click="showModalHome"
          :isActive="false"
          class="--white"
          style="border: none"
        >
          <template v-slot:label>ACCUEIL</template>
        </ButtonUI>
      </div>
    </div>
  </header>

  <Modal
    v-if="modalHomeVisible"
    @onBackdropClick="() => (modalHomeVisible = false)"
    class="--blue --fullscreen"
  >
    <template v-slot:title>Retourner à l'accueil ?</template>
    <template v-slot:content>
      Tu es sur le point de quitter la compétition et retourner au choix du sport. Veux-tu
      continuer ?
    </template>
    <template v-slot:buttons>
      <ButtonUI @click="retourArriere" class="--white">
        <template v-slot:label>ANNULER</template> </ButtonUI
      ><router-link to="/">
        <ButtonUI @click="goHome" class="--red">
          <template v-slot:label>CONTINUER</template>
        </ButtonUI></router-link
      >
    </template>
  </Modal>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import publicRouters from '@/data/publicRouters'
import Modal from '@/components/common/Modal.vue'
import { Howl, Howler } from 'howler'

const router = useRouter()
const headerRef = ref<HTMLHeadElement | null>(null)
const soundOnSrc = '/icon/sound-on.svg'
const soundOffSrc = '/icon/sound-off.svg'

const props = withDefaults(defineProps<Props>(), {
  imgSrc: undefined,
  background: true,
})

defineExpose({ headerRef })

const emit = defineEmits(['onModalOpen', 'onModalClose'])

let soundEnabled = ref<boolean>(true)
let modalHomeVisible = ref<boolean>(false)

interface Props {
  imgSrc?: string
  background?: boolean
}

const showModalHome = () => {
  modalHomeVisible.value = true
  emit('onModalOpen')
}

const closeModalHome = () => {
  modalHomeVisible.value = false
  emit('onModalClose')
}

const soundClick = () => {
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) {
    Howler.mute(false)
  } else {
    Howler.mute(true)
  }
}

const retourArriere = () => {
  closeModalHome()
}

const goHome = () => {
  closeModalHome()
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    retourArriere()
  }
})
</script>
