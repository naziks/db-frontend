<script setup lang="ts">
import Stats from "@/components/Stats.vue";
import DashboardActionCard from "@/components/DashboardActionCards.vue";
</script>

<template>
  <div class="dashboard">
    <Stats />
    <div class="px-4 pt-4">
      <DashboardActionCard />
    </div>
  </div>

</template>
<style scoped lang="scss">
// animations
@import '@/styles';

.dashboard{
  // for loop
  @for $i from 1 through 12 {
    &:deep(.card):nth-child(#{$i}){
      @include fadein($i * 0.2 + 0.6);
    }
  }
}
</style>