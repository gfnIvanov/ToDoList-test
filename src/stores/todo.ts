import { defineStore } from 'pinia';

type TaskData = {
    content: string;
    prior: number;
    status: boolean;
    title: string;
};

type ToDoData = {
    [index: string]: TaskData[];
};

export const useToDoStore = defineStore('todo', () => {
    const toDoData: TaskData[] = [];

    function setToDoData(taskData: TaskData) {
        toDoData.push(taskData);
    }

    function $reset() {
        toDoData.length = 0;
    }
    return { toDoData, setToDoData, $reset };
});
