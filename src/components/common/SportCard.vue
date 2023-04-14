<template>
  <div class="c-sportcard-wrapper">
    <div class="c-sportcard">
      <div class="c-sportcard-sportname">
        <slot name="sportname"></slot>
      </div>
      <div class="c-sportcard-content">
        <div class="c-sportcard-sportimg">
          <slot name="sportimg"></slot>
        </div>
      </div>
      <div class="c-sportcard-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonUI from '@/components/common/ButtonUI.vue'
</script>
