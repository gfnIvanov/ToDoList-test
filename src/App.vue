<script setup lang="ts">
import { useRouter } from 'vue-router/auto';

import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

const router = useRouter();

router.beforeEach(to => {
    let isAuthLs;
    const authDataLs = authStore.fromLocalStorage.value;
    if (authDataLs) {
        isAuthLs = JSON.parse(authDataLs).isAuth;
    }
    if (to.name !== '/login' && !authStore.isAuth && !isAuthLs) {
        return { name: '/login' };
    }
});
</script>

<template>
    <RouterView />
</template>
