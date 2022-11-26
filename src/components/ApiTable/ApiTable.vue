<script setup lang="ts">
import {onMounted, ref, toRefs} from 'vue';
import {ApiTableGetRequestData, makeApiTableGetRequest} from '@/helpers/api/endpoints/api_table/get'
import Spinner from "@/components/Spinner.vue";

const Sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

let props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const {name} = toRefs(props);
const table_data = ref<object[]>([]);
const headers = ref<string[]>([]);
const busy = ref<boolean>(false);
let page = ref<number>(1);
let limit = 8;
let pages_count = ref<number>(1);

const update = async () => {
  busy.value = true;

  let result = await makeApiTableGetRequest(name.value, {
    page: page.value,
    limit,
  } as ApiTableGetRequestData);

  if (!result.success || result.data === null) return busy.value = false;

  const {
    rows,
    total_pages,
  } = result.data;

  if (!rows.length) return busy.value = false;
  await Sleep(300);
  pages_count.value = total_pages;
  headers.value = Object.keys(rows[0]);
  table_data.value = rows;
  busy.value = false;
}

const setPage = async (new_page: number) => {
  if (busy.value || page.value === new_page || new_page < 1 || new_page > pages_count.value) return;
  page.value = new_page;
  await update();
}

onMounted(async () => {
  await update();
});
</script>

<template>
  <div class="flex flex-col w-full justify-center items-center gap-2">
    <div class="q-container">
      <div class="loading-spinner" :class="{active: busy, init: !headers.length}">
        <Spinner/>
      </div>
      <div class="overflow-x-auto rounded-md shadow shadow-black w-full">
        <table class="table table-zebra w-full" :class="{loading: busy}">
          <!-- head -->
          <thead v-if="headers.length">
          <tr>
            <template v-for="(header, index) in headers">
              <td v-if="!index">{{ header.replaceAll('_', ' ')  }}</td>
              <th v-else>{{ header.replaceAll('_', ' ') }}</th>
            </template>
          </tr>
          </thead>
          <tbody>
          <!-- row 1 -->
          <template v-if="table_data.length">
            <tr v-for="item in table_data">
              <td v-for="value in Object.values(item)">
                {{ value }}
              </td>
            </tr>
          </template>

          <tr class="text-primary font-bold text-lg" v-else-if="!busy">
            <td :colspan="headers.length || 1" class="text-center">
              No data found
            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
    <div class="pagination btn-group  mb-3" v-if="pages_count > 1" :class="{busy}">
      <button class="btn" :disabled="page === 1" @click="setPage(page - 1)">«</button>
      <button class="btn" :class="{shown: page > 1}" @click="setPage(1)">1</button>

      <button class="btn btn-disabled" :class="{shown: page > 3}">...</button>

      <button class="btn" :class="{shown: page > 2}" @click="setPage(page - 1)">{{ page - 1 }}</button>
      <button class="btn btn-active shown">{{ page }}</button>
      <button class="btn" :class="{shown: page < pages_count - 1}" @click="setPage(page+1)">{{ page + 1 }}</button>

      <button class="btn btn-disabled" :class="{shown: page < pages_count - 2}">...</button>

      <button class="btn" @click="setPage(pages_count)" :class="{shown: page !== pages_count}">{{
          pages_count
        }}
      </button>
      <button class="btn" :disabled="page === pages_count" @click="setPage(page + 1)">»</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles';

.pagination .btn {
  padding: 0;
  min-width: 44.3px;
  max-width: 44.3px;
  overflow: hidden;
  transition: max-width .3s ease-in-out,
  min-width .3s ease-in-out,
  padding .3s ease-in-out,
  padding .3s ease-in-out,
  border .2s ease-in-out;

  &:not(.shown):not(:first-child):not(:last-child) {
    min-width: 0;
    max-width: 0;
    padding: 0;
    border-width: 0 !important;
  }
}

.pagination.busy .btn {
  pointer-events: none;
  opacity: .7;
}

.q-container {
  max-width: calc(100% - 2rem);
  width: 100%;
  margin: 0 auto;
  @include fadeslideup(0.2);
}

.loading-spinner {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 10;
  pointer-events: none;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity .5s ease-in-out;

  &.init {
    min-height: 200px;
  }

  &.active {
    opacity: 1;
  }
}

table {
  // blur
  tbody {
    transition: color .2s ease-in-out;
  }

  &.loading tbody{
    color: transparent;
  }




  thead tr > * {
    background-color: theme('colors.neutral') !important;
  }
}
</style>
