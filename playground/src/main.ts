import { createApp } from 'vue'
import DialogPlugin from '../../src'
import App from './App.vue'

const app = createApp(App)

app.use(DialogPlugin, {
  // messageBoxDefaultOptions: {
  //   draggable: true,
  //   hasMask: false,
  //   isPointerEventsNone: true
  // }
})
app.mount('#app')
