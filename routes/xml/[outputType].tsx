import { defineRoute, Handlers } from "$fresh/server.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import { supportedFormatTypes } from "../../utils/supportedFormatTypes.ts";
import { xml2js } from "$modules/xml2js@1.0.0/mod.ts";
import { generateFile } from "../../utils/file.ts";
import { JsonToCSV, JsonToYaml } from "../../utils/json.ts";
import xmlButPrettier from "npm:xml-but-prettier";

const fileType = "xml";

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
      const xmlContent = textDecoder.decode(uint8Array);

      try {
        const jsonObj = xml2js(xmlContent, {
          compact: true,
        });

        switch (outputType) {
          case "json": {
            const file = generateFile(
              JSON.stringify(jsonObj),
              "application/json",
            );
            return new Response(file);
          }
          case "yaml": {
            const YamlContent = JsonToYaml(JSON.stringify(jsonObj));
            const file = generateFile(
              JSON.stringify(YamlContent),
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
                "Xml to Csv conversion requires specific json file content!",
                { status: 400 },
              );
            }
          }
          case "beautifier": {
            const newXmlContent = xmlButPrettier(xmlContent);
            const file: File = generateFile(
              newXmlContent,
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
