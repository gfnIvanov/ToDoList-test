<script setup lang="ts">
import { Button, Input } from '@/components/ui';
import { useToDoStore } from '@/stores/todo';
import { TaskData } from '@/stores/types';
import { defineEmits, ref } from 'vue';
import { VCard } from 'vuetify/components/VCard';

const emit = defineEmits<{ (e: 'closeModal', taskData?: TaskData): void }>();

const todoStore = useToDoStore();

const title = ref('');
const content = ref('');
const toDoData = ref<TaskData[]>(todoStore.fromLocalStorage.value || []);

function addTask() {
    const taskData = {
        content: content.value,
        order: toDoData.value.length + 1,
        status: false,
        title: title.value,
    };
    content.value = '';
    title.value = '';
    emit('closeModal', taskData);
}
</script>

<template>
    <VCard class="pa-3">
        <Input label="Тема" v-model="title" type="text" width="400" />
        <Input label="Описание" v-model="content" type="text" width="400" />
        <template v-slot:actions>
            <div class="w-100 d-flex justify-end">
                <Button text="Сохранить" @click="addTask" />
                <Button text="Отмена" @click="$emit('closeModal')" />
            </div>
        </template>
    </VCard>
</template>
