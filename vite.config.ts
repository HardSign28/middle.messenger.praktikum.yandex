import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	root: '.',
	server: {
		port: 3000,
	},
	preview: { port: 3000 },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	css: {
		postcss: 'postcss.config.cjs',
	},
	build: {
		outDir: 'dist',
	},
});
