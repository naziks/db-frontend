import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import '@/styles/index.scss'
import router from '@/routes'
import icons from '@/icons'

createApp(App)
    .use(router)
    .component('fa', icons)
    .use(createPinia())
    .mount('#app')
