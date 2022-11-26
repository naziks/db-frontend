
<script setup lang="ts">
import QueryRunnerForm from '@/components/QueryRunnerForm/QueryRunnerForm.vue';
import {InputGenerator, AlcoholicEntityPicker, InspectorEntityPicker, Query} from "@/data/QueryBuffer";
import {ref} from "vue";
import {useEventsBus} from "@/helpers";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
let {recieve} = useEventsBus();
import { useRouter} from "vue-router";
import {makeAddLeaveEventGetRequest} from "@/helpers/api/endpoints/events/AddLeaveEvent";

let router = useRouter();
const input = ref<Query>({
  id: 1,
  description: '',
  input: (new InputGenerator())
      .add(AlcoholicEntityPicker)
      .add(InspectorEntityPicker)
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
  await router.push('/event/leave/list')
}

const execute = async () => {
  if(!valid) return;
  let res = await makeAddLeaveEventGetRequest({
    alcoholic_id: values.value.alcoholic_id,
    inspector_id: values.value.inspector_id
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
    <h1 class="text-secondary text-xl text-center font-bold my-5">Add Leave Event</h1>
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