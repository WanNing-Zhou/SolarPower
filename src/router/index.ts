/**
 * @FileNAme src\router\index.ts
 * @author 周万宁
 * @create 2023/8/27-18:27
 * @version
 * @description 路由配置
 */

// 导入Vue和Vue Router
import {createRouter, createWebHistory} from 'vue-router';
import Home from "@/views/Home/Home.vue";
import DataShow from "@/views/DataShow/DataShow.vue";


// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home, redirect: '/home'}, // 当访问根路径 / 时，重定向到 /home
        {path: '/home', component: Home},
        {path: '/datashow/:id/:label/', component: DataShow} // 这里的路由配置需要调整一下
    ]
});

// 导出路由实例
export default router;
