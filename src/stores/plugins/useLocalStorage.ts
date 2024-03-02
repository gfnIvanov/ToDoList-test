import type { TaskData } from '@/stores/types';

import { PiniaPluginContext } from 'pinia';
import { markRaw } from 'vue';

type ActionArgType = { storeName: string; value: TaskData[] | string };

function setData(data: ActionArgType) {
    let dataForStorage;
    if (typeof data.value === 'string') {
        dataForStorage = JSON.stringify({ name: data.value, isAuth: true });
    } else if (Array.isArray(data.value)) {
        dataForStorage = JSON.stringify(data.value);
    } else {
        return;
    }
    localStorage.setItem(data.storeName, dataForStorage);
}

const storeActions = new Map([
    [
        '$reset',
        (data: ActionArgType) => localStorage.removeItem(data.storeName),
    ],
    ['setData', setData],
]);

export function setToLocalStorage(context: PiniaPluginContext) {
    const { store } = context;
    store.$onAction(({ name, after, args }) => {
        const action = storeActions.get(name);
        if (action) {
            after(action.bind(null, { storeName: store.$id, value: args[0] }));
        }
    });
}

export function getFromLocalStorage(context: PiniaPluginContext) {
    const { store } = context;
    let value = localStorage.getItem(store.$id);
    if (value) {
        value = JSON.parse(value);
    }
    store.fromLocalStorage = markRaw({ value });
}
