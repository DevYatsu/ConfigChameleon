function generateComplexPassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const allChars = chars + numbers;

  function getRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    return allChars.charAt(randomIndex);
  }

  let password = "";

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const randomChar = getRandomCharacter();
      password += randomChar;
    }
    if (i !== 3) {
      password += "-";
    }
  }

  return password;
}

import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import NavBar from "../islands/Navbar.tsx";

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
          <div class="h-2/5 flex flex-col sm:flex-row px-5 space-x-4 pb-12">
            <h1 class="text-2xl text-red-500 md:text-3xl">
              Generate Random Password:
            </h1>
            <p class="text-2xl font-bold leading-7 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight ">
              {data}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
