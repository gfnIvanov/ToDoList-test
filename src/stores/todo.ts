import { defineStore } from 'pinia';
import { ref } from 'vue';

import { TaskData } from './types';

export const useToDoStore = defineStore('todo', () => {
    const toDoData = ref<TaskData[]>([]);

    function setData(data: TaskData[]) {
        toDoData.value = data;
    }

    function $reset() {
        toDoData.value.length = 0;
    }
    return { toDoData, setData, $reset };
});
