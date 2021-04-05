import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import vueKanban from 'vue-kanban'

import {
    Quasar,
    Notify
  } from 'quasar'
import quasarUserOptions from './quasar-user-options'
 

const app = createApp(App).use(Quasar, quasarUserOptions, Notify)
app.use(store)
app.use(router)
app.use(vueKanban)
app.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    notify: { /* look at QuasarConfOptions from the API card */ }
  }
})

app.mount('#app')