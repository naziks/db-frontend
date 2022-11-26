<script setup lang="ts">
import axios from "axios";
import {computed, onMounted, ref, toRefs} from "vue";
import {Query} from "@/data/QueryBuffer";
import {makeQueryTableRequest} from "@/helpers/api/endpoints/api_table/query_table";
import {defineEmits} from "vue";

const emit = defineEmits(['inited'])

const props = defineProps<{
  item: Query,
  params: Record<string, any>
}>();

let {item, params} = toRefs(props);

let items = ref([]);

let headers = computed(() => {
  if (items.value.length === 0) return [];
  return Object.keys(items.value[0]);
});

onMounted(async () => {
  let res = await makeQueryTableRequest(item.value, params.value);
  console.log(res);
  if(res.success) {
    items.value = res.data;
    console.log(1);
    emit('inited', true);
  } else {
    console.error(res);
  }

  // let res = await axios.get('http://localhost:3000/api/alcoholics')
  //     .catch(err => console.log(err));
  //
  // if(res) {
  //   items.value = res.data.data;
  // }
});
</script>

<template>
  <div class="q-container">
    <div class="overflow-x-auto rounded-md shadow shadow-black w-full">
      <table class="table table-zebra w-full" v-if="items.length">
        <!-- head -->
        <thead>
        <tr>
          <template v-for="(header, index) in headers" >
            <td v-if="!index">{{ header.replaceAll('_', ' ') }}</td>
            <th v-else>{{ header.replaceAll('_', ' ') }}</th>
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
      <div class="alert alert-warning" v-else>No data found</div>
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