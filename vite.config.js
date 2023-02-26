import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@' : path.resolve(__dirname, './src'),
			'@assets' : path.resolve(__dirname, './src/assets'),
			'@core' : path.resolve(__dirname, './src/core'),
			'@components' : path.resolve(__dirname, './src/components'),
			'@img' : path.resolve(__dirname, './public/img'),
		},
	},
});