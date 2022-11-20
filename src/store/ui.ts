import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { makePersistent } from "@/helpers/store/persistence";

interface UIStore {
    menu_open: boolean;
}

export const useUIStore = defineStore('ui-config', () => {
    const config = ref<UIStore>({
        menu_open: false,
    });

    makePersistent(config, 'ui-config');

    const setMenuStatus = (status: boolean) =>  config.value.menu_open = status;
    const isMenuOpen = computed<boolean>(() => config.value.menu_open);

    return {
        config,
        isMenuOpen,
        setMenuStatus,
    }
});
