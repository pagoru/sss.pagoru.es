import { webServe } from "deno_web_serve";
import { load } from "loadenv";

await load();
await webServe({
  port: 2017,
  indexFileName: "main.tsx",
  minify: false,
  openBrowser: false,
  externals: [],
  bundleAssets: false,
  envs: ["ENVIRONMENT"],
});
