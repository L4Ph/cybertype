import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare'
import { reactRouter } from "@react-router/dev/vite";


export default defineConfig({
    plugins: [
        cloudflareDevProxy(),
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