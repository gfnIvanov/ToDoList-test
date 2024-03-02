<script setup lang="ts">
import { Button, Input } from '@/components/ui';
import { useToDoStore } from '@/stores/todo';
import { TaskData } from '@/stores/types';
import { ref } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VCard } from 'vuetify/components/VCard';
import { VDialog } from 'vuetify/components/VDialog';
import { VSelect } from 'vuetify/components/VSelect';
import { VSwitch } from 'vuetify/components/VSwitch';

import { sortTypes } from './consts';
import Header from './header/Header.vue';
import ItemList from './itemlist/ItemList.vue';

const todoStore = useToDoStore();

const showModal = ref(false);
const title = ref('');
const content = ref('');
const toDoData = ref<TaskData[]>(todoStore.fromLocalStorage.value || []);
const selectItems = ref(false);

function addTask() {
    const taskData = {
        content: content.value,
        order: toDoData.value.length + 1,
        status: false,
        title: title.value,
    };
    toDoData.value.push(taskData);
    todoStore.setData(toDoData.value);
    content.value = '';
    title.value = '';
    showModal.value = false;
}
</script>

<template>
    <Header />
    <div class="text-h5 head">Список задач</div>
    <VSwitch
        v-if="toDoData.length > 0"
        label="выбрать несколько"
        v-model="selectItems"
    />
    <VSelect
        v-if="toDoData.length > 0"
        label="сортировать"
        :items="sortTypes"
        variant="underlined"
    />
    <ItemList :data="toDoData" :select="selectItems" />
    <VBtn icon="mdi-plus" size="small" @click="showModal = !showModal" />
    <VDialog v-model="showModal" width="auto">
        <VCard class="pa-3">
            <Input label="Тема" v-model="title" type="text" width="400" />
            <Input label="Описание" v-model="content" type="text" width="400" />
            <template v-slot:actions>
                <div class="w-100 d-flex justify-end">
                    <Button text="Сохранить" @click="addTask" />
                    <Button text="Отмена" @click="showModal = false" />
                </div>
            </template>
        </VCard>
    </VDialog>
</template>
