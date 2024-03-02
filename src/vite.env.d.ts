import type { AuthData, TaskData } from '@/stores/types';

import 'pinia';

/// <reference types="vite/client" />
declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module 'pinia' {
    export interface PiniaCustomProperties {
        get fromLocalStorage(): Ref<AuthData | TaskData[]>;
        set fromLocalStorage(value: Ref<string> | string);
    }
}
