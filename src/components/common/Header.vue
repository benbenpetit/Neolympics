<template>
  <header>
    <div class="c-header-wrapper">
      <div class="c-header-left"></div>
      <div class="c-header-center">
        <p><slot name="title"></slot></p>
        <slot name="icon" v-if="imgSrc">
          <img :src="imgSrc" alt="" />
        </slot>
      </div>
      <div class="c-header-right">
        <ButtonUI
          imgSrc="null"
          @click="soundClick()"
          class="--white"
          style="border: none"
        >
          <template v-slot:label>
            <img :src="soundEnabled ? soundOnSrc : soundOffSrc" alt="" />
          </template>
        </ButtonUI>
        <ButtonUI
          imgSrc="null"
          @click="showModalHome()"
          class="--white"
          style="border: none"
        >
          <template v-slot:label>ACCUEIL</template>
        </ButtonUI>
      </div>
    </div>
  </header>

  <Modal v-if="modalHomeVisible" imgSrc="null" class="--blue --fullscreen">
    <template v-slot:title>Retourner à l'accueil ?</template>
    <template v-slot:content>
      Tu es sur le point de quitter la compétition et retourner au choix du sport. Veux-tu
      continuer ?
    </template>
    <template v-slot:buttons>
      <ButtonUI @click="retourArriere" imgSrc="null" class="--white">
        <template v-slot:label>ANNULER</template>
      </ButtonUI>
      <ButtonUI @click="goHome" imgSrc="null" class="--red">
        <template v-slot:label>CONTINUER</template>
      </ButtonUI>
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
const soundOnSrc = '/icon/sound-on.svg'
const soundOffSrc = '/icon/sound-off.svg'
const { imgSrc } = withDefaults(defineProps<Props>(), {
  imgSrc: undefined,
})

let soundEnabled = ref<boolean>(true)
let modalHomeVisible = ref<boolean>(false)

interface Props {
  imgSrc?: string
}

const showModalHome = () => {
  modalHomeVisible.value = true
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
  modalHomeVisible.value = false
}

const goHome = () => {
  modalHomeVisible.value = false
}
</script>
