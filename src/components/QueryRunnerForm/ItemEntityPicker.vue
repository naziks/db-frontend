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

let selected = ref<boolean>(false);
let xd = ref<boolean>(false);
let search_text = ref<string>('');
let loaded_items = ref<AutoCompleteResponse>([]);
let busy = ref<boolean>(false);
let one_more_expected = false;
const input_ref = ref<HTMLInputElement | null>(null);
const dropdown = ref<HTMLInputElement | null>(null);
const sendApiResult = async (): Promise<any> => {
  one_more_expected = false;
  let active = true;
  let search_id: string | number | null = search_text.value.startsWith('id:') ? search_text.value.replace('id:', '') : null;

  console.log(search_id)
  if (search_id !== null) {
    let as_num = parseInt(search_id);
    if (isNaN(as_num) || as_num < 1 || as_num === 1586) {
      if (as_num === 1586) {
        xd.value = true;
      }
      active = false;
    } else  {
      search_id = as_num;
    }
  }

  let search_in_filtered = search_id
      ? search_in.filter((item: string) => item.endsWith('_id'))
      : search_in.filter((item: string) => !item.endsWith('_id'))

  active = active && search_text.value.length >= 2

  if (active) {
    busy.value = true;

    const data: AutoCompleteRequestData = {
      table,
      search_in: search_in_filtered,
      search_text: search_id !== null ? `${search_id}` : search_text.value,
      return_column: search_api_column
    };

    let result = await makeAutoCompleteRequest(data);

    if (result && result.success) {
      loaded_items.value = result.data || [];
    }

    await nextTick();
  } else {
    loaded_items.value = [];
  }

  busy.value = false;
  if (one_more_expected)
    return await sendApiResult();
}

let send_timeout: any = null;
const valueChanged = (e: any) => {
  let value = e.target.value;
  search_text.value = value;
  xd.value = false;

  selected.value = false;
  emit('formInputValueChanged', {
    id: id.value,
    value: ''
  });

  if (busy.value) {
    one_more_expected = true;
    return;
  }

  if (send_timeout) clearTimeout(send_timeout);
  if (value.trim().length < 2) return;

  busy.value = true;


  send_timeout = setTimeout(async () => {
    await sendApiResult();
  }, 500);
}

const select = (item: any) => {
  let input_el = input_ref.value;
  let dropdown_el = dropdown.value;
  if (!input_el || !dropdown_el) return;

  selected.value = true;
  input_el.value = input.value.select_template(item);
  dropdown_el.blur()

  emit('formInputValueChanged', {
    id: id.value,
    value: item[search_api_column]
  });
}
</script>

<template>
  <label class="label">
    <span class="label-text">{{ input.label }}</span>
    <span class="label-text text-gray-700">{{ busy ? '^_^' : '' }}</span>
  </label>

  <div class="dropdown">
    <input @input="valueChanged"
           ref="input_ref"
           type="text"
           placeholder="Type here"
           class="input input-bordered w-full max-w-xs"
           :class="{'input-success': selected}"
           required/>

    <ul tabindex="0" ref="dropdown" class="dropdown-content menu p-2 shadow bg-neutral rounded-box">
      <li v-if="search_text.length < 2">
        <a class="text-secondary">Type {{ 2 - search_text.length }} more characters</a>
      </li>
      <li v-else-if="xd">
        <a class="text-primary">Hello from <b>Nazarko</b> ;D</a>
      </li>
      <li v-else-if="busy">
        <a class="text-primary">Searching...</a>
      </li>
      <li v-for="item in loaded_items" v-else-if="loaded_items.length">
        <a @click="select(item)">{{ input.preview_template(item) }}</a>
      </li>
      <li v-else>
        <a class="text-danger">No results</a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  z-index: 10;
  width: min(100%, 400px);

  ul {
    width: min(100%, 300px);
  }
}

input {
  width: 100%;
}

</style>