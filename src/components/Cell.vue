<script setup lang="ts">
defineProps<{
  position: { x: number; y: number };
  alive: boolean;
}>()
</script>

<template>
  <div
    id="cell"
    :class="{ alive }"
  ></div>  
</template>

<style scoped>
#cell {
  width: 100%;
  height: 100%;
  background-color: rgb(56, 44, 44);
}

#cell.alive {
  background-color: rgb(207, 191, 191);
}
</style>
