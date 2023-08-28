import { Handlers, PageProps } from "$fresh/server.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import { parse as parseYaml } from "npm:yaml";
import { generateFile } from "../../utils/file.ts";

export const handler: Handlers<File> = {
  async POST(req, ctx) {
    const fileType = "yaml";
    const outputType: string = ctx.params.outputType;

    try {
      const file = await retrieveRequestFile(req, fileType);

      if (!file) {
        return new Response("Internal Server Error", { status: 500 });
      }
      if (file instanceof Response) {
        const error = file;
        return error;
      }

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const textDecoder = new TextDecoder("utf-8");
      const jsonContent = textDecoder.decode(uint8Array);
      console.log("working");

      try {
        const jsonObj = parseYaml(jsonContent);

        switch (outputType) {
          case "json": {
            const file = generateFile(
              JSON.stringify(jsonObj),
              "application/json",
            );
            return new Response(file);
          }
          case "html": {
            break;
          }
          case "csv": {
            break;
          }

          case "xml": {
            break;
          }
          default:
            return new Response(`Output type ${outputType} not supported`, {
              status: 400,
            });
        }
      } catch (error) {
        console.log(error);
        return new Response(`Invalid ${fileType} format`, { status: 422 });
      }
    } catch (error) {
      return new Response(error, { status: 500 });
    }
    return new Response();
  },
};

export default function Page(props: PageProps) {
  const inputType = props.route.split("/")[1];
  const outputType = props.params.outputType;
  const title = `${inputType} to ${outputType}`.split(" ").map((
    w,
  ) =>
    w.split("").map((letter, i) => i == 0 ? letter.toUpperCase() : letter).join(
      "",
    )
  ).join(" ");

  return (
    <ConvertionPage
      title={title}
      inputType={inputType}
      outputType={outputType}
      {...props}
    />
  );
}
