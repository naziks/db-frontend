<script setup lang="ts">
import QueryBuffer, {Query} from "@/data/QueryBuffer";
import {toRefs} from "vue";

let props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  hide_controls: {
    type: Boolean,
    default: false,
  },
  wide: {
    type: Boolean,
    default: false,
  }
});

let {item, hide_controls, wide} = toRefs(props);
</script>

<template>
  <div class="card bg-accent text-primary-content" :class="{'w-96': !wide, 'w-full': wide}">
    <div class="card-body">
      <h2 class="card-title">Query {{ item.id }}</h2>
      <p v-html="item.description"></p>
      <div class="card-actions justify-end" v-if="!hide_controls">
        <router-link class="btn" :to="{name: 'run', params: {id: item.id}}">Run</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card:deep(code){
  @apply text-white font-bold underline;
}
</style>