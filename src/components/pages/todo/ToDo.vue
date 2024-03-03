<script setup lang="ts">
import { useToDoStore } from '@/stores/todo';
import { TaskData } from '@/stores/types';
import { ref } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VDialog } from 'vuetify/components/VDialog';
import { VSelect } from 'vuetify/components/VSelect';
import { VSwitch } from 'vuetify/components/VSwitch';

import type { AddEditTaskPayload, SetTaskStatusPayload } from './types';

import { sortTypes } from './consts';
import Header from './header/Header.vue';
import ItemList from './itemlist/ItemList.vue';
import Modal from './modal/Modal.vue';

const todoStore = useToDoStore();

const showModal = ref(false);
const toDoData = ref<TaskData[]>(todoStore.fromLocalStorage.value || []);
const selectItems = ref(false);
const taskOrder = ref(0);

function afterAddEditTask(payload?: AddEditTaskPayload) {
    if (payload) {
        const { taskData, task } = payload;
        if (task) {
            const taskIndex = toDoData.value.indexOf(task);
            toDoData.value[taskIndex] = taskData;
        } else {
            toDoData.value.push(taskData);
        }
        todoStore.setData(toDoData.value);
    }
    showModal.value = false;
}

function afterDelTasl(task?: TaskData) {
    if (task) {
        const taskIndex = toDoData.value.indexOf(task);
        toDoData.value.splice(taskIndex, 1);
        todoStore.setData(toDoData.value);
    }
    showModal.value = false;
}

function showAddModal() {
    taskOrder.value = 0;
    showModal.value = true;
}

function showEditModal(order?: number) {
    taskOrder.value = order ? order : 0;
    showModal.value = true;
}

function setTaskStatus(payload: SetTaskStatusPayload) {
    const { task, checkedStatus } = payload;
    const taskIndex = toDoData.value.indexOf(task);
    toDoData.value[taskIndex].status = checkedStatus;
    todoStore.setData(toDoData.value);
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
    <ItemList
        :data="toDoData"
        :select="selectItems"
        @show-edit-modal="showEditModal"
        @set-task-status="setTaskStatus"
    />
    <VBtn icon="mdi-plus" size="small" @click="showAddModal" />
    <VDialog v-model="showModal" width="auto">
        <Modal
            @close-modal="afterAddEditTask"
            @close-modal-after-del="afterDelTasl"
            :data="toDoData"
            :order="taskOrder"
        />
    </VDialog>
</template>
