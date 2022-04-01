import { createApp } from 'vue';
import Dev from './serve.vue';
import Account from '@/entry.esm';


const app = createApp(Dev);

app.use(Account);

app.mount('#app');
