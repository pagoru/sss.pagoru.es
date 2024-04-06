import { build } from "deno_web_serve";
import { load } from "loadenv";

await load();

await build({
  indexFileName: "main.tsx",
  minify: true,
  bundleAssets: false,
  envs: [
  ],
});
