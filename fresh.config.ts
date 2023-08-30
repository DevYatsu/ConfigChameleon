import twindPlugin from "$fresh/plugins/twindv1.ts";
import { freshSEOPlugin } from "$modules/fresh_seo@1.0.1/mod.ts";
import manifest from "./fresh.gen.ts";

import twindConfig from "./twind.config.ts";
import { formatSiteMapUrls } from "./utils/supportedFormatTypes.ts";

export default {
  plugins: [
    twindPlugin(twindConfig),
    freshSEOPlugin(manifest, {
      include: formatSiteMapUrls,
    }),
  ],
};
