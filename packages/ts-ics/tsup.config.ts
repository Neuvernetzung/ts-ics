import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  clean: true,
  entry: ["./src/index.ts"],
  minify: true,
  dts: "./src/index.ts",
  platform: "node",
  target: "node16",
  skipNodeModulesBundle: true,
  noExternal: ["date-fns"],
});
