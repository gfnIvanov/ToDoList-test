<script setup lang="ts">
import type { TaskData } from '@/stores/types';

import { defineProps } from 'vue';
import { VCheckboxBtn } from 'vuetify/components/VCheckbox';

import Item from './item/Item.vue';

defineProps<{ data: TaskData[]; select: boolean }>();
</script>

<template>
    <div class="mb-5">
        <div class="d-flex item-wrap" v-for="task in data" :key="task.order">
            <VCheckboxBtn v-if="select" /><Item :title="task.title" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.item-wrap {
    max-width: 500px;
}
</style>
