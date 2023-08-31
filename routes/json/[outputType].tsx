import {
  defineRoute,
  Handlers,
} from "$fresh/server.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { generateFile } from "../../utils/file.ts";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import {
  JsonToCSV,
  JsonToJSONL,
  JsonToXml,
  JsonToYaml,
} from "../../utils/json.ts";
import { supportedFormatTypes } from "../../utils/supportedFormatTypes.ts";

const fileType = "json";

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
      const jsonObj = JSON.parse(jsonContent);

      if (typeof jsonObj !== "object") {
        return new Response("Invalid json format", { status: 422 });
      }

      switch (outputType) {
        case "xml": {
          const xmlContent = JsonToXml(jsonObj);
          const file: File = generateFile(
            xmlContent,
            "application/xml",
          );
          return new Response(file);
        }
        case "yaml": {
          const yamlContent = JsonToYaml(jsonContent);
          const file: File = generateFile(
            yamlContent,
            "application/yaml",
          );
          return new Response(file);
        }
        case "csv": {
          if (jsonObj instanceof Array) {
            const csvContent = JsonToCSV(jsonObj);
            const file: File = generateFile(
              csvContent,
              "application/csv",
            );
            return new Response(file);
          } else {
            return new Response(
              "Json to Csv conversion requires specific json file content!",
              { status: 400 },
            );
          }
        }

        case "jsonl": {
          const jsonlContent = JsonToJSONL(jsonObj);
          const file: File = generateFile(
            jsonlContent,
            "application/jsonl",
          );
          return new Response(file);
        }
        default:
          return new Response(`Output type ${outputType} not supported`, {
            status: 400,
          });
      }
    } catch (error) {
      return new Response(error, { status: 500 });
    }
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
