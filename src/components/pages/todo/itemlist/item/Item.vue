<script setup lang="ts">
import type { SetTaskStatusPayload } from '@/components/pages/todo/types';
import type { TaskData } from '@/stores/types';

import { useRemovedStore } from '@/stores/removed';
import { computed, defineProps, ref, watch } from 'vue';
import { VCard } from 'vuetify/components/VCard';
import { VCheckboxBtn } from 'vuetify/components/VCheckbox';

const props = defineProps<{ select: boolean; task: TaskData }>();

const emit = defineEmits<{
    (e: 'setTaskStatus', payload: SetTaskStatusPayload): void;
    (e: 'showEditModal'): void;
}>();

const removedStore = useRemovedStore();

const checkedStatus = ref(props.task.status);
const toRemoved = ref(false);
const isSelect = computed(() => props.select);

watch(checkedStatus, () =>
    emit('setTaskStatus', {
        checkedStatus: checkedStatus.value,
        task: props.task,
    }),
);

watch(toRemoved, () => {
    if (toRemoved.value) {
        removedStore.setRemovedTasks(props.task.order);
    } else {
        removedStore.delTaskFromSet(props.task.order);
    }
});

watch(isSelect, () => !isSelect.value && (toRemoved.value = false));
</script>

<template>
    <div class="item d-flex">
        <VCheckboxBtn v-if="isSelect" v-model="toRemoved" /><VCard
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
