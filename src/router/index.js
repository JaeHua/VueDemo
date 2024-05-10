import { createRouter, createWebHistory } from 'vue-router'
// 路由数组
const routes = [
    {
        path: '/',
        component: ()=>import('../views/Welcome.vue'),
        meta: { title: 'Welcome',
            showNav:false
        },
    },
    {
        path: '/home',
        name: 'Home',
        component: ()=>import('../views/Home.vue'),
        meta: { title: 'Home',
        showNav:true}
    },
    {
        path: '/register',
        name: 'Register',
        component: ()=>import('../views/Register.vue'),
        meta: { title: 'Register',
            showNav:true}
    },
    {
        path: '/login',
        name: 'Login',
        component: ()=>import('../views/Login.vue'),
        meta: { title: 'Login',
            showNav:true}
    },
    ]
// 创建路由对象
const router = createRouter({    history: createWebHistory(),    routes})

export default router