<script setup lang="ts">
import { authentication } from '@/auth/auth';
import { Button, Input } from '@/components/ui';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router/auto';

const login = ref('');
const password = ref('');
const error = ref('');

const authStore = useAuthStore();

const router = useRouter();

function toMainPage() {
    const authData = {
        login: login.value,
        password: password.value,
    };
    if (authentication(authData)) {
        authStore.setData(authData.login);
        error.value = '';
        router.push({ name: '/' });
    } else {
        error.value = 'Ошибка при аутентификации';
    }
}
</script>

<template>
    <div class="text-h5 head">Авторизация</div>
    <Input label="Логин" type="text" v-model="login" width="250" />
    <Input label="Пароль" type="password" v-model="password" width="250" />
    <Button text="Войти" @click="toMainPage" />
    <div class="error">{{ error }}</div>
</template>
