import { PageProps, RouteConfig } from "$fresh/server.ts";
import NavBar from "../islands/Navbar.tsx";
import { asset, Head, useCSP } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import JsonViewer from "../components/JsonViewer.tsx";

type Todo = {
  "userId": number;
  "id": number;
  "title": string;
  "completed": boolean;
};

export const handler: Handlers<Todo> = {
  async GET(_req, ctx) {
    const data: Todo = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${
        Math.floor(Math.random() * 100)
      }`,
    )
      .then((response) => response.json());

    if (!data) {
      return new Response("Could not retrieve json data.", { status: 404 });
    }

    return ctx.render(data);
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
        <link
          rel="stylesheet"
          href={asset(
            "https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap",
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
          </div>

          <div class="w-full h-full flex items-center justify-center pt-10 pb-10 sm:pt-32">
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
