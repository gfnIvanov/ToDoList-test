import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRemovedStore = defineStore('removed', () => {
    const removedTasks = ref<Set<number>>(new Set());

    function setRemovedTasks(order: number) {
        removedTasks.value.add(order);
    }

    function delTaskFromSet(order: number) {
        removedTasks.value.delete(order);
    }

    function $reset() {
        removedTasks.value.clear();
    }
    return { removedTasks, setRemovedTasks, delTaskFromSet, $reset };
});
