import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";


export default defineConfig({
    plugins: [
        reactRouter(),
        tsconfigPaths()
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler"
            }
        }
    }
})