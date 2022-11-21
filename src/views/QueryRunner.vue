<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {QueryBuffer, Query} from "@/data/QueryBuffer";
import { useEventsBus } from '@/helpers/';
import QueryRunnerForm from "@/components/QueryRunnerForm/QueryRunnerForm.vue";
import QueryTable from "@/components/ApiTable/QueryTable.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Spinner from "@/components/Spinner.vue";

const {recieve, emit} = useEventsBus();
const step = ref<number>(1);
const form_valid = ref<boolean>(false);
const form_values = ref<Record<string, any>>({});

recieve('formInputStatusChanged', (status: object) => {
  form_valid.value = status.valid;
  form_values.value = status.values;
})

const changeStep = (action: string) => {
  let cur = step.value;
  let next = action === 'next' ? cur + 1 : cur - 1;

  if(next < 1 || next > 4) return;
  if(next == 3 && action != 'next') next = 2;
  step.value = next;
}

const setStep = (num: number) => {
  if(step.value === num || num === 3) return;
  step.value = num;
}

const showPrevButton = computed<boolean>(() => step.value > 1 && step.value != 3);
const showNextButton = computed<boolean>(() => step.value < 2 || (step.value == 2 && form_valid.value));

// TODO: if loading -> prevent going back via step buttons

const steps_list = ref<string[]>([
  "Prepare",
  "Specify Variables",
  "Run",
  "Preview"
])

// find query
let selected_item = ref<Query | null>(null);

const onReload = (route: any = null) => {
  let current_route = route || useRoute();
  let id = parseInt(current_route.params.id as string);
  let item: Query | undefined = QueryBuffer.find((item: Query) => item.id === id);
  selected_item.value = item ? item : null;
  step.value = 1;
}

onMounted(onReload);
watch(useRoute(), (r) => onReload(r));

//
watch(step, (v) => {
  if(v == 3) {
    // TODO: run query
    setTimeout(() => {
      step.value = 4;
    }, 3000);
  }
})


</script>

<template>
  <div class="query-runner p-2 flex flex-col flex-nowrap items-center">
    <template v-if="selected_item">
      <ul class="steps sm:mb-5">
        <li v-for="(title, id) in steps_list"
            :key="id"
            class="step step-neutral select-none"
            @click="setStep(id + 1)"
            :class="{
              'step-primary': step >= id + 1,
              'cursor-pointer': id <= 1
            }">{{ title }}
        </li>
      </ul>


      <div class="step-1" v-if="step === 1">
        <div class="card bg-accent text-primary-content mb-2 w-full  w-full">
          <div class="card-body">
            <h2 class="card-title">Query {{ selected_item.id }}</h2>
            <p v-html="selected_item.description"></p>
          </div>
        </div>
      </div>


      <div class="step-2" v-else-if="step === 2">
        <QueryRunnerForm :item="selected_item"/>
      </div>

      <div class="step-3" v-else-if="step === 3">
        <Spinner />
      </div>

      <div class="step-4" v-else-if="step === 4 || step === 3">
        <QueryTable class="mb-5" v-show="step === 4"/>
      </div>

      <div class="btn-wrapper self-end flex justify-between w-full">
        <button class="btn btn-secondary w-40" :class="{shown: showPrevButton}" @click="changeStep('prev')">Back</button>
        <button class="btn btn-secondary w-40"  :class="{shown: showNextButton}" @click="changeStep('next')">Next</button>
      </div>
    </template>

    <div class="not-found" v-else>
      <h1>Query not found</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles';

.query-runner {
  min-height: calc(100vh - 65px);

  .steps {
    width: 100%;

    @media (max-width: theme("screens.sm")) {
      @apply steps-vertical;
    }
    @include fadein;
  }

  .step-1,
  .step-2,
  .step-3,
  .step-4 {
    @include fadeslideup;
    @screen sm {
      margin: auto;
    }
  }

  .step-2 {
    width: 100%;

    form {
      @apply flex flex-nowrap  items-center flex-col;
      width: 100%;
      max-width: calc(100vw - 2rem);

      &:deep(.form-item) {
        width: min(100%, 400px);

        input {
          width: 100%;
          max-width: unset !important;
        }
      }
    }


  }

  .step-3 {
    margin: auto;
    @include fadein;
  }

  .btn-wrapper {
    @include fadeslideup(0.4);
    transition: opacity 0.2s ease-in-out;

    @media (max-width: theme("screens.sm")) {
      margin-top: auto;
    }

    .btn:not(.shown) {
      opacity: 0 !important;
      pointer-events: none;
    }
  }
}
</style>