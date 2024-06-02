<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="flex justify-center items-center h-full bg-gradient-to-r from-cyan-500 to-blue-500">
    <button class="outline-none p-3 text-lg rounded-3xl bg-blue-300 hover:opacity-70" @click="count++">
      Count is {{ count }}
    </button>
  </div>
</template>
