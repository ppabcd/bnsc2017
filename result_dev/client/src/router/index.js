import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/ASC%20XII/client/',
    routes: [
        {
            path: '/',
            component: Home
        }
    ]
})
