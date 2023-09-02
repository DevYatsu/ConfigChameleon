import { RouteConfig, RouteContext } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import TitleSection from "../../components/TitleSection.tsx";
import JsonViewer from "../../components/JsonViewer.tsx";
import RefreshButton from "../../islands/RefreshButton.tsx";

export async function fetchRandomTodo() {
  try {
    const randomNum = Math.floor(Math.random() * 200);
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${randomNum}`,
    );

    if (!resp.ok) {
      return {
        error: "Failed to retrieve data!",
        userMessage: "Something went wrong! Try again!",
        ok: false,
        status: 300,
      };
    }
    const data = await resp.json() as object;

    return data;
  } catch (error) {
    console.log(error);
    return {
      userMessage: "Something went wrong! Try again!",
      error: "Failed to retrieve data!",
      ok: false,
      status: 300,
    };
  }
}

export default async function Page(_req: Request, _ctx: RouteContext) {
  const data = await fetchRandomTodo();

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
        <div class="w-full h-full flex flex-col items-center justify-center pt-6 sm:pt-12 pb-10 px-4">
          <JsonViewer data={data} />
          <div className="pt-8">
            <RefreshButton />
          </div>
        </div>
      </main>
    </>
  );
}

export const config: RouteConfig = {
  csp: true,
};
