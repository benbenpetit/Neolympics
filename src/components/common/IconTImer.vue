<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    :width="width"
    :height="height"
    preserve-aspect-ratio="none"
    :style="{ display: 'block' }"
    class="o-icon timer-icon"
  >
    <g fill="#484D66" clip-path="url(#a)">
      <path
        d="M12.07 6.09c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7Zm1 8h-2v-6h2v6Z"
        opacity=".3"
      />
      <path
        d="M9.07 1.09h6v2h-6v-2Zm2 7h2v6h-2v-6Zm8.03-.62 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42a8.962 8.962 0 0 0-5.62-1.98 9 9 0 0 0-9 9c0 4.97 4.02 9 9 9A8.994 8.994 0 0 0 19.1 7.47Zm-7.03 12.62c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7Z"
      />
    </g>
    <defs>
      <clipPath id="a"><path fill="#fff" d="M0 .08h24v24H0z" /></clipPath>
    </defs>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  width?: string
  height?: string
}
const { width, height } = withDefaults(defineProps<Props>(), {
  width: '24px',
  height: '24px',
})
</script>
