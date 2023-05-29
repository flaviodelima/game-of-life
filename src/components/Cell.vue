<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  position: { x: number; y: number };
  alive: boolean;
  neighborCount: number;
}>()

defineEmits(['update:alive'])

const cellStatus = computed(() => {
  if(props.alive){
    if(props.neighborCount < 2){
      return 'alive underpopulated'
    }
    if(props.neighborCount > 3){
      return 'alive overpopulated'
    }
      return 'alive stable'
  }
  else{
    if(props.neighborCount === 3){
      return 'dead reproduction'
    }
    else{
      return 'dead stable'
    }
  }
})

</script>

<template>
  <div
    @click="$emit('update:alive', {
      position: position
    })"
    id="cell"
    :class="cellStatus"
  >
    <p id="neighbor-count"> {{ neighborCount }} </p>
  </div>  
</template>

<style scoped>
#cell {
  border-radius: 6px;
  width: 100%;
  height: 100%;
  background-color: rgb(56, 44, 44);
  display: flex;
  align-items: center;
  justify-content: center;
}

#cell.alive {
  background-color: rgb(207, 191, 191);
}

#cell.alive.underpopulated {
  /*/background-color: rgba(255, 0, 0, 0.457);*/
  background-color: rgba(161, 99, 99, 0.852);
}

#cell.alive.overpopulated {
  background-color: rgba(161, 99, 99, 0.852);
}

#cell.dead.reproduction {
  background-color: rgba(77, 66, 66, 0.543);
}

#neighbor-count {
  color: rgb(74, 74, 74);
  font-weight: 800;
  font-size: 0.7rem;
}

</style>
