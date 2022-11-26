<script setup lang="ts">
// props
import {defineProps, nextTick, onMounted, ref, toRefs} from "vue";
import {useEventsBus} from "@/helpers/index.js";
import {makeAutoCompleteRequest} from "@/helpers/api";
import {
  AutoCompleteRequest,
  AutoCompleteRequestData,
  AutoCompleteResponse
} from "@/helpers/api/endpoints/autocomplete.js";
import {ApiRequestMethod} from "@/helpers/api/types";

const {emit} = useEventsBus();

let props = defineProps({
  id: {
    type: Number,
    required: true
  },
  input: {
    type: Object,
    required: true
  }
});
let {id, input} = toRefs(props);

let {
  api_name: send_value_to_api_under_this_key,
  api_column: search_api_column,
  search_in,
  table
} = input.value;

let selected = ref<Record<number,boolean>>({
  1: false
});
let search_text = ref<Record<number,string>>({
  1: ''
});
let loaded_items = ref<Record<number,AutoCompleteResponse>>({
  1: []
});
let busy = ref<boolean>(false);
let one_more_expected: Record<number, boolean> = {
  1: false
};
const input_ref = ref<Record<number, HTMLInputElement | null>>({});
const dropdown = ref<Record<number, HTMLInputElement | null>>({});
const items_amount = ref<number>(1);
let send_timeout: any = null;

const sendApiResult = async (item_id: number): Promise<any> => {
  one_more_expected[item_id] = false;
  let active = true;
  let search_id: string | number | null = search_text.value[item_id].startsWith('id:') ? search_text.value[item_id].replace('id:', '') : null;

  if (search_id !== null) {
    let as_num = parseInt(search_id);
    if (isNaN(as_num) || as_num < 1) {
      active = false;
    } else  {
      search_id = as_num;
    }
  }

  let search_in_filtered = search_id
      ? search_in.filter((item: string) => item.endsWith('_id'))
      : search_in.filter((item: string) => !item.endsWith('_id'))

  active = active && search_text.value[item_id].length >= 2

  if (active) {
    busy.value = true;

    const data: AutoCompleteRequestData = {
      table,
      search_in: search_in_filtered,
      search_text: search_id !== null ? `${search_id}` : search_text.value[item_id],
      return_column: search_api_column
    };

    let result = await makeAutoCompleteRequest(data);

    if (result && result.success) {
      loaded_items.value[item_id] = result.data || [];
    }

    await nextTick();
  } else {
    loaded_items.value[item_id] = [];
  }

  busy.value = false;
  if (one_more_expected)
    return await sendApiResult(item_id);
}

const valueChanged = (item_id: number) => (e: any) => {
  console.log(item_id)
  let value = e.target.value;
  search_text.value = value;

  selected.value[item_id] = false;
  emit('formInputValueChanged', {
    id: id.value,
    value: ''
  });

  if (busy.value) {
    one_more_expected[item_id] = true;
    return;
  }

  if (send_timeout) clearTimeout(send_timeout);
  if (value.trim().length < 2) return;

  busy.value = true;

  send_timeout = setTimeout(async () => {
    await sendApiResult(item_id);
  }, 500);
}

const select = (item_id: number, item: any) => {
  let input_el = input_ref.value[item_id];
  let dropdown_el = dropdown.value[item_id];
  if (!input_el || !dropdown_el) return;

  selected.value[item_id] = true;
  input_el.value = input.value.select_template(item);
  dropdown_el.blur()

  emit('formInputValueChanged', {
    id: id.value,
    value: item[search_api_column]
  });
}
</script>

<template>
  <div class="multi-entity-picker" v-for="id in items_amount">
    <label class="label">
      <span class="label-text">{{ input.label }}</span>
      <span class="label-text text-gray-700">{{ busy ? '^_^' : '' }}</span>
    </label>

    <div class="dropdown">
      <input @input="valueChanged(id)"
             :ref="input_ref[id]"
             type="text"
             placeholder="Type here"
             class="input input-bordered w-full max-w-xs"
             :class="{'input-success': selected}"
             required/>

      <ul tabindex="0" :ref="dropdown[id]" class="dropdown-content menu p-2 shadow bg-neutral rounded-box">
        <li v-if="search_text[id].length < 2">
          <a class="text-secondary">Type {{ 2 - search_text[id].length }} more characters</a>
        </li>
        <li v-else-if="busy">
          <a class="text-primary">Searching...</a>
        </li>
        <li v-for="item in loaded_items[id]" v-else-if="loaded_items[id].length">
          <a @click="select(id, item)">{{ input.preview_template(item) }}</a>
        </li>
        <li v-else>
          <a class="text-danger">No results</a>
        </li>
      </ul>
    </div>
  </div>

  <button class="btn btn-bordered">Add</button>
</template>

<style scoped lang="scss">
.dropdown {
  width: min(100%, 400px);

  ul {
    width: min(100%, 300px);
    z-index: 10;
  }
}

input {
  width: 100%;
}

</style>