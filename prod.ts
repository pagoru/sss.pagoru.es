import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import * as path from "https://deno.land/std@0.181.0/path/mod.ts";

const currentBuildPath = path.join(await Deno.cwd(), "build/");

await serve(
  async (request: Request) => {
    const url = new URL(request.url);
    const filepath = url.pathname ? decodeURIComponent(url.pathname) : "";

    let file;
    if (filepath !== "/") {
      try {
        file = await Deno.open(currentBuildPath + filepath, { read: true });
      } catch {}
    }

    if (!file) {
      let indexFileText = await Deno.readTextFile(
        currentBuildPath + "index.html",
      );

      return new Response(indexFileText, {
        headers: {
          "content-type": "text/html",
        },
      });
    }

    return new Response(file?.readable, {
      headers: {
        "content-type": filepath.includes(".css") ? "text/css" : null,
      },
    });
  },
  { port: Deno.env.get("PORT") || 8080 },
);
