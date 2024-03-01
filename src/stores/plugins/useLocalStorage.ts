import { TaskData } from '@/stores/types';
import { PiniaPluginContext } from 'pinia';
import { markRaw } from 'vue';

function setData(data: [string, TaskData] | string): void {
    if (typeof data === 'string') {
        localStorage.setItem(
            'auth',
            JSON.stringify({ name: data, isAuth: true }),
        );
    }
    if (Array.isArray(data)) {
        const [name, taskData] = data;
        const lsData = localStorage.getItem(name);
        if (lsData) {
            const dataArray = JSON.parse(lsData);
            dataArray.push(taskData);
            localStorage.setItem(name, JSON.stringify(dataArray));
        }
    }
}

const authStoreActions = new Map([
    ['$reset', () => localStorage.removeItem('auth')],
    ['setAuthData', setData],
]);

const todoStoreActions = new Map([
    ['$reset', (name: string) => localStorage.removeItem(name)],
    ['initUserData', (name: string) => localStorage.setItem(name, '[]')],
    ['setToDoData', setData],
]);

const localStorageActions = new Map([
    ['auth', authStoreActions],
    ['todo', todoStoreActions],
]);

export function setToLocalStorage(context: PiniaPluginContext) {
    const { store } = context;
    store.$onAction(({ name, after, args }) => {
        const action = localStorageActions.get(store.$id)?.get(name);
        const params = args.length > 1 ? args : args[0];
        if (action) {
            after(action.bind(null, params));
        }
    });
}

export function getFromLocalStorage(context: PiniaPluginContext) {
    const { store } = context;
    store.fromLocalStorage = markRaw({
        value: localStorage.getItem('auth'),
    });
}
