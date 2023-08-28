import { js2xml } from "js2xml";
import { stringify as stringifyYaml } from "npm:yaml";
import JsonCSV from "npm:papaparse@5.0.2";
import { JsonDBO, jsonToHTML } from "npm:markuptojson";

export function JsonToXml(obj: Record<string, unknown>): string {
  return js2xml(obj, {
    compact: true,
    spaces: 4,
  });
}
export function JsonToYaml(obj: Record<string, unknown>): string {
  return stringifyYaml(obj);
}
export function JsonToHTML(
  obj: Record<string, unknown> | Record<string, unknown>[],
): string {
  return jsonToHTML(obj as unknown as JsonDBO[]);
}
export function JsonToCSV(obj: Record<string, unknown>[]): string {
  return JsonCSV.unparse(obj);
}
export function JsonToJSONL(obj: Record<string, unknown>): string {
  let jsonlContent = "";

  if (obj instanceof Array) {
    jsonlContent = obj.map((o) => JSON.stringify(o) + "\n")
      .join("");
  } else {
    jsonlContent = JSON.stringify(obj) + "\n";
  }

  return jsonlContent;
}
