import vue from '@vitejs/plugin-vue';
import path from 'path';
import { dirname } from 'path';
import VueRouter from 'unplugin-vue-router/vite';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const src = path.resolve(__dirname, './src');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueRouter({ dts: path.resolve(src, 'typed-router.d.ts') }),
    ],
    resolve: {
        alias: {
            '@': src,
        },
    },
});
