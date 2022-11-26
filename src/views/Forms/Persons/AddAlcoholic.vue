
<script setup lang="ts">
import QueryRunnerForm from '@/components/QueryRunnerForm/QueryRunnerForm.vue';
import QueryBuffer, {nValidator, Query} from "@/data/QueryBuffer";
import { InputGenerator, AlcoholicEntityPicker, InspectorEntityPicker } from "@/data/QueryBuffer";
import {ref} from "vue";
import {useEventsBus} from "@/helpers";
import {makeAddJoinEventGetRequest} from "@/helpers/api/endpoints/events/AddJoinEvent";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
let {recieve} = useEventsBus();
import { useRouter} from "vue-router";
import {makeAddLeaveEventGetRequest} from "@/helpers/api/endpoints/events/AddLeaveEvent";
import {makeAddEscapeEventGetRequest} from "@/helpers/api/endpoints/events/AddEscapeEvent";
import {makeAddFaintEventGetRequest} from "@/helpers/api/endpoints/events/AddFaintEvent";
import {makeAddBedChangeEventGetRequest} from "@/helpers/api/endpoints/events/AddBedChangeEvent";

let router = useRouter();
const input = ref<Query>({
  id: 1,
  description: '',
  input: (new InputGenerator())
      .addString('full_name', 'Full Name')
      .addDate('full_name', 'Full Name')
      .addNumber('bed_id', 'Bed ID', nValidator)
      .finish(),
  url: ''
});

let valid = ref<boolean>(false);
let values = ref<any>({});
let error = ref<string>('');

recieve('formInputStatusChanged', (data: any) => {
  valid.value = data.valid;
  values.value = data.values;

  if(!valid.value) error.value = '';
});

const goback = async () => {
  await router.push('/event/bed_change/list')
}

const execute = async () => {
  if(!valid) return;

  let res = await makeAddBedChangeEventGetRequest({
    alcoholic_id: values.value.alcoholic_id,
    new_bed_id: values.value.bed_id
  });

  if (res.success) {
    await goback();
  } else {
    error.value = res.error?.message || 'Something went wrong';
  }
}

</script>

<template>
  <div class="add-form-animation flex flex-col justify-center items-center w-full gap-2">
    <h1 class="text-secondary text-xl text-center font-bold my-5">Add Alcoholic</h1>
    <div class="alert alert-error max-w-xs" v-if="error.length">{{ error }}</div>
    <QueryRunnerForm :item="input"></QueryRunnerForm>
    <div class="btn-group w-full max-w-xs mt-3 ">
      <button class="btn w-1/2" @click="goback">
        <font-awesome-icon icon="arrow-left" class="mr-2"/>
        Back
      </button>
      <button class="btn w-1/2 btn-secondary" :disabled="!valid" @click="execute">
        <font-awesome-icon icon="save" class="mr-2"/>
        Add
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>