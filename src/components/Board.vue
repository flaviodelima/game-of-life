<script setup lang="ts">
import Cell from './Cell.vue'
import { computed, inject } from 'vue'
import { Game } from '../game';

const game = inject('game') as Game
const board = game.board

const emit = defineEmits(['update:board'])

const prop = defineProps<{
  cells: boolean[][];
  neighborsMap: number[][];
}>()

const numberOfRows = computed(() => {
  return prop.cells.length
})

const numberOfColumns = computed(() => {
  return prop.cells[0].length
})

function updateCell(e: { position: { x: number; y: number } }) {
  const {x, y} = e.position 
  board.grid[y][x].toggle()
  emit('update:board');
}

</script>

<template>
  <div
    id="board" 
    :style="{
      gridTemplateRows: `repeat(${numberOfRows}, 1fr)`
    }">
    <div 
      v-for="row , rowNumber in cells" 
      :key="rowNumber"
      class="rows"
      :style="{
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`
      }">
      <div v-for="cell, columnNumber in row" :key="columnNumber">
        <Cell
          @update:alive="updateCell"
          class="cell"
          :class="{ alive: cell }"
          :alive="cell"
          :position="{ x:columnNumber, y:rowNumber }"
          :neighborCount="neighborsMap[rowNumber][columnNumber]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
#board {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 7px;
  height: 100%;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  /* background-color: blanchedalmond; */
}

.rows {
  display: grid;
  grid-gap: 7px;
  /* background-color: blanchedalmond; */
}
</style>
