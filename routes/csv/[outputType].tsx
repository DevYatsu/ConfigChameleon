import { defineRoute, Handlers, RouteConfig } from "$fresh/server.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { generateFile } from "../../utils/file.ts";
import { JsonToToml, JsonToXml, JsonToYaml } from "../../utils/json.ts";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import { supportedFormatTypes } from "../../utils/supportedFormatTypes.ts";
import JsonCSV from "npm:papaparse@5.0.2";

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
      const csvContent = textDecoder.decode(uint8Array);

      try {
        const jsonObj = JsonCSV.parse(csvContent);

        switch (outputType) {
          case "json": {
            const file = generateFile(
              JSON.stringify(jsonObj),
              "application/json",
            );
            return new Response(file);
          }
          case "toml": {
            try {
              const htmlContent = JsonToToml(jsonObj);
              const file = generateFile(
                JSON.stringify(htmlContent),
                "application/toml",
              );
              return new Response(file);
            } catch (error) {
              return new Response(
                "Yaml to TOML conversion requires specific yaml file content!",
                { status: 400 },
              );
            }
          }
          case "xml": {
            const xmlContent = JsonToXml(jsonObj);
            const file: File = generateFile(
              xmlContent,
              "application/xml",
            );
            return new Response(file);
          }

          case "yaml": {
            const yamlContent = JsonToYaml(jsonObj);
            const file: File = generateFile(
              yamlContent,
              "application/yaml",
            );
            return new Response(file);
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

export const config: RouteConfig = {
  csp: true,
};
