import './styles/main.scss'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/core/router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase'

const app = createApp(App)
const pinia = createPinia()

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.mount('#app')
