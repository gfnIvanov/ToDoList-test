import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router/auto';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import './styles/main.scss';

const router = createRouter({
    history: createWebHistory('/'),
});

router.beforeEach(to => {
    if (to.name !== '/login') {
        return { name: '/login' };
    }
});

createApp(App).use(vuetify).use(router).mount('#app');
