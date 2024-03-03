<script setup lang="ts">
import type { SetTaskStatusPayload } from '@/components/pages/todo/types';
import type { TaskData } from '@/stores/types';

import { defineProps, ref, watch } from 'vue';
import { VCard } from 'vuetify/components/VCard';
import { VCheckboxBtn } from 'vuetify/components/VCheckbox';

const props = defineProps<{ task: TaskData }>();

const emit = defineEmits<{
    (e: 'setTaskStatus', payload: SetTaskStatusPayload): void;
    (e: 'showEditModal'): void;
}>();

const checkedStatus = ref(props.task.status);

watch(checkedStatus, () =>
    emit('setTaskStatus', {
        checkedStatus: checkedStatus.value,
        task: props.task,
    }),
);
</script>

<template>
    <div class="item d-flex">
        <VCard
            class="my-3 w-100"
            :title="task.title"
            link
            @click="$emit('showEditModal')"
        /><VCheckboxBtn
            v-model="checkedStatus"
            color="success"
            base-color="success"
        />
    </div>
</template>

<style scoped lang="scss">
.item {
    width: 600px;
}
</style>
