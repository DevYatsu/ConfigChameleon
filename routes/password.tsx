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

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(generateComplexPassword());
  },
};

export default function PasswordPage({ data }: PageProps) {
  return (
    <div class="container h-full min-h-screen flex flex-col sm:flex-row justify-center items-center py-12 px-5">
      <h1 class="px-5 text-2xl text-red-500 md:text-3xl">
        Random Password:
      </h1>
      <p class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
        {data}
      </p>
    </div>
  );
}
