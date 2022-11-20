<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {QueryBuffer, Query} from "@/data/QueryBuffer";
import QueryRunnerForm from "@/components/QueryRunnerForm.vue";

const step = ref<number>(1);
const setStep = (_: number) => {
  if (_ >= 1 && _ <= 3) step.value = _;
}
const steps_list = ref<string[]>([
  "Review",
  "Specify Variables",
  "Run"
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


</script>

<template>
  <div class="query-runner p-2 flex flex-col flex-nowrap items-center">
    <template v-if="selected_item">
      <ul class="steps sm:mb-5">
        <li v-for="(title, id) in steps_list"
            :key="id"
            class="step step-neutral"
            :class="{'step-primary': step >= id + 1}">{{ title }}
        </li>
      </ul>

      <div class="step-1" v-if="step === 1">
        <div class="card bg-accent text-primary-content mb-2 w-full sm:w-4/5 md:w-2/3 lg:w-[600px]">
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
          3
      </div>

      <div class="btn-wrapper self-end flex justify-between w-full">
        <button class="btn btn-secondary w-40" :class="{shown: step > 1}" @click="setStep(step-1)">Prev</button>
        <button class="btn btn-secondary w-40"  :class="{shown: step < 3}" @click="setStep(step+1)">Next</button>
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

  .step-1 .card {
    @include fadeslideup(0.2);
  }

  .step-2 form {
    @include fadeslideup(0.2);
  }

  .btn-wrapper {
    @include fadeslideup(0.4);
    margin-top: auto;
    transition: opacity 0.2s ease-in-out;

    .btn:not(.shown) {
      opacity: 0 !important;
      pointer-events: none;
    }
  }
}
</style>