<script setup lang="ts">
import { Button, Input } from '@/components/ui';
import { useAuthStore } from '@/stores/auth';
import { useToDoStore } from '@/stores/todo';
import { ref } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VCard } from 'vuetify/components/VCard';
import { VDialog } from 'vuetify/components/VDialog';

import Header from './header/Header.vue';
import ItemList from './itemlist/ItemList.vue';

const authStore = useAuthStore();
const todoStore = useToDoStore();

let userName = authStore.userName;
if (userName === '') {
    const authDataLs = authStore.fromLocalStorage.value;
    if (authDataLs) {
        userName = JSON.parse(authDataLs).name;
    }
}

const showModal = ref(false);
const title = ref('');
const content = ref('');
const itemListData = ref(todoStore.toDoData[userName] || []);

function addTask() {
    let order = 0;
    const userData = todoStore.toDoData[userName];
    if (userData) {
        order = userData.length + 1;
    } else {
        todoStore.initUserData(userName);
    }
    const taskData = {
        content: content.value,
        order,
        status: false,
        title: title.value,
    };
    todoStore.setToDoData(userName, taskData);
    itemListData.value = todoStore.toDoData[userName].slice(0);
    content.value = '';
    title.value = '';
    showModal.value = false;
}
</script>

<template>
    <Header />
    <ItemList :data="itemListData" />
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
