<template>
  <div class="c-trialrow">
    <SportCard>
      <template v-slot:sportname>SKATE</template>
      <template v-slot:sportimg> <img src="/img/planche-skate.png" alt="" /> </template>
      <template v-slot:footer>
        <ButtonUI imgSrc="/icon/go.svg">
          <template v-slot:label>CHOISIR</template>
        </ButtonUI>
      </template>
    </SportCard>
    <SportCard class="--disabled">
      <template v-slot:sportname>SURF</template>
      <template v-slot:sportimg> <img src="/img/planche-skate.png" alt="" /> </template>
    </SportCard>
    <SportCard class="--disabled">
      <template v-slot:sportname>ESCALADE</template>
      <template v-slot:sportimg> <img src="/img/hand.png" alt="" /> </template>
    </SportCard>
    <SportCard class="--disabled">
      <template v-slot:sportname>BREAKING</template>
      <template v-slot:sportimg> <img src="/img/basket-breaking.png" alt="" /> </template>
    </SportCard>
  </div>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
import SportCard from '@/components/common/SportCard.vue'
</script>
