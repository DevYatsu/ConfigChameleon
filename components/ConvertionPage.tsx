import { Head, useCSP } from "$fresh/runtime.ts";
import { RouteConfig } from "$modules/fresh@1.4.2/server.ts";
import FileInput from "../islands/FileInput.tsx";
import { titleCase } from "case";

type ConvertionPageProps = {
  title: string;
  inputType: string;
  outputType: string;
};

export default function ConvertionPage(
  { title, inputType, outputType }: ConvertionPageProps,
) {
  return (
    <>
      <Head>
        <title>
          {titleCase(title)}
        </title>
        <meta
          property="og:title"
          content={titleCase(title)}
        />
        <meta
          name="description"
          content={`A simple way to convert ${title.toLowerCase()}.`}
        />
        <meta
          property="og:description"
          content={`A simple way to convert ${title.toLowerCase()}.`}
        />
      </Head>
      <main class="h-full text-black dark:text-white text-center py-8 px-3 flex flex-col items-center justify-center flex-1">
        <h2 class="font-bold text-3xl tracking-tight sm:text-4xl">
          {titleCase(title)}
        </h2>
        <div class="pt-12 md:pt-28">
          <FileInput filetype={inputType} outputType={outputType} />
        </div>
      </main>
    </>
  );
}
