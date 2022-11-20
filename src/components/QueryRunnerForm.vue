<script setup lang="ts">

import {toRefs, defineProps} from "vue";
import {Query, InputItemType, InputListItemType} from "@/data/QueryBuffer";

let props = defineProps<{
  item: Query
}>();
let {item} = toRefs(props);

const validate = (inp: InputListItemType, event: any) => {
  if(!inp.validator) return;

  let valid = inp.validator(event.key || event.target.value || '');


  if(!valid) {
    console.log('invalid', event);

    if(event.key) event.preventDefault();
    else event.target.value = '';
  }
}

</script>
<template>
  <form @submit.prevent="">
    <div class="form-item" v-for="(inp, id) in item.input" :key="id">

      <template v-if="inp.type === InputItemType.string">
        <label class="label">
          <span class="label-text">{{ inp.label }}</span>
          <span class="label-text-alt">Alt label</span>
        </label>
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required/>
      </template>

      <template v-if="inp.type === InputItemType.number">
        <label class="label">
          <span class="label-text">{{ inp.label }}</span>
        </label>
        <input
            @keypress="e => validate(inp, e)"
            @change="e => validate(inp, e)"
            type="text"
            placeholder="number"
            class="input input-bordered w-full max-w-xs"
            min="1"
            required />
      </template>


    </div>
  </form>
</template>