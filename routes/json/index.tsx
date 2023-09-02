import { RouteConfig, RouteContext } from "$fresh/server.ts";
import { asset, Head, useCSP } from "$fresh/runtime.ts";
import TitleSection from "../../components/TitleSection.tsx";
import JsonViewer from "../../components/JsonViewer.tsx";
import RefreshButton from "../../components/RefreshButton.tsx";
import { signal } from "@preact/signals";

const data = signal<object | null>(null);

export default async function (_req: Request, ctx: RouteContext) {
  async function fetchRandomTodo() {
    try {
      const randomNum = Math.floor(Math.random() * 100);
      const resp = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${randomNum}`,
      );

      if (!resp.ok) {
        return {
          message: "Something went wrong!",
        };
      }
      const data = await resp.json() as object;

      return data;
    } catch (error) {
      return {
        message: "Something went wrong!",
      };
    }
  }

  data.value = await fetchRandomTodo();

  return (
    <>
      <Head>
        <title>Generate Random Json</title>
        <meta
          property="og:title"
          content="Generate Random Json"
        />
        <meta
          name="description"
          content="Generate random json data on reload!"
        />
        <meta
          property="og:description"
          content="Generate random json data on reload!"
        />
        <link
          rel="stylesheet"
          href={asset(
            "https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap",
          )}
        />
        <link
          rel="stylesheet"
          href={asset(
            "https://fonts.googleapis.com/css2?family=Sedgwick+Ave+Display:wght@400&display=swap",
          )}
        />
      </Head>
      <main class="h-full flex-1 flex flex-col">
        <TitleSection
          title="Generate random json"
          subtitle="Reload to try it!"
        />
        <div class="w-full h-full flex flex-col items-center justify-center sm:pt-12 pb-10 px-4">
          <JsonViewer
            data={data.value}
          />
          <div className="pt-8">
            <RefreshButton
              onClick={async () => {
                console.log("click");
              }}
              data={data.value}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export const config: RouteConfig = {
  csp: true,
};
