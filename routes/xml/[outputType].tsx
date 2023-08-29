import { Handlers, PageProps, RouteContext } from "$fresh/server.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import supportedFormatTypes from "../../utils/supportedFormatTypes.ts";

const fileType = "xml";
export const handler: Handlers<File> = {
  async POST(req, _ctx) {
    const file = await retrieveRequestFile(req, fileType);

    if (!file) {
      return new Response("Internal Server Error", { status: 500 });
    }
    if (file instanceof Response) {
      return file;
    }
    // file is file
    return new Response(null);
  },
};

export default async function Page(req: Request, ctx: RouteContext) {
  const inputType = ctx.route.split("/")[1];
  const outputType = ctx.params.outputType;
  const title = `${inputType} to ${outputType}`;

  if (
    supportedFormatTypes[fileType].indexOf(outputType.toUpperCase()) === -1
  ) {
    return await ctx.renderNotFound();
  }
  return (
    <ConvertionPage
      title={title}
      inputType={inputType}
      outputType={outputType}
      {...ctx}
    />
  );
}
