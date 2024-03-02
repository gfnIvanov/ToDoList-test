<script setup lang="ts">
import { useRouter } from 'vue-router/auto';

import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

const router = useRouter();

router.beforeEach(to => {
    const authDataLs = authStore.fromLocalStorage.value;
    if (to.name !== '/login' && !authStore.isAuth && !authDataLs?.isAuth) {
        return { name: '/login' };
    }
});
</script>

<template>
    <RouterView />
</template>
