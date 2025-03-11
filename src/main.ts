import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vue-final-modal/style.css'
import { createVfm } from 'vue-final-modal'
const vfm = createVfm()


const app = createApp(App)
app.use(store).use(router).use(vfm).mount('#app')
