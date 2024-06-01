<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="box">
    <h1 class="text-blue-500">Hello Vue!</h1>
    <button type="button" @click="count++">count is {{ count }}</button>

  </div>
</template>

<style></style>
