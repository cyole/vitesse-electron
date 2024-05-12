import NProgress from 'nprogress'
import { router } from './router'
import type { UserModule } from '~/types'

export const install: UserModule = () => {
  router.beforeEach((to, from) => {
    if (to.path !== from.path)
      NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
