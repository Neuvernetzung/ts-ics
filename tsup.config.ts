import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  clean: true,
  splitting: true,
  entry: ["./src/index.ts"],
  minify: true,
  dts: "./src/index.ts",
  treeshake: true,
  platform: "node",
  target: "node16",
  skipNodeModulesBundle: true,
});
