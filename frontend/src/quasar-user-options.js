
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

// To be used on app.use(Quasar, { ... })
export default {
  framework: {
    plugins: [
      'Notify'
    ],
    config: {
      notify: { /* look at QuasarConfOptions from the API card */ }
    }
  },
  config: {},
  plugins: {
  },
  extras: [
    'roboto-font',
    'material-icons',
  ]
}