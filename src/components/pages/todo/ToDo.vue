<script setup lang="ts">
import { useToDoStore } from '@/stores/todo';
import { TaskData } from '@/stores/types';
import { ref } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VDialog } from 'vuetify/components/VDialog';
import { VSelect } from 'vuetify/components/VSelect';
import { VSwitch } from 'vuetify/components/VSwitch';

import { sortTypes } from './consts';
import Header from './header/Header.vue';
import ItemList from './itemlist/ItemList.vue';
import Modal from './modal/Modal.vue';

const todoStore = useToDoStore();

const showModal = ref(false);
const toDoData = ref<TaskData[]>(todoStore.fromLocalStorage.value || []);
const selectItems = ref(false);

function afterAddTask(taskData?: TaskData) {
    if (taskData) {
        toDoData.value.push(taskData);
        todoStore.setData(toDoData.value);
    }
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
    <ItemList
        :data="toDoData"
        :select="selectItems"
        @show-edit-modal="showModal = true"
    />
    <VBtn icon="mdi-plus" size="small" @click="showModal = !showModal" />
    <VDialog v-model="showModal" width="auto">
        <Modal @close-modal="afterAddTask" />
    </VDialog>
</template>
