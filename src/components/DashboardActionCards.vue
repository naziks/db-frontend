<script setup lang="ts">
import QueryBuffer from "@/data/QueryBuffer";
import DashboardActionCard from "@/components/DashboardActionCard.vue";
</script>

<template>
  <div class="flex flex-wrap justify-center items-stretch gap-5">
    <DashboardActionCard v-for="item in QueryBuffer" :key="item.id" :item="item"/>
  </div>
</template>