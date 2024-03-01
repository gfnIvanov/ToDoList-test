<script setup lang="ts">
import { Button, Input } from '@/components/ui';
import { useAuthStore } from '@/stores/auth';
import { useToDoStore } from '@/stores/todo';
import { computed, ref } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VCard } from 'vuetify/components/VCard';
import { VDialog } from 'vuetify/components/VDialog';
import { VSelect } from 'vuetify/components/VSelect';
import { VSwitch } from 'vuetify/components/VSwitch';

import { sortTypes } from './consts';
import Header from './header/Header.vue';
import ItemList from './itemlist/ItemList.vue';

const authStore = useAuthStore();
const todoStore = useToDoStore();

const userName = computed(() => {
    if (authStore.userName !== '') return authStore.userName;
    let userName;
    const authDataLs = authStore.fromLocalStorage.value;
    if (authDataLs) {
        userName = JSON.parse(authDataLs).name;
    }
    return userName;
});

const showModal = ref(false);
const title = ref('');
const content = ref('');
const itemListData = ref(todoStore.toDoData[userName.value] || []);
const selectItems = ref(false);

function addTask() {
    let order = 0;
    const userData = todoStore.toDoData[userName.value];
    if (userData) {
        order = userData.length + 1;
    } else {
        todoStore.initUserData(userName.value);
    }
    const taskData = {
        content: content.value,
        order,
        status: false,
        title: title.value,
    };
    todoStore.setToDoData(userName.value, taskData);
    itemListData.value = todoStore.toDoData[userName.value].slice(0);
    content.value = '';
    title.value = '';
    showModal.value = false;
}
</script>

<template>
    <Header />
    <div class="text-h5 head">Список задач</div>
    <VSwitch
        v-if="itemListData.length > 0"
        label="выбрать несколько"
        v-model="selectItems"
    />
    <VSelect
        v-if="itemListData.length > 0"
        label="сортировать"
        :items="sortTypes"
        variant="underlined"
    />
    <ItemList :data="itemListData" :select="selectItems" />
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
