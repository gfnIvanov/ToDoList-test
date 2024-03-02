import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

import type { AuthData } from './types';

export const useAuthStore = defineStore('auth', () => {
    const authData = reactive<AuthData>({
        userName: '',
        isAuth: false,
    });

    const userName = computed(() => authData.userName);

    const isAuth = computed(() => authData.isAuth);

    function setData(name: string) {
        authData.userName = name;
        authData.isAuth = true;
    }

    function $reset() {
        authData.userName = '';
        authData.isAuth = false;
    }
    return { authData, userName, isAuth, setData, $reset };
});
