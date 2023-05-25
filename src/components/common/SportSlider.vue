<template>
  <div class="c-sportslider-wrapper">
    <div class="c-sportslider-buttons">
      <button @click="$emit('previous')">
        <img src="/icon/arrow-slider.svg" alt="" />
        <h3><slot name="buttonLtext"></slot></h3>
      </button>
      <button @click="$emit('next')">
        <h3><slot name="buttonRtext"></slot></h3>
        <img src="/icon/arrow-slider.svg" alt="" style="transform: rotate(180deg)" />
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

    <div class="sportslider-footer-wrapper">
      <footer class="c-sportslider-footer">
        <div class="footer-left"><slot name="footerL"></slot></div>
        <div class="footer-center"><slot name="footerC"></slot></div>
        <div class="footer-right"><slot name="footerR"></slot></div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { Howl, Howler } from 'howler'

let sliderSweepSound = new Howl({
  src: ['/sounds/ui-sounds/appear-4.mp3'],
  volume: 0.1,
})

let sliderPopSound = new Howl({
  src: ['/sounds/ui-sounds/appear-3.mp3'],
  volume: 0.1,
})

gsap.registerPlugin(CustomEase)

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
      scale: 0,
    },
    {
      scale: 1,
      duration: 0.4,
      opacity: 1,
      ease: CustomEase.create('custom', 'M0,0,C0.2,0,0.604,1.392,1,1'),
    },
    '-=0.2',
  )

  sliderEntry.add(function () {
    sliderSweepSound.rate(1.5)
    sliderSweepSound.play()
  })

  sliderEntry.fromTo(
    '.sportimg img',
    {
      scale: 0,
      y: '100%',
      opacity: 0,
      filter: 'blur(20px)',
    },

    {
      scale: 1,
      y: '0%',
      duration: 0.5,
      ease: CustomEase.create('custom', 'M0,0 C0.256,-0.054 0.616,1.426 1,1 '),
      opacity: 1,
      filter: 'blur(0px)',
    },
    '-=0.2',
  )

  sliderEntry.add(function () {
    sliderPopSound.rate(1.2)
    sliderPopSound.play()
  })

  sliderEntry.fromTo(
    '.c-sportslider-center p',
    {
      y: '-200%',
    },
    {
      y: '0%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
    },
    '-=0.1',
  )

  sliderEntry.fromTo(
    '.sportslider-footer-wrapper',
    {
      y: '100%',
    },
    {
      y: '0%',
      duration: 0.4,
      ease: 'Power2.easeInOut',
      opacity: 1,
    },
    '-=0.4',
  )

  sliderEntry.fromTo(
    '.c-sportslider-buttons button',
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
