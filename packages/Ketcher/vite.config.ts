import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
	define: {
		"process.env": process.env,
		global: {}
	},
	plugins: [react(), dts({ include: ["lib"], tsconfigPath: "./tsconfig.build.json" })],
	build: {
		copyPublicDir: false,
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, "lib/main.ts"),
			fileName: "index",
			formats: ["es"]
			// the proper extensions will be added
			// fileName: "my-lib"
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ["react", "react/jsx-runtime", "ketcher-core"]
			// output: {
			// 	// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
			// 	globals: {
			// 		vue: "Vue"
			// 	}
			// }
		}
	}
});
