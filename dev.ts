#!/usr/bin/env -S deno run -A --watch=static/,routes/

import "$modules/twindellisense@v1.0.0/load.ts";
import "$modules/fresh_import_map@v1.0.0/load.ts";
import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

await dev(import.meta.url, "./main.ts", config);
