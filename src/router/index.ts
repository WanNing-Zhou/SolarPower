// 导入Vue和Vue Router
import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/views/Home/Home.vue";
import DataShow from "@/views/DataShow/DataShow.vue";


// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' }, // 当访问根路径 / 时，重定向到 /home
        { path: '/home', component: Home },
        { path: '/datashow/:id', component: DataShow }
    ]
});

// 导出路由实例
export default router;
