import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'

import axios from 'axios'
import 'element-plus/dist/index.css';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)

axios.defaults.baseURL = 'http://your-backend-api-url'

app.mount('#app')
