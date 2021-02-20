/*
* 路由对象模块
* */
import Vue from 'vue';
import VueRouter from 'vue-router';

/*引入pages*/
const RegionOverview = ()=>import('@/components/region/overview/index');
const RegionSelection = ()=>import('@/components/region/selection/index');
const AIOverview = ()=>import('@/components/ai/overview/index');
const AIPortrait = ()=>import('@/components/ai/portrait/index');
// const HelloWorld = () => import('@/components/HelloWorld');

//申明使用插件
Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/region/overview',
            exact: true,
            component: RegionOverview
        },
        {
            path:'/region/selection',
            exact: true,
            component: RegionSelection
        },
        {
            path:'/ai/overview',
            exact: true,
            component: AIOverview
        },
        {
            path:'/ai/portrait',
            exact: true,
            component: AIPortrait
        },
        {
            path: '*',
            redirect: '/region/overview'
        }
    ]
});