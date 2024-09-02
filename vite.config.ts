import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "vanilla-state-manager",
      fileName: (format) => `vanilla-state-manager.${format}.js`,
    },
    rollupOptions: {
      external: ["immer"],
      output: {
        globals: {
          immer: "immer",
        },
      },
    },
  },
  plugins: [dts()],
});
