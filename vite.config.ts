import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({

    plugins: [
        vue({
            script: {
             defineModel: true
            }
        }),
        // 自动引入
        // AutoImport({
        //     resolvers: [ElementPlusResolver()],
        // }),
        // Components({
        //     resolvers: [ElementPlusResolver()],
        // }),
    ],
    resolve: {
        // 配置路径别名
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    base:'/',
})
