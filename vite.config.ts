import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver , ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import { svgBuilder } from './src/plugins/svgBuilder'; 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [NaiveUiResolver(),ElementPlusResolver()],
    }),
    Components({
      resolvers: [NaiveUiResolver(),ElementPlusResolver()]
    }),
    svgBuilder('./src/icons/svg/')
  ],
  resolve: {
    alias: [{
      find: "@",
      replacement: path.resolve(__dirname,'src')
      //为 /src配置别名@
    }]
  }
})
