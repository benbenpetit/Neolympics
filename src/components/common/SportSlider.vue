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
        <div class="sportimg-wrapper">
          <div class="sportimg">
            <slot name="sportimg"></slot>
          </div>
          <div class="dropshadow"></div>
        </div>
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
import { onMounted } from 'vue'
import { gsap } from 'gsap'

const sliderEntry = gsap.timeline({})

onMounted(() => {
  sliderEntry.fromTo(
    '.c-sportslider-center h1',
    {
      opacity: 0,
    },
    {
      duration: 0.5,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
  )
  sliderEntry.fromTo(
    '.dropshadow',
    {
      scaleX: 0,
    },
    {
      scaleX: 1,
      duration: 0.3,
      ease: 'Power2easeInOut',
    },
  )

  sliderEntry.fromTo(
    '.sportimg img',
    {
      scale: 0,
      y: '150%',
      opacity: 0,
    },
    {
      scale: 1,
      y: '0%',
      duration: 0.5,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
    '-=0.2',
  )

  sliderEntry.fromTo(
    '.c-sportslider-center p',
    {
      opacity: 0,
    },
    {
      duration: 0.5,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
    '-=0.2',
  )

  sliderEntry.fromTo(
    '.c-sportslider-button button',
    {
      opacity: 0,
    },
    {
      duration: 0.5,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
    '-=0.2',
  )

  sliderEntry.fromTo(
    '.c-sportslider-wrapper footer',
    {
      opacity: 0,
    },
    {
      duration: 0.5,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
    '-=0.2',
  )
})
</script>
