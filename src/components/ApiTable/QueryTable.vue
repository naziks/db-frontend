<script setup lang="ts">
import axios from "axios";
import {computed, onMounted, ref} from "vue";

let items = ref([]);

let headers = computed(() => {
  if (items.value.length === 0) return [];
  return Object.keys(items.value[0]);
});

onMounted(async () => {
  let res = await axios.get('http://localhost:3000/api/alcoholics')
      .catch(err => console.log(err));

  if(res) {
    items.value = res.data.data;
  }
});
</script>

<template>
  <div class="q-container">
    <div class="overflow-x-auto rounded-md shadow shadow-black w-full">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
        <tr>
          <template v-for="(header, index) in headers" >
            <td v-if="!index">{{ header }}</td>
            <th v-else>{{ header }}</th>
          </template>
        </tr>
        </thead>
        <tbody>
        <!-- row 1 -->
        <tr v-for="item in items">
          <td v-for="value in Object.values(item)">
            {{ value }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles';
.q-container{
  max-width: calc(100vw - 2rem);
  width: 100%;
  @include fadeslideup(0.2);
}
table {
  thead tr > * {
    background-color: theme('colors.neutral') !important;
  }
}
</style>