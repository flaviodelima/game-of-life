<script setup lang="ts">
import Board from './components/Board.vue'
const cells = [
  [false, true, false, false],
  [false, false, true, false],
  [true, false, false, false],
  [true, true, true, false],
]
</script>

<template>
  <Board :cells="cells"/>
</template>

<style scoped>

</style>
