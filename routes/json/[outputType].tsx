import { Handlers, PageProps } from "$fresh/server.ts";
import { stringify as stringifyYaml } from "npm:yaml";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { generateFile } from "../../utils/file.ts";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import JsonToCSV from "npm:papaparse@5.0.2";
import { js2xml } from "js2xml";

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
          const xmlContent = js2xml(jsonObj, {
            compact: true,
            spaces: 4,
          });
          const file: File = generateFile(
            xmlContent,
            "application/xml",
          );
          return new Response(file);
        }
        case "yaml": {
          const yamlContent = stringifyYaml(jsonObj);
          const file: File = generateFile(
            yamlContent,
            "application/yaml",
          );
          return new Response(file);
        }
        case "csv": {
          if (jsonObj instanceof Array) {
            const csvContent = JsonToCSV.unparse(jsonObj);
            console.log(csvContent);
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
          let jsonlContent = "";

          if (jsonObj instanceof Array) {
            jsonlContent = jsonObj.map((obj) => JSON.stringify(obj) + "\n")
              .join("");
          } else {
            jsonlContent = JSON.stringify(jsonObj) + "\n";
          }

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
