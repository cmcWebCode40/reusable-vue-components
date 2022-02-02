import Vue from "vue";
import App from "./App.vue";

import Vuex from "vuex";
import VdaAccounts from "mike-user-account";

Vue.use(Vuex);

const store = new Vuex.Store({});



Vue.use(VdaAccounts, { store });

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
