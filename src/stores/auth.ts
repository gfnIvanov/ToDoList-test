import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

type AuthData = {
    isAuth: boolean;
    userName: string;
};

export const useAuthStore = defineStore('auth', () => {
    const authData = reactive<AuthData>({
        userName: '',
        isAuth: false,
    });

    const userName = computed(() => authData.userName);

    const isAuth = computed(() => authData.isAuth);

    function setAuthData(name: string) {
        authData.userName = name;
        authData.isAuth = true;
    }

    function $reset() {
        authData.userName = '';
        authData.isAuth = false;
    }
    return { authData, userName, isAuth, setAuthData, $reset };
});
