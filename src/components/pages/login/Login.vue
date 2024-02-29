<script setup lang="ts">
import { Button, Input } from '@/components/ui';
import { useRouter } from 'vue-router/auto';

const router = useRouter();

function toMainPage() {
    router.push({ name: '/' });
}
</script>

<template>
    <Input label="Логин" type="text" width="250" />
    <Input label="Пароль" type="password" width="250" />
    <Button text="Войти" @click="toMainPage" />
</template>

<style scoped lang="scss"></style>
