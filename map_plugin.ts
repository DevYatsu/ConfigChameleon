export default async function initImportMap() {
  const content = await Deno.readTextFile("deno.json");

  const json = JSON.parse(content);

  if (!(json instanceof Object) || (json instanceof Array)) {
    throw new Error("Invalid 'deno.json' format.");
  }

  const imports = json.imports;

  if (!imports) {
    throw new Error("Missing imports object in 'deno.json'.");
  }
  if (!(imports instanceof Object) || (imports instanceof Array)) {
    throw new Error("Invalid imports format in 'deno.json'. Must be an object");
  }

  await Deno.writeTextFile("import_map.json", JSON.stringify({ imports }));
}
