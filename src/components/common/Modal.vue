<template>
  <div class="c-modal-wrapper">
    <div class="c-modal">
      <div class="c-modal-title">
        <h1>
          <slot name="title">nom</slot>
        </h1>
      </div>
      <div class="c-modal-content">
        <p>
          <slot name="content">content</slot>
        </p>
      </div>
    </div>

    <div class="c-modal-buttons">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
