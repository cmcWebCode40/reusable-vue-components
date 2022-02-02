import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import VdaAccounts from "./install";

Vue.use(Vuex)

const store = new Vuex.Store({});

Vue.config.productionTip = false;


Vue.use(VdaAccounts, { store });

new Vue({
  render: (h) => h(App),
}).$mount("#app");
