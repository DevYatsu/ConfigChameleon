import { RouteConfig } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import ConversionButtonsSection from "../components/ConversionButtonsSection.tsx";
import { supportedFormatTypes } from "../utils/supportedFormatTypes.ts";
import TitleSection from "../components/TitleSection.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>ConfigChameleon: Effortless File Format Conversions</title>
        <meta
          property="og:title"
          content="ConfigChameleon: Effortless File Format Conversions"
        />
        <meta
          name="description"
          content="ConfigChameleon | Transforming Formats, Simplifying Workflows and minify your workload."
        />
        <meta
          property="og:description"
          content="ConfigChameleon | Transforming Formats, Simplifying Workflows and minify your workload."
        />
      </Head>
      <TitleSection
        title="Convert files"
        subtitle="Up to 10 mb"
      />
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
      <TitleSection title="Minify files" />
      <div class="text-red-500 font-extrabold text-center xl:text-left xl:pl-48 text-xl">
        coming soon !
      </div>
    </>
  );
}

export const config: RouteConfig = {
  csp: true,
};
