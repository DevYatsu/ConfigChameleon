import { defineRoute, Handlers, RouteConfig } from "$fresh/server.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import { parse as parseYaml } from "npm:yaml";
import { generateFile } from "../../utils/file.ts";
import { JsonToCSV, JsonToToml, JsonToXml } from "../../utils/json.ts";
import { supportedFormatTypes } from "../../utils/supportedFormatTypes.ts";

const fileType = "yaml";

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
      const yamlContent = textDecoder.decode(uint8Array);

      try {
        const jsonObj = parseYaml(yamlContent);

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
                "Yaml to Csv conversion requires specific json file content!",
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
