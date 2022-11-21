<script setup lang="ts">
import {toRefs, defineProps, ref, onUnmounted, computed} from "vue";
import {
  Query,
  InputItemType,
  InputListItemType,
  InputListItem,
  InputListEntityPickerType,
  InputListDateRangeType
} from "@/data/QueryBuffer";
import ItemString from "@/components/QueryRunnerForm/ItemString.vue";
import ItemNumber from "@/components/QueryRunnerForm/ItemNumber.vue";
import { useEventsBus } from '@/helpers';
import ItemEntityPicker from "@/components/QueryRunnerForm/ItemEntityPicker.vue";
import ItemDateRange from "@/components/QueryRunnerForm/ItemDateRange.vue";

let { recieve, emit} = useEventsBus();

// import npm event bus

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
// random string
const values = ref<(string | object)[]>([]);
const isFormValid = ref<boolean>(false);

const compileValues = () => {
  let res: Record<string, any> = {};

  if(isFormValid.value) {
    let id = 0;
    for(let input of item.value.input) {
      if (input.type === InputItemType.number) {
        res[input.name] = values.value[id];
      } else if (input.type === InputItemType.entitypicker) {
        res[(input as InputListEntityPickerType).api_name] = values.value[id];
      } else if (input.type === InputItemType.daterange) {
        res[(input as InputListDateRangeType).start_name] = (values.value[id] as any).start;
        res[(input as InputListDateRangeType).end_name] = (values.value[id] as any).end;
      }

      id++;
    }
  }

  return res;
}

recieve('formInputValueChanged', ({id, value}: {id: number, value: any}) => {
  values.value[id] = value;
  validateForm();
  emit('formInputStatusChanged', {
    valid: isFormValid.value,
    values: compileValues()
  });
})

const validateForm = () => {
  isFormValid.value = values.value.length === item.value.input.length && values.value.every((v: any) => !!v);
}
</script>

<template>
  <form @submit.prevent="" class="gap-3">
    <div class="form-item w-full" v-for="(inp, id) in item.input" :key="id">
<!--      <hr>-->
<!--      <div>Found value: {{ values[id] || 'None' }}</div>-->

      <ItemString v-if="inp.type === InputItemType.string" :input="inp" :id="id"/>
      <ItemNumber v-else-if="inp.type === InputItemType.number" :input="inp" :id="id"/>
      <ItemEntityPicker v-else-if="inp.type === InputItemType.entitypicker" :input="inp" :id="id"/>
      <ItemDateRange v-else-if="inp.type === InputItemType.daterange" :input="inp" :id="id"/>
      <div class="idk" v-else>
        <div>WTF?</div>
      </div>
    </div>
  </form>
</template>
