import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ Set the base path of the project
  resolve: {
    extensions: ['.js', '.jsx'], // ✅ Ensures JSX files are recognized
  },
  server: {
    port: 3000,
    open: true,
  },
});

