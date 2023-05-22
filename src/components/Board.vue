<script setup lang="ts">
import Cell from './Cell.vue'
import { computed } from 'vue'

const prop = defineProps<{
  cells: boolean[][];
}>()

//define computed property color
const numberOfRows = computed(() => {
  return prop.cells.length
})

const numberOfColumns = computed(() => {
  return prop.cells[0].length
})

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
