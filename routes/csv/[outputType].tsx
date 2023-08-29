import { Handlers, PageProps } from "$fresh/server.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import supportedFormatTypes from "../../utils/supportedFormatTypes.ts";

const fileType = "csv";
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
  GET(req, ctx) {
    const outputType: string = ctx.params.outputType;
    console.log(req);
    if (
      supportedFormatTypes[fileType].indexOf(outputType.toUpperCase()) === -1
    ) {
      return ctx.renderNotFound();
    }

    return ctx.render();
  },
};

export default function Page(props: PageProps) {
  const inputType = props.route.split("/")[1];
  const outputType = props.params.outputType;
  const title = `${inputType} to ${outputType}`;

  return (
    <ConvertionPage
      title={title}
      inputType={inputType}
      outputType={outputType}
      {...props}
    />
  );
}
