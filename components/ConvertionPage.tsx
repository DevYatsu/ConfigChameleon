import { Head } from "$fresh/runtime.ts";
import FileInput from "../islands/FileInput.tsx";
import NavBar from "../islands/Navbar.tsx";
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
          name="description"
          content={`A simple way to convert ${title.toLowerCase()}.`}
        />
      </Head>
      <NavBar cls="absolute top-0" />
      <div class="h-full min-h-screen text-black dark:text-white text-center py-8 px-3 flex flex-col items-center justify-center">
        <h2 class="font-bold text-3xl tracking-tight sm:text-4xl">
          {titleCase(title)}
        </h2>
        <div class="pt-12 md:pt-28">
          <FileInput filetype={inputType} outputType={outputType} />
        </div>
      </div>
    </>
  );
}
