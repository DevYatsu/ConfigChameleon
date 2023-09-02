import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(_req: Request, ctx: MiddlewareHandlerContext) {
  const resp = await ctx.next();
  const headers = resp.headers;

  if (headers.has("Access-Control-Allow-Methods")) {
    console.log(headers.has("Access-Control-Allow-Methods"));
    headers.delete("Access-Control-Allow-Methods");
  }
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST",
  );

  return resp;
}
