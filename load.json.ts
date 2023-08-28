const res = await fetch(
  "https://microsoftedge.github.io/Demos/json-dummy-data/5MB.json",
);

if (!res.ok) {
  throw new Error(await res.text());
}

res.body?.pipeTo(
  (await Deno.open("data.json", { create: true, write: true })).writable,
);
