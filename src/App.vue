<script setup lang="ts">
import { reactive } from 'vue';
import Board from './components/Board.vue'
import { Game } from "./game";

const game = new Game(40)
game.board.randomize()

const data= reactive({
  cells: game.board.getAsBoolean()
})

//empty board on e key
window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyE') {
    game.board.empty()
    data.cells = game.board.getAsBoolean()
    game.computeNeighbors()
  }
})

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    game.restart()
    data.cells = game.board.getAsBoolean()
    game.computeNeighbors()
  }
})

window.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowRight') {
    game.next()
    data.cells = game.board.getAsBoolean()
    game.computeNeighbors()
  }
})

</script>

<template>
  <Board :cells="data.cells"/>
</template>

<style scoped>

</style>
