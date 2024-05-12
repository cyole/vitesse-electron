import { createApp } from 'vue'
import App from './App.vue'
import type { UserModule } from '~/types'
import '~/styles'

const app = createApp(App)

Object.values(
  import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }),
).forEach(i => i.install?.(app))

app.mount('#app').$nextTick(() => {
  window.postMessage({ payload: 'removeLoading' }, '*')
})
