#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import sass from 'sass';

const compile = sass(["./styles/styles.scss"]);
const str = compile.to_string();
Deno.writeTextFileSync('./static/styles.min.css', str.get('styles'))

await dev(import.meta.url, "./main.ts");
