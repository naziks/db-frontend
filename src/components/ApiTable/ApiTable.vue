<script setup lang="ts">
import {ref, toRefs} from 'vue';

let props = defineProps({
  target: {
    type: String,
    required: true
  }
});

let {target} = toRefs(props);
let data = ref([]);
let page = ref<number>(1);

</script>

<template>
  <div class="api-table">

  </div>
</template>