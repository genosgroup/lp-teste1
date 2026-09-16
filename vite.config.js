import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: o site é publicado em https://genosgroup.github.io/lp-teste1/
// Em domínio próprio (ou raiz do Pages), troque para '/'.
export default defineConfig({
  base: '/lp-teste1/',
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  build: {
    outDir: 'dist'
  }
});
