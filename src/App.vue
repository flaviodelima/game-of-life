<script setup lang="ts">
import { reactive, provide } from 'vue';
import Board from './components/Board.vue'
import { Game } from "./game";

const game = new Game(30)
game.board.randomize()

provide('game', game)

const data= reactive({
  cells: game.board.getAsBoolean()
})

function updateBoard() {
  data.cells = game.board.getAsBoolean()
  game.computeNeighbors()
}

//empty board on e key
window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyE') {
    game.board.empty()
    updateBoard()
  }
})

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    game.restart()
    updateBoard()
  }
})

window.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowRight') {
    game.next()
    updateBoard()
  }
})

</script>

<template>
  <Board
    @update:board="updateBoard"
    :cells="data.cells"
  />
</template>

<style scoped>

</style>
