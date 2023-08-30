import { ComponentChildren } from "preact";
import NavBar from "../islands/Navbar.tsx";
import { PageProps, RouteConfig } from "$fresh/server.ts";
import { asset, Head, useCSP } from "$fresh/runtime.ts";
import ConversionButtonsSection from "../components/ConversionButtonsSection.tsx";
import supportedFormatTypes from "../utils/supportedFormatTypes.ts";
export type PropsWithChildren<T> = { children: ComponentChildren } & T;
export type PropsWithOptionalChildren<T> = { children?: ComponentChildren } & T;

export default function Home({ route }: PageProps) {
  useCSP((csp) => {
    if (!csp.directives.styleSrc) {
      csp.directives.styleSrc = [];
    }
    csp.directives.styleSrc.push("http://localhost:8000/style.css");
    csp.directives.fontSrc = [
      "http://localhost:8000/fonts/",
      "http://localhost:8000/icon/",
    ];
    csp.directives.scriptSrc = ["http://localhost:8000/_frsh/js/"];
  });

  return (
    <>
      <Head>
        <title>Home | Convert And Minify</title>
        <link rel="stylesheet" href={asset("style.css")} />
        <link rel="preconnect" href="https://testfonts.com" />
        <link rel="preconnect" href="https://testfonts.com/fonts/" />
      </Head>
      <NavBar route={route} />
      <div class="relative w-full z-20">
        <h1 class="text-slate-900 font-extrabold font-pacifico text-4xl sm:text-4xl lg:text-5xl tracking-widest z-10 text-center xl:text-left relative px-5 pt-12 xl:pl-40">
          Convert files
        </h1>
        <div class="font-secondary text-2xl text-center sm:absolute -bottom-7 left-1/2 xl:left-48 text-gray-400 select-none -z-10">
          Up to 10 mb
        </div>
      </div>

      <div class="flex items-center justify-center pb-0 pt-0 sm:pt-6 lg:pt-8">
        <div class="h-full w-full grid grid-cols-1 sm:gap-y-6 sm:grid-cols-2 lg:grid-cols-4 container">
          <ConversionButtonsSection
            title="JSON"
            outputs={supportedFormatTypes.json}
          />
          <ConversionButtonsSection
            title="YAML"
            outputs={supportedFormatTypes.yaml}
          />
          <ConversionButtonsSection
            title="CSV"
            outputs={supportedFormatTypes.csv}
          />
          <ConversionButtonsSection
            title="XML"
            outputs={supportedFormatTypes.xml}
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

export const config: RouteConfig = {
  csp: true,
};
