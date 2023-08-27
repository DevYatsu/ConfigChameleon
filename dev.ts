#!/usr/bin/env -S deno run -A --watch=static/,routes/

import "https://deno.land/x/twindellisense@v1.0.0/load.ts";
// for adding intellisense through tailwind intellisense plugin

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

await dev(import.meta.url, "./main.ts", config);
