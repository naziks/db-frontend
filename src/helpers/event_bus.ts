import { ref, watch } from "vue";
const bus = ref(new Map());

export const useEventsBus = () => {

    const emit = (event: string, value: any) => {
        bus.value.set(event, value);
    }

    const recieve = (event: string, callback: Function) => {
        watch(() => bus.value.get(event), (value) => {
            callback(value);
        });
    }

    return {
        recieve,
        emit,
        bus
    }
}
