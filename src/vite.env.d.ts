import 'pinia';

/// <reference types="vite/client" />
declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module 'pinia' {
    export interface PiniaCustomProperties {
        get fromLocalStorage(): Ref<string>;
        set fromLocalStorage(value: Ref<string> | string);
    }
}
