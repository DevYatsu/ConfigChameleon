import beautify from "npm:json-beautify";
import hljs from "npm:highlight.js";
import json from "npm:highlight.js/lib/languages/json";
import { RouteConfig } from "$modules/fresh@1.4.2/server.ts";
import sanitizeHtml from "npm:sanitize-html";

hljs.registerLanguage("json", json);

export default function Viewer(
  { data }: { data: Record<string, string | object | number | boolean> | null },
) {
  if (data === null) {
    data = { "data-retrieved": false };
  }

  const jsonString = beautify(data, null, 4, 80);

  const jsonHighlighted =
    hljs.highlight(jsonString, { language: "json" }).value;

  const finalString = sanitizeHtml(jsonHighlighted, {
    allowedTags: ["span"],
    allowedAttributes: {
      "span": ["class"],
    },
  });

  return (
    <>
      <div class="mx-5 w-full lg:w-6/12 bg-[#e5fcf5] dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
        <div id="header-buttons" class="py-3 px-4 flex hljs-number">
          <div class="rounded-full w-3 h-3 bg-red-500 mr-2"></div>
          <div class="rounded-full w-3 h-3 bg-yellow-500 mr-2"></div>
          <div class="rounded-full w-3 h-3 bg-green-500"></div>
          <span class="hljs-number hljs-attr hljs-string hljs-keyword hidden">
          </span>
          <span class="hljs-punctuation hljs-attr hljs-string hljs-keyword hidden">
          </span>
        </div>
        <div
          id="code-area"
          class="py-4 px-4 mt-1 text-white text-xl whitespace-pre-wrap min-h-[100px] "
          dangerouslySetInnerHTML={{ __html: finalString }}
        >
        </div>
      </div>
    </>
  );
}

export const config: RouteConfig = {
  csp: true,
};
