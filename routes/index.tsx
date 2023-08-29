import Button from "../components/FormatButton.tsx";
import { ComponentChildren } from "preact";
import NavBar from "../islands/Navbar.tsx";
import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import ConversionButtonsSection from "../components/ConversionButtonsSection.tsx";
export type PropsWithChildren<T> = { children: ComponentChildren } & T;
export type PropsWithOptionalChildren<T> = { children?: ComponentChildren } & T;

export default function Home({ route }: PageProps) {
  return (
    <>
      <Head>
        <title>Home | Convert And Minify</title>
        <link rel="stylesheet" href="style.css" />
      </Head>
      <NavBar route={route} />
      <div class="relative w-full z-20">
        <h1 class="text-slate-900 font-extrabold font-pacifico text-4xl sm:text-4xl lg:text-5xl tracking-widest z-10 text-center xl:text-left relative px-5 pt-12 xl:pl-40">
          Convert files
        </h1>
        <div class="font-tilt-prism text-2xl text-center sm:absolute -bottom-7 left-1/2 xl:left-48 text-gray-400 select-none -z-10">
          Up to 10 mb
        </div>
      </div>

      <div class="flex items-center justify-center pb-0 pt-0 sm:pt-6 lg:pt-8">
        <div class="h-full w-full grid grid-cols-1 sm:gap-y-6 sm:grid-cols-2 lg:grid-cols-4 container">
          <ConversionButtonsSection
            title="JSON"
            outputs={["YAML", "XML", "JSONL", "CSV"]}
          />
          <ConversionButtonsSection
            title="YAML"
            outputs={["JSON", "XML", "TOML", "CSV"]}
          />
          <ConversionButtonsSection
            title="CSV"
            outputs={["JSON", "XLSX", "XML", "HTML"]}
          />
          <ConversionButtonsSection
            title="XML"
            outputs={["CSV", "YAML", "JSON", "HTML"]}
          />
        </div>
      </div>
      <h1 class="text-slate-900 font-extrabold font-pacifico text-4xl sm:text-4xl lg:text-5xl tracking-widest text-center xl:text-left px-5 pt-8 xl:pl-40 pb-5">
        Minify files
      </h1>
      <div class="text-red-500 font-extrabold text-center xl:text-left xl:pl-48 text-xl">
        coming soon !
      </div>
    </>
  );
}
