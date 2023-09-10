import { createApp } from 'vue'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
// import 'dayjs/locale/zh-cn' //中文
// @ts-ignore
import zhCN from "element-plus/dist/locale/zh-cn.mjs" //中文


import App from './App.vue'
import router from "@/router/index.ts";
import './style.css'
import store from '@/store/index.ts'


const app =createApp(App)
 //添加图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus, {locale:zhCN})
app.use(router)
app.mount('#app')
app.use(store)
