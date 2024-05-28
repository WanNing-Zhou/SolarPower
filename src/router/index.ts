/*
 * @Author: buildgods 15564595518@163.com
 * @Date: 2023-09-09 16:13:59
 * @LastEditors: buildgods 15564595518@163.com
 * @LastEditTime: 2024-05-16 15:09:46
 * @FilePath: \SolarPower\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
        {path: '/', component: Home, redirect: '/login'}, // 当访问根路径 / 时，重定向到 /home

        {path:'/login',component:()=>import('@/views/DataShow/components/LoginPage.vue')},
        {
            path:'/layout',
            component:()=>import('@/components/Layout/Layout.vue'),
            redirect:'/home',
            children:[
                {path: '/datashow/:id/:label/', component: DataShow}, // 这里的路由配置需要调整一下
                {path: '/home', component: Home},
            ]
        },
        {
            path: '/admin',
            component: () => import('@/components/AdminLayout/AdminLayout.vue'),
            children: [
                {path: 'create-user', name:'createUser', component: () =>import('@/views/AdminShow/UserCreate/index.vue')},
                {
                    path: 'user-ctrl', name: 'userCtrl', component: () => import('@/views/AdminShow/UserCtrl/UserCtrl.vue')
                },
                {
                    path:'point-ctrl', name: 'pointCtrl', component: () => import('@/views/AdminShow/PointCtrl/PointCtrl.vue')
                },
                {
                    path: 'company-ctrl',
                    name: 'companyCtrl',
                    component: () => import('@/views/AdminShow/CompanyCtrl/CompanyCtrl.vue')
                },
            ]
        }
    ]
});

// 导出路由实例
export default router;
