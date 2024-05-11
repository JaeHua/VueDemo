    import { createRouter, createWebHistory } from 'vue-router'
    import { useStore } from 'vuex'

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
                auth:true,
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
        {
            path: '/profile',
            name: 'Profile',
            component: ()=>import('../views/Profile.vue'),
            meta: { title: 'Profile',
                auth:true,
                showNav:true}
        },
        ]

    // 创建路由对象
    const router = createRouter({    history: createWebHistory(),    routes})

    router.beforeEach((to, from, next) => {
        const store = useStore()

        if (to.meta['auth']) { // 判断是否需要登录
            //判断用户是否登录
            if (store.state.userModule.token!=='null') {
                // 这里还要判断token的有效性，比如有没有过期，需要后台发放token的时候携带的有效期
                // 如果token无效，需要请求token
                next();
            } else {
                // 跳转登录
                next({name: 'Login'})
            }
        } else {
            next();
        }
    });
    export default router