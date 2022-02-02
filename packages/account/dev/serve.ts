import { createApp } from 'vue';
import Dev from './serve.vue';
import Account from '@/entry.esm';
import { createStore } from "vuex";


const app = createApp(Dev);

const store = createStore({})


app.use(store)
app.use(Account, { store });

app.mount('#app');
