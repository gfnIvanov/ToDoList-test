import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
    },
    icons: {
        defaultSet: 'mdi',
    },
});

export default vuetify;
