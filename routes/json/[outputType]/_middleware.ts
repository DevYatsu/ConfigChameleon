import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(_req: Request, ctx: MiddlewareHandlerContext) {
  const resp = await ctx.next();
  const headers = resp.headers;

  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST",
  );

  return resp;
}
