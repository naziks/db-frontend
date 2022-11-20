import {Ref, watch} from 'vue'

// add allowed types
type AllowedTypes = string | number | boolean | Object | Array<any> | undefined | null;

export const makePersistent = (reference: Ref<AllowedTypes>, store_name: string) => {
    const value = localStorage.getItem(store_name);

    if (value) {
        try{
            reference.value = JSON.parse(value)
        } catch (e) {
            console.error("[Pania] Persistence error:", e);
            return;
        }
    }

    watch(reference, (newValue) => {
        if(newValue === null) {
            localStorage.removeItem(store_name);
        } else {
            localStorage.setItem(store_name, JSON.stringify(newValue))
        }
    }, {
        deep: true
    });
}