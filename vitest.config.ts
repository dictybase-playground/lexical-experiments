/// <reference types="vitest" />
import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setup.ts",
    mockReset: true,
    include: ["./src/**/*.test.ts?(x)"],
    server: {
      deps: {
        inline: ["@lexical/react", "@lexical/devtools-core"],
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^@dictybase\/(.*)$/,
        replacement: path.resolve(import.meta.dirname, "src/packages/$1"),
      },
    ],
  },
})
