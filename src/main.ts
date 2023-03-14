import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import SvgIcon from '@/icons'

const app = createApp(App);
SvgIcon(app)
const store = createPinia()
app.use(router).use(store).mount('#app')
