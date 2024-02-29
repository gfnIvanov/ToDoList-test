import { PiniaPluginContext } from 'pinia';
import { markRaw } from 'vue';

const authStoreActions = new Map([
    ['$reset', () => localStorage.removeItem('auth')],
    [
        'setAuthData',
        (name: string) => {
            localStorage.setItem(
                'auth',
                JSON.stringify({ name, isAuth: true }),
            );
        },
    ],
]);

const localStorageActions = new Map([['auth', authStoreActions]]);

export function setToLocalStorage(context: PiniaPluginContext) {
    const { store } = context;
    store.$onAction(({ name, after, args }) => {
        const action = localStorageActions.get(store.$id)?.get(name);
        if (action) {
            after(action.bind(null, args[0]));
        }
    });
}

export function getFromLocalStorage(context: PiniaPluginContext) {
    const { store } = context;
    store.fromLocalStorage = markRaw({
        value: localStorage.getItem('auth'),
    });
}
