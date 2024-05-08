import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), eslint(), dts()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ScreenBox',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue', 'vue-i18n', resolve(__dirname, 'example/**/*')],
      output: {
        globals: {
          vue: 'vue',
          'vue-i18n': 'vue-i18n'
        }
      }
    }
  }
});
