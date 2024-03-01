<script setup lang="ts">
import type { TaskData } from '@/stores/types';

import { defineProps } from 'vue';

defineProps<{ data: TaskData[] }>();
</script>

<template>
    <div v-for="task in data" :key="task.order">{{ task.title }}</div>
</template>

<style scoped lang="scss"></style>
