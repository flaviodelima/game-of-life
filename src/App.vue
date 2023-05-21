<script setup lang="ts">
import Board from './components/Board.vue'
import { Game } from "./game";
import { Board as GameBoard } from "./game";

const board = new GameBoard(20, 20)
const game = new Game(board)
game.board.randomize()
</script>

<template>
  <Board :cells="game.board.getAsBoolean()"/>
</template>

<style scoped>

</style>
