import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({

    plugins: [vue({
        script: {
          defineModel: true
        }
      })],
    resolve: {
        // 配置路径别名
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    base:'/',

 
    
})
