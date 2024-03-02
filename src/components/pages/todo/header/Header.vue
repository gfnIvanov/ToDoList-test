<script setup lang="ts">
import { Button } from '@/components/ui';
import { useAuthStore } from '@/stores/auth';
import { useToDoStore } from '@/stores/todo';
import { computed } from 'vue';
import { useRouter } from 'vue-router/auto';

const authStore = useAuthStore();
const todoStore = useToDoStore();

const router = useRouter();

const userName = computed(() => {
    if (authStore.userName !== '') return authStore.userName;
    const authDataLs = authStore.fromLocalStorage.value;
    return authDataLs?.name;
});

function logOut() {
    todoStore.$reset();
    authStore.$reset();
    router.push({ name: '/login' });
}
</script>

<template>
    <div class="header text-button">
        Пользователь: <span class="user">{{ userName }}</span>
        <Button text="Выход" type="text" @click="logOut" />
    </div>
</template>

<style scoped lang="scss">
.header {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;

    .user {
        margin-right: 20px;
    }
}
</style>
