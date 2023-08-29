import { defineRoute, Handlers } from "$fresh/server.ts";
import { FormatVariants } from "../../components/ConversionButtonsSection.tsx";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import supportedFormatTypes from "../../utils/supportedFormatTypes.ts";

const fileType = "csv";
export const handler: Handlers<File> = {
  async POST(req, ctx) {
    const outputType: string = ctx.params.outputType;

    if (
    (supportedFormatTypes[fileType] as string[]).indexOf(
      outputType.toUpperCase(),
    ) === -1
  ) {
      return new Response(`Output type ${outputType} not supported`, {
        status: 400,
      });
    }

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

export default defineRoute(async (_req, ctx) => {
  const inputType = ctx.route.split("/")[1];
  const outputType = ctx.params.outputType;
  const title = `${inputType} to ${outputType}`;

  if (
    (supportedFormatTypes[fileType] as string[]).indexOf(
      outputType.toUpperCase(),
    ) === -1
  ) {
    return await ctx.renderNotFound();
  }

  return (
    <ConvertionPage
      title={title}
      inputType={inputType}
      outputType={outputType}
    />
  );
});
