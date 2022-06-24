// FILE: vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
      include: [/\.vue$/],
    }),
    Pages({
      extensions: ['vue'],
      syncIndex: false,
    }),
    Layouts({
      defaultLayout: 'default'
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ]
})