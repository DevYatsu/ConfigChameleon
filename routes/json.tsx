import { PageProps, RouteConfig } from "$fresh/server.ts";
import NavBar from "../islands/Navbar.tsx";
import { asset, Head, useCSP } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import JsonViewer from "../components/JsonViewer.tsx";

export const handler: Handlers<[] | object> = {
  async GET(_req, ctx) {
    try {
      const data = await fetch(
        `https://random-data-api.com/api/v2/banks?size=1&response_type=json`,
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
    if (!csp.directives.scriptSrc) csp.directives.scriptSrc = [];
    if (!csp.directives.styleSrc) csp.directives.styleSrc = [];

    csp.directives.scriptSrc.push("http://localhost:8000/_frsh/js/");
    csp.directives.styleSrc.push("https://fonts.googleapis.com/");
  });

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
          <div class="relative w-full z-20 pb-5 flex flex-col">
            <h1 class="text-slate-900 dark:text-slate-50 font-extrabold font-pacifico text-4xl sm:text-4xl lg:text-5xl tracking-widest z-10 text-center xl:text-left relative px-5 pt-12 xl:pl-40">
              Generate random json
            </h1>
            <span class="font-secondary text-2xl text-center block sm:absolute -bottom-4 left-1/2 xl:left-48 text-gray-400 select-none -z-10">
              Reload to try it!
            </span>
          </div>

          <div class="w-full h-full flex items-center justify-center pt-12 pb-10">
            <JsonViewer data={data} />
          </div>
        </main>
      </div>
    </>
  );
}

export const config: RouteConfig = {
  csp: true,
};
