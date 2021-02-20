import Vue from 'vue';
import App from './App.vue';
import router from './config/routes';
import './plugins/element.js';
import '@/common/map.js';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
