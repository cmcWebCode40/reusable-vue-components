import Vue, { VNode } from 'vue';
import Dev from './serve.vue';
import Vuex from "vuex";
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import VueTestLib from '@/entry.esm';

Vue.use(Vuex)

const store = new Vuex.Store({});

Vue.use(VueTestLib, { store });

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(Dev),
}).$mount('#app');
