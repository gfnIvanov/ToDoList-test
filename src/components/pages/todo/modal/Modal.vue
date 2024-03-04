<script setup lang="ts">
import type { AddEditTaskPayload } from '@/components/pages/todo/types';

import { Button, Input } from '@/components/ui';
import { TaskData } from '@/stores/types';
import { computed, defineEmits, defineProps, ref } from 'vue';
import { VCard } from 'vuetify/components/VCard';

const props = defineProps<{ data: TaskData[]; order: number }>();

const emit = defineEmits<{
    (e: 'closeModal', payload?: AddEditTaskPayload): void;
    (e: 'closeModalAfterDel', task?: TaskData): void;
}>();

const task = computed(() => {
    return props.data.find(task => task.order === props.order);
});

const title = ref(task.value?.title || '');
const content = ref(task.value?.content || '');

function addEditTask() {
    const taskData = {
        content: content.value,
        order: props.order > 0 ? props.order : props.data.length + 1,
        status: task.value ? task.value.status : false,
        title: title.value,
    };
    const payload = {
        taskData,
        task: task.value,
    };
    content.value = '';
    title.value = '';
    emit('closeModal', payload);
}
</script>

<template>
    <VCard class="pa-3">
        <Input label="Тема" v-model="title" type="text" width="400" />
        <Input label="Описание" v-model="content" type="text" width="400" />
        <template v-slot:actions>
            <div class="w-100 d-flex justify-end">
                <Button text="Сохранить" @click="addEditTask" />
                <Button
                    v-if="order > 0"
                    text="Удалить"
                    color="error"
                    @click="$emit('closeModalAfterDel', task)"
                />
                <Button text="Отмена" @click="$emit('closeModal')" />
            </div>
        </template>
    </VCard>
</template>
