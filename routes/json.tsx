import { PageProps, RouteConfig } from "$fresh/server.ts";
import NavBar from "../islands/Navbar.tsx";
import { asset, Head, useCSP } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import TitleSection from "../components/TitleSection.tsx";
import JsonViewerAsyncWrapper from "../islands/JsonViewerAsyncWrapper.tsx";

export const handler: Handlers<[] | object> = {
  async GET(_req, ctx) {
    try {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${
          Math.floor(Math.random() * 100)
        }`,
      )
        .then((response) => response.json());

      if (!data) {
        return new Response("Could not retrieve json data.", { status: 404 });
      }
      return ctx.render(data);
    } catch (error) {
      return ctx.render({
        error: [[[[[[[[[[[["Failed to fetch data"]]]]]]]]]]]],
      });
    }
  },
};

export default function ({ data }: PageProps) {
  useCSP((csp) => {
    if (!csp.directives.styleSrc) csp.directives.styleSrc = [];

    csp.directives.styleSrc.push("https://fonts.googleapis.com/");
  });

  const todoId = Math.floor(Math.random() * 99);

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
      <div class="h-full min-h-screen flex flex-col">
        <NavBar />
        <main class="h-full flex-1 flex flex-col">
          <TitleSection
            title="Generate random json"
            subtitle="Reload to try it!"
          />
          <div class="w-full h-full flex items-center justify-center pt-12 pb-10">
            <JsonViewerAsyncWrapper
              cacheKeyword={["todo", String(todoId)]}
              queryFn={async () => {
                return await fetch(
                  `https://jsonplaceholder.typicode.com/todos/${todoId}`,
                ).then((res) => res.json());
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export const config: RouteConfig = {
  csp: true,
};
