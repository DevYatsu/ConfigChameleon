import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";
import { freshSEOPlugin } from "https://deno.land/x/fresh_seo@1.0.1/mod.ts";
import manifest from "./fresh.gen.ts";
import supportedTypes from "./utils/supportedFormatTypes.ts";

export default defineConfig({
  plugins: [
    twindPlugin(twindConfig),
    freshSEOPlugin(manifest, {
      include: [
        ...supportedTypes.json.map((t) => `/json/${t.toLowerCase()}`),
        ...supportedTypes.yaml.map((t) => `/yaml/${t.toLowerCase()}`),
        ...supportedTypes.csv.map((t) => `/csv/${t.toLowerCase()}`),
        ...supportedTypes.xml.map((t) => `/xml/${t.toLowerCase()}`),
      ],
    }),
  ],
});
