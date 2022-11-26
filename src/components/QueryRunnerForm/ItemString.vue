<script setup>
// props
import {defineProps, toRefs} from "vue";
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

const valueChanged = (e) => {
  emit('formInputValueChanged', {
    id: id.value,
    value: e.target.value
  });
}

const runKeyPressValidator = (e) => {
  let _ = input.value;
  if (!_.validator) return;

  if (!_.validator(e.key)) {
    e.preventDefault();
  }
}


</script>

<template>
  <label class="label  max-w-xs">
    <span class="label-text">{{ input.label }}</span>
  </label>

  <input @input="valueChanged"
         type="text"
         placeholder="Type here"
         class="input input-bordered w-full max-w-xs"
         required/>
</template>