<script setup lang="ts">
import { Button } from '@/components/ui';
import { useRouter } from 'vue-router/auto';

const router = useRouter();

function redirectToMainPage() {
    router.push({ name: '/' });
}
</script>

<template>
    <div class="text-h5 head">Страница не найдена</div>
    <Button text="На главную" @click="redirectToMainPage" />
</template>
