import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import { makePersistent } from "@/helpers/store/persistence";
import jose from 'jose';

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);
    makePersistent(token, 'auth');

    const setToken = (newToken: string) => {
        token.value = newToken;
    }

    const getToken = () => {
        return token.value;
    }

    const clearToken = () => {
        token.value = null;
    }

    const isAuthenticated = computed<boolean>(() => token.value !== null);

    return {
        token,
        setToken,
        getToken,
        clearToken,
        isAuthenticated,
    }
});
