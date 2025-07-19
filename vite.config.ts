import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./src/manifest.json";

export default defineConfig({
    plugins: [crx({ manifest })],
    build: {
        emptyOutDir: true,
        outDir: "dist",
        rollupOptions: {
            input: {
                popup: "src/popup/popup.html",
            },
        },
    },
});
