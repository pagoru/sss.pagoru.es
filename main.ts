/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { InnerRenderFunction, RenderContext, start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import sass from "sass";


const render = (ctx: RenderContext, render: InnerRenderFunction) => {
  
  const compile = sass(["./styles/styles.scss"]);
  const str = compile.to_string();
  Deno.writeTextFileSync('./static/styles.min.css', str.get('styles'))
  
  render();
}

await start(manifest, { render });