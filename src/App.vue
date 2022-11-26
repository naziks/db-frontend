<script setup>
import { useAuthStore } from "@/store";
import AuthView from "@/views/Auth.vue";
import Layout from "@/components/Layout/Layout.vue";

const { isAuthenticated } = useAuthStore();
</script>

<template>
<!--  <Layout v-if="isAuthenticated" />-->
<!--  <AuthView v-else/>-->
  <Layout />
</template>

<style lang="scss">
html, body, #app {
  min-height: 100vh;
}
</style>