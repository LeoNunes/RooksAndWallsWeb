import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            Util: path.resolve(__dirname, './src/Util'),
            Domain: path.resolve(__dirname, './src/Domain'),
            Components: path.resolve(__dirname, './src/Components'),
            Controllers: path.resolve(__dirname, './src/Controllers'),
            Services: path.resolve(__dirname, './src/Services'),
            RnWConfig: path.resolve(__dirname, './src/RnWConfig.ts'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        css: true,
    },
});
