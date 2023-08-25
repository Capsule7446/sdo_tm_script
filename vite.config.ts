import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import monkey, {cdn} from 'vite-plugin-monkey';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        name: "愛哭包專用 - 盛趣腳本",
        icon: 'https://cdn-icons-png.flaticon.com/512/3712/3712589.png',
        namespace: 'JWLWJ',
        match: ['https://chdact2.web.sdo.com/project/ChdGrade/*','https://chdact2.web.sdo.com/project/kwl_*','https://chdact2.web.sdo.com/project/120629lz/home.asp'],
        version: '1.0.0'
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
      },
    }),
  ],
});