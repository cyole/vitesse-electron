import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Layouts from 'vite-plugin-vue-layouts'
import Electron from 'vite-plugin-electron'
import ElectronRenderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),

    Electron([
      {
        entry: 'electron/main/index.ts',
        onstart(options) {
          if (process.env.VSCODE_DEBUG)
          // eslint-disable-next-line no-console
            console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
          else
            options.startup()
        },
        vite: {
          build: {
            sourcemap: false,
            minify: true,
            outDir: 'dist-electron/main',
            rollupOptions: {
              external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
            },
          },
        },
      },
      {
        entry: 'electron/preload/index.ts',
        onstart(options) {
          options.reload()
        },
        vite: {
          build: {
            sourcemap: false,
            minify: true,
            outDir: 'dist-electron/preload',
            rollupOptions: {
              external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
            },
          },
        },
      },
    ]),

    ElectronRenderer({
      // Enables use of Node.js API in the Renderer-process
      // nodeIntegration: true,

    }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      dts: 'types/typed-router.d.ts',
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: 'types/auto-imports.d.ts',
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: 'types/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),
  ],
})
