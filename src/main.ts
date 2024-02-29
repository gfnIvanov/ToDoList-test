import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router/auto';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import {
    getFromLocalStorage,
    setToLocalStorage,
} from './stores/plugins/useLocalStorage';
import './styles/main.scss';

const pinia = createPinia();

pinia.use(setToLocalStorage);
pinia.use(getFromLocalStorage);

const router = createRouter({
    history: createWebHistory('/'),
});

createApp(App).use(vuetify).use(router).use(pinia).mount('#app');
