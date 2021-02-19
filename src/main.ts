import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';


const app = createApp(App);
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
