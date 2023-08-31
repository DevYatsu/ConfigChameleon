import { Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { Head, useCSP } from "$fresh/runtime.ts";
import NavBar from "../islands/Navbar.tsx";
import generateComplexPassword from "../utils/password.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(generateComplexPassword());
  },
};

export default function PasswordPage({ data, route }: PageProps) {
  return (
    <>
      <Head>
        <title>Passwords Generator</title>
        <meta
          property="og:title"
          content="Passwords Generator"
        />
        <meta
          name="description"
          content="A simple random passwords generator. Reload and a new password is generated."
        />
        <meta
          property="og:description"
          content="A simple random passwords generator. Reload and a new password is generated."
        />
      </Head>
      <div class="h-full min-h-screen flex flex-col">
        <NavBar route={route} />
        <main class="h-full w-full mt-6 sm:mt-0 px-5 flex-1 flex items-center justify-center">
          <div class="h-2/5 flex flex-col sm:flex-row px-5 space-y-6 sm:space-y-0 sm:space-x-4 pb-12">
            <h1 class="text-2xl text-red-500 md:text-3xl text-center">
              Generate Random Password:
            </h1>
            <p class="text-2xl text-center font-bold leading-7 dark:text-white sm:text-3xl sm:tracking-tight ">
              {data}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
export const config: RouteConfig = {
  csp: true,
};
