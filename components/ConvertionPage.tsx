import { asset, Head } from "$fresh/runtime.ts";
import FileInput from "../islands/FileInput.tsx";
import { titleCase } from "case";
import TitleSection from "./TitleSection.tsx";

type ConvertionPageProps = {
  title: string;
  inputType: string;
  outputType: string;
  subtitle?: string;
};

export default function ConvertionPage(
  { title, inputType, outputType, subtitle }: ConvertionPageProps,
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
      <main class="h-full text-black dark:text-white text-center flex flex-col items-center justify-center flex-1">
        <div className="flex justify-center text-center xl:pr-24">
          <TitleSection title={titleCase(title)} subtitle={subtitle} />
        </div>
        <div class="pt-12 md:pt-28">
          <FileInput filetype={inputType} outputType={outputType} />
        </div>
      </main>
    </>
  );
}
