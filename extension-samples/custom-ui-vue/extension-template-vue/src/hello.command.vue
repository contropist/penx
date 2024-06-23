<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  window.parent.postMessage('Hello from the extension!', "*")
})
</script>
<template>
  <div class="flex justify-center items-center h-full">
    <h1 class="text-4xl">Hello World!</h1>
  </div>
</template>
