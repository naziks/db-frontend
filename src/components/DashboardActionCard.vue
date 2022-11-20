<script setup lang="ts">
import QueryBuffer from "@/data/QueryBuffer";


</script>

<template>
  <div class="flex flex-wrap justify-evenly gap-5">
    <div class="card w-96 bg-accent text-primary-content" v-for="item in QueryBuffer" :key="item.id">
      <div class="card-body">
        <h2 class="card-title">Query {{ item.id }}</h2>
        <p v-html="item.description"></p>
        <div class="card-actions justify-end">
          <router-link class="btn" :to="{name: 'run', params: {id: item.id}}">Run</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card:deep(code){
  @apply text-white font-bold underline;
}
</style>