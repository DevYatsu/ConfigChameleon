import { Head } from "$fresh/runtime.ts";
import { RouteConfig } from "$modules/fresh@1.4.2/server.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
        <meta
          property="og:title"
          content="404 - Page not found"
        />
        <meta
          name="description"
          content="Oops! It looks like you've taken a wrong turn. The page you're looking for might have slipped into the shadows. Don't worry, our ConfigChameleon is always adapting – let's get you back on track!"
        />
        <meta
          property="og:description"
          content="Oops! It looks like you've taken a wrong turn. The page you're looking for might have slipped into the shadows. Don't worry, our ConfigChameleon is always adapting – let's get you back on track!"
        />
      </Head>
      <main class="h-screen w-full flex flex-col justify-center items-center bg-gray-900">
        <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div class="bg-red-500 px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button class="mt-5">
          <a
            href="/"
            class="relative inline-block text-sm font-medium text-red-500 group active:text-red-500 focus:outline-none focus:ring"
          >
            <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-red-500 group-hover:translate-y-0 group-hover:translate-x-0">
            </span>

            <span class="relative block px-8 py-3 bg-gray-900 border border-current">
              Go Home
            </span>
          </a>
        </button>
      </main>
    </>
  );
}

export const config: RouteConfig = {
  csp: true,
};
