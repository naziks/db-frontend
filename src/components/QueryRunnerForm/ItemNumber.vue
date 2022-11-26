<script setup lang="ts">
// props
import {defineProps, ref, toRefs} from "vue";
import {useEventsBus} from "@/helpers";

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

let empty = ref<boolean>(true);
const valueChanged = (e) => {
  let value = e.target.value.trim();
  empty.value = !value.length;

  emit('formInputValueChanged', {
    id: id.value,
    value
  });
}

const runKeyPressValidator = (e) => {
  let current_value = e.target.value;
  let _ = input.value;
  if(!_.validator ) return;

  if(!_.validator(e.key) || (!current_value.length && e.key === '0')) {
    e.preventDefault();
  }
}
</script>

<template>
  <label class="label max-w-xs">
    <span class="label-text">{{ input.label }}</span>
  </label>

  <input @keypress="runKeyPressValidator"
      @input="valueChanged"
      type="text"
      placeholder="Type number here"
      class="input input-bordered w-full max-w-xs"
         :class="{'input-success': !empty}"
      required/>
</template>