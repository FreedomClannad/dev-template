import { defineConfig, ConfigEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as process from "process";
// 这里vite-plugin-eslint 报错 请看 https://github.com/gxmari007/vite-plugin-eslint/issues/74 解决方法
// @ts-ignore
import eslintPlugin from "vite-plugin-eslint";
import { resolve } from "path";

// https://cn.vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
	const define = {
		"process.env": process.env
	};
	if (mode.mode === "development") {
		// @ts-ignore
		define.global = {};
	}
	return {
		root: "dev",
		define: define,
		resolve: {
			// extensions: [".jsx"],
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		server: {
			host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			port: 3388,
			open: true,
			cors: true,
			proxy: {}
		},
		plugins: [
			react(),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
		],
	};
});
