<script setup lang="ts">
import Copyright from '@/components/Copyright.vue';
import { Ref, ref } from "vue";
import { useAuthStore } from "@/store";

const email = ref<string>('');
const password = ref<string>('');
const store = useAuthStore();

const set = (event: InputEvent, ref: Ref<string>) => ref.value = ( event.target as HTMLInputElement).value;
const setEmail = (e: InputEvent) => set(e, email);
const setPassword = (e: InputEvent) => set(e, password);

const submitHandler = () => {
  // send api request
  store.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0NSwiZW1haWwiOiJtZUBuYXphcmtvLmRldiIsImlhdCI6MTUxNjIzOTAyMn0.FpPmBN4HOT15-mRouLyLYNBYJh1W2SVnoJqBeCCeg2M");
  console.log(store)
}

</script>

<template>
  <section class="text-gray-400 bg-gray-900 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-nowrap items-center justify-center">
      <form @submit.prevent="submitHandler"
          class="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 pb-0 flex flex-col w-full mt-10 md:mt-0">
        <h2 class="text-white text-lg text-center font-medium title-font mb-5">Welcome to Detoxer</h2>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-400">Email</label>
          <input type="email" :value="email" @change="setEmail" @input="setEmail" id="email"
                 placeholder="email@example.com" autocomplete="email" required
                 class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="relative mb-4">
          <label for="password" class="leading-7 text-sm text-gray-400">Password</label>
          <input type="password" :value="password" @change="setPassword" @input="setPassword" id="password"
                 autocomplete="current-password" placeholder="12345678" required
                 class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <button type="submit"
            class="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
          Login
        </button>
        <p class="text-xs mt-5 mb-5">
          <Copyright/>
        </p>
      </form>
    </div>
  </section>
</template>