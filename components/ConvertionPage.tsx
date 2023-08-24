import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import FileInput from "./FileInput.tsx";

type ConvertionPageProps = {
  title: string;
  inputType: string;
} & PageProps;

export default function ConvertionPage(
  { title, inputType }: ConvertionPageProps,
) {
  return (
    <>
      <Head>
        <title>
          {title}
        </title>
        <link rel="stylesheet" href="/input.css" />
        <meta
          name="description"
          content={`A simple way to convert ${title.toLowerCase()}.`}
        />
      </Head>
      <div class="h-full min-h-screen text-white container text-center py-8 px-3 flex flex-col items-center justify-center">
        <h2 class="font-bold text-3xl tracking-tight sm:text-4xl">
          {title}
        </h2>
        <div class="pt-12 md:pt-28">
          <FileInput filetype={inputType} />
        </div>
      </div>
    </>
  );
}
