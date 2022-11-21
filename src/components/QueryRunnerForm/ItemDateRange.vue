<script setup lang="ts">
// props
import {computed, defineProps, onMounted, ref, toRefs, watch} from "vue";
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

const date_start_input = ref<HTMLInputElement>();
const date_end_input = ref<HTMLInputElement>();
const start_valid = ref<boolean | null>(null);
const end_valid = ref<boolean | null>(null);

const dateValidate = () => {
  let start = date_start_input.value;
  let end = date_end_input.value;
  let st = start?.value;
  let en = end?.value;

  end_valid.value = !en ? null : true;
  if(!st || !en) return start_valid.value = null;

  start_valid.value = st <= en;

  if(!!start_valid.value && !!end_valid.value) {
    emit('formInputValueChanged', {
      id: id.value,
      value: {
        start: st,
        end: en
      }
    });
  } else {
    emit('formInputValueChanged', {
      id: id.value,
      value: null
    });
  }
}

onMounted(() => {
  if(!date_start_input.value || !date_end_input.value) return;
  date_start_input.value.max = new Date().toLocaleDateString('en-ca');
  date_end_input.value.max = new Date().toLocaleDateString('en-ca');
})
</script>

<template>
  <div class="col">
    <div class="row">
      <label class="label">
        <span class="label-text">{{ input.start_label }}</span>
      </label>

      <input @change="dateValidate"
             ref="date_start_input"
             type="date"
             placeholder="Type here"
             class="input input-bordered w-full max-w-xs"
             :class="{'input-success': start_valid === true, 'input-error': start_valid === false}"
             required />
    </div>

    <div class="row">
      <label class="label">
        <span class="label-text">{{ input.end_label }}</span>
      </label>

      <input @change="dateValidate"
             type="date"
             ref="date_end_input"
             placeholder="Type here"
             class="input input-bordered w-full max-w-xs"
             :class="{'input-success': end_valid === true, 'input-error': end_valid === false}"
             required />
    </div>
  </div>
</template>

<style scoped lang="scss">
.col {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: theme('screens.sm')) {
    flex-direction: column;
  }

  .row, input {
    width: 100%;
  }
}
</style>