import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      'process.env.API_URL': mode === 'development'
        ? '"http://localhost:3000"'
        : '"https://production-api.com"'
    }
  };
});
