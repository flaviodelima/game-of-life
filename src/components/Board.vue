<script setup lang="ts">
import Cell from './Cell.vue'

defineProps<{
  cells: boolean[][];
}>()
</script>

<template>
  <div id="board">
    <div v-for="row , rowNumber in cells" :key="rowNumber" class="rows">
      <div v-for="cell, columnNumber in row" :key="columnNumber">
        <Cell
          class="cell"
          :class="{ alive: cell }"
          :alive="cell"
          :position="{ x:columnNumber, y:rowNumber }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
#board {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;
  height: 100%;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  /* background-color: blanchedalmond; */
}

.rows {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  /* background-color: blanchedalmond; */
}
</style>
