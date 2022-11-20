<script setup>
import {toRefs} from "vue";

// with default value
const props = defineProps({
  center: {
    type: Boolean,
    default: true,
  },
  block: {
    type: Boolean,
    default: true,
  }
});

const { center, block } = toRefs(props);
</script>

<template>
  <code :class="{'text-center': center, block}">
    Made with ❤️ by <a href="//nazarko.dev" target="_blank">nazarko</a>
  </code>
</template>