import { Handlers, PageProps } from "$fresh/server.ts";
import { stringify } from "$std/yaml/mod.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { getNameWithoutExtension } from "../../utils/file.ts";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import { yamlFile } from "../../utils/yaml.ts";

export const handler: Handlers<File> = {
  async POST(req, ctx) {
    const fileType = "json";
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

      const fileName = getNameWithoutExtension(file);

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const textDecoder = new TextDecoder("utf-8");
      const jsonContent = textDecoder.decode(uint8Array);
      const contentObj = JSON.parse(jsonContent);

      switch (outputType) {
        case "xml":
          break;
        case "yaml": {
          const yamlContent = stringify(contentObj);
          const file: File = yamlFile(
            `${fileName}.yaml`,
            yamlContent,
          );
          console.log(file);
          return new Response(file);
        }
        case "csv":
          break;
        default:
          return new Response("Output type ${outputType} not supported", {
            status: 400,
          });
      }

      return new Response(null);
    } catch (error) {
      return new Response(error, { status: 500 });
    }
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
