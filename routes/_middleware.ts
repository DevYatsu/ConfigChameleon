import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { formatSiteMapUrls } from "../utils/supportedFormatTypes.ts";

const redirections: Record<string, string> = {
  "/home": "/",
  "/generate-password": "/password",
  "/random-json": "/json",
  "/generate-json": "/json",
  ...Object.fromEntries(formatSiteMapUrls.map((el) => [`/convert${el}`, el])),
};

export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const url = new URL(req.url);
  if (redirections[url.pathname]) {
    return new Response("", {
      status: 307,
      headers: { Location: redirections[url.pathname] },
    });
  }

  const origin = req.headers.get("Origin") || "*";
  const resp = await ctx.next();
  const headers = resp.headers;

  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
  );
  headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  headers.set(
    "x-content-type-options",
    "nosniff",
  );
  headers.set(
    "x-frame-options",
    "DENY",
  );
  headers.set(
    "x-xss-protection",
    "1; mode=block",
  );
  headers.set(
    "referrer-policy",
    "strict-origin-when-cross-origin",
  );
  headers.set(
    "feature-policy",
    "camera 'none'; microphone 'none'",
  );
  headers.set(
    "Cache-Control",
    "max-age=3600, public",
  );
  return resp;
}
