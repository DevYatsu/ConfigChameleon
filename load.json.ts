const bufferSize = 8192; // Adjust this based on your needs
let buffer = "[";
let counter = 0;

while (counter < 600000) {
  if (counter < 599999) {
    buffer += JSON.stringify({ test: "efefef ", two: 2000 }) + ",";
  } else {
    buffer += JSON.stringify({ test: "efefef ", two: 2000 }) + "]";
  }

  counter++;

  if (counter % bufferSize === 0 || counter === 600000) {
    Deno.writeFileSync("./data.json", new TextEncoder().encode(buffer), {
      create: true,
    });
  }
}
