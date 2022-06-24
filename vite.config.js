// FILE: vite.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import liveReload from "vite-plugin-live-reload";
import Unocss from 'unocss/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
      include: [/\.vue$/],
    }),
    liveReload(
      "(app|config|database|public|resources|routes|tests)/**/*.php"
    ),
    Unocss({/* options */}),
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
  ],
  server: {
    https: {
        key: fs.readFileSync('./nginx/ssl/live/app.nsgdv.local/privkey.pem'),
        cert: fs.readFileSync('./nginx/ssl/live/app.nsgdv.local/fullchain.pem'),
    },
    //middlewareMode: "html"
  },
  build: {
    manifest: true,
    outDir: "public/dist",
    rollupOptions: {
        input: "src/main.js",
    },
  },
})