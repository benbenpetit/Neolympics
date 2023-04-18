<template>
  <div class="c-sportslider-wrapper">
    <div class="c-sportslider-content">
      <div class="c-sportslider-button">
        <button @click="$emit('previous')">
          <img src="/icon/double-arrow-left.svg" alt="" />
          <h3><slot name="buttonLtext"></slot></h3>
        </button>
      </div>
      <div class="c-sportslider-center">
        <p><slot name="sportinfo"></slot></p>
        <slot name="sportimg"></slot>
        <div class="dropshadow"></div>
        <h1><slot name="sporttitle"></slot></h1>
      </div>
      <div class="c-sportslider-button">
        <button @click="$emit('next')">
          <h3><slot name="buttonRtext"></slot></h3>
          <img src="/icon/double-arrow-right.svg" alt="" />
        </button>
      </div>
    </div>
    <footer class="c-sportslider-footer">
      <div class="footer-left"><slot name="footerL"></slot></div>
      <div class="footer-center"><slot name="footerC"></slot></div>
      <div class="footer-right"><slot name="footerR"></slot></div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
</script>
