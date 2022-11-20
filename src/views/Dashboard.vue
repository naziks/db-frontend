<script setup lang="ts">
import Apitable from "@/components/ApiTable/ApiTable.vue";
import Stats from "@/components/Stats.vue";
import DashboardActionCard from "@/components/DashboardActionCard.vue";
</script>

<template>
<!--  <Apitable target="person.alcoholic"/>-->
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
  @for $i from 1 through 3 {
    &:deep(.card):nth-child(#{$i}){
      @include fadein($i * 0.2 + 0.6);
    }
  }
}

</style>