<script setup lang="ts">
import { useRemovedStore } from '@/stores/removed';
import { useToDoStore } from '@/stores/todo';
import { TaskData } from '@/stores/types';
import { onMounted, ref, watch } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VDialog } from 'vuetify/components/VDialog';
import { VSelect } from 'vuetify/components/VSelect';
import { VSwitch } from 'vuetify/components/VSwitch';

import type { AddEditTaskPayload, SetTaskStatusPayload } from './types';

import { sortTypes } from './consts';
import Header from './header/Header.vue';
import ItemList from './itemlist/ItemList.vue';
import Modal from './modal/Modal.vue';
import { SortTypesValues } from './types';

const todoStore = useToDoStore();
const removedStore = useRemovedStore();

const showModal = ref(false);
const toDoData = ref<TaskData[]>(todoStore.fromLocalStorage.value || []);
const removedData = ref<Set<number>>(removedStore.removedTasks);
const selectItems = ref(false);
const taskOrder = ref(0);
const sortType = ref(SortTypesValues.INORDER);

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
        sortTasks();
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
    sortTasks();
}

function massDeletion() {
    removedStore.removedTasks.forEach(order => {
        const taskForRemove = toDoData.value.find(task => task.order === order);
        if (taskForRemove) {
            const taskIndex = toDoData.value.indexOf(taskForRemove);
            toDoData.value.splice(taskIndex, 1);
        }
    });
    removedStore.$reset();
    todoStore.setData(toDoData.value);
}

function sortTasks() {
    const sortByOrder = () =>
        toDoData.value.sort((task, nextTask) => task.order - nextTask.order);
    switch (sortType.value) {
        case SortTypesValues.COMPLETED:
            toDoData.value.sort(
                (task, nextTask) => +nextTask.status - +task.status,
            );
            break;
        case SortTypesValues.UNFULFILLED:
            toDoData.value.sort(task => +task.status);
            break;
        case SortTypesValues.INORDER:
            sortByOrder();
            break;
        default:
            sortByOrder();
            break;
    }
}

watch(selectItems, () => !selectItems.value && removedStore.$reset());

watch(sortType, sortTasks);

onMounted(sortTasks);
</script>

<template>
    <Header />
    <div class="text-h5 head">Список задач</div>
    <VSwitch
        v-if="toDoData.length > 0"
        label="выбрать несколько"
        v-model="selectItems"
    />
    <div v-if="toDoData.length > 0">
        <div>Сортировать:</div>
        <VSelect v-model="sortType" :items="sortTypes" variant="underlined" />
    </div>
    <ItemList
        :data="toDoData"
        :select="selectItems"
        @show-edit-modal="showEditModal"
        @set-task-status="setTaskStatus"
    />
    <VBtn icon="mdi-plus" size="small" @click="showAddModal" />
    <VBtn
        v-if="removedData.size > 0"
        class="ml-3"
        icon="mdi-delete"
        size="small"
        color="error"
        @click="massDeletion"
    />
    <VDialog v-model="showModal" width="auto">
        <Modal
            @close-modal="afterAddEditTask"
            @close-modal-after-del="afterDelTasl"
            :data="toDoData"
            :order="taskOrder"
        />
    </VDialog>
</template>
