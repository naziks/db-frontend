<script setup lang="ts">
import NavigationMenu from "./NavigationMenu.vue";

</script>

<template>

  <NavigationMenu />
  <router-view />
</template>

<style lang="scss">
#app {
  scroll-snap-type: y mandatory;

  & > * {
    scroll-snap-align: start;
  }
}
</style>