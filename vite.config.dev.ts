/*
    vite config file which is used for developing webrtc-player
*/
import path from "path";

import { defineConfig, UserConfig } from "vite";
import dts from "vite-plugin-dts";

const config: UserConfig = {
    publicDir: "static",
    resolve: {
        alias: {
            src: path.resolve("src/"),
        },
    },
    build: {
        emptyOutDir: true,
        outDir: "./dist_dev",
    },
    plugins: [
        dts({
            include: ["src"],
            insertTypesEntry: true,
            // rollupTypes: true // merge all type declarations into one file
        }),
    ],
    define: {
        PLAYER_VERSION: JSON.stringify("dev"),
        GIT_COMMIT_HASH: JSON.stringify(""),
        BUILD_DATETIME: JSON.stringify(new Date().toISOString().slice(0, -5).replace("T", " ")),
    },
};

export default defineConfig((): Promise<UserConfig> => {
    return new Promise((resolve) => {
        resolve(config);
    });
});
