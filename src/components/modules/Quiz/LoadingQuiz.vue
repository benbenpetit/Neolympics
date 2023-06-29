<template>
  <div class="--loading-quiz" id="loading-quiz">
    <video autoplay onended="startQuiz()">
      <source src="/video/Place_Au_Micro_Video.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.--loading-quiz {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
  overflow: hidden;
}

video {
  height: 100%;
  width: 100%;
}
</style>
