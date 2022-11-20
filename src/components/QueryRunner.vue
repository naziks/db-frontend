<script setup lang="ts">
import { onBeforeRouteUpdate } from "vue-router";
import {ref, onMounted} from "vue";
let route = useRoute();
const id = ref<number>(0);

onMounted(() => {
  id.value = parseInt(route.params.id);
});

watch(() => route.params.id, (_id) => {
  console.log(_id);
  // id.value = parseInt(_id.params.id.toString());
});

</script>

<template>
q{{ id }}
</template>