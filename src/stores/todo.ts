import { defineStore } from 'pinia';

import type { TaskData } from './types';

type ToDoData = {
    [index: string]: TaskData[];
};

export const useToDoStore = defineStore('todo', () => {
    const toDoData: ToDoData = {};

    function setToDoData(userName: string, taskData: TaskData) {
        toDoData[userName].push(taskData);
    }

    function initUserData(userName: string) {
        toDoData[userName] = [];
    }

    function $reset(userName: string) {
        if (toDoData[userName]) {
            toDoData[userName].length = 0;
        }
    }
    return { toDoData, setToDoData, initUserData, $reset };
});
