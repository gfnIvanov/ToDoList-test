<script setup lang="ts">
import type { SetTaskStatusPayload } from '@/components/pages/todo/types';
import type { TaskData } from '@/stores/types';

import { defineEmits, defineProps } from 'vue';
import { VCheckboxBtn } from 'vuetify/components/VCheckbox';

import Item from './item/Item.vue';

defineProps<{ data: TaskData[]; select: boolean }>();

const emit = defineEmits<{
    (e: 'setTaskStatus', payload: SetTaskStatusPayload): void;
    (e: 'showEditModal', order: number): void;
}>();

function setStatusPrepare(payload: SetTaskStatusPayload) {
    emit('setTaskStatus', payload);
}
</script>

<template>
    <div class="mb-5">
        <div class="d-flex item-wrap" v-for="task in data" :key="task.order">
            <VCheckboxBtn v-if="select" /><Item
                :task="task"
                @show-edit-modal="$emit('showEditModal', task.order)"
                @set-task-status="setStatusPrepare"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.item-wrap {
    max-width: 500px;
}
</style>
