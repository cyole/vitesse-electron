import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import type { UserModule } from '~/types'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes),
})

export const install: UserModule = (app) => {
  app.use(router)
}
