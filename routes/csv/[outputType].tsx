import { defineRoute, Handlers, RouteConfig } from "$fresh/server.ts";
import { asset, Head } from "$modules/fresh@1.4.2/runtime.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import TitleSection from "../../components/TitleSection.tsx";
import NavBar from "../../islands/Navbar.tsx";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";
import { supportedFormatTypes } from "../../utils/supportedFormatTypes.ts";

const fileType = "csv";
export const handler: Handlers<File> = {
  async POST(req, ctx) {
    const outputType: string = ctx.params.outputType;

    if (
      (supportedFormatTypes[fileType] as string[]).indexOf(
        outputType.toUpperCase(),
      ) === -1
    ) {
      return new Response(`Output type ${outputType} not supported`, {
        status: 400,
      });
    }

    const file = await retrieveRequestFile(req, fileType);

    if (!file) {
      return new Response("Internal Server Error", { status: 500 });
    }
    if (file instanceof Response) {
      return file;
    }
    // file is file
    return new Response(null);
  },
};

export default defineRoute(async (_req, ctx) => {
  const inputType = ctx.route.split("/")[1];
  const outputType = ctx.params.outputType;
  const title = `${inputType} to ${outputType}`;

  if (
    (supportedFormatTypes[fileType] as string[]).indexOf(
      outputType.toUpperCase(),
    ) === -1
  ) {
    return await ctx.renderNotFound();
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href={asset(
            "https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap",
          )}
        />
      </Head>
      <TitleSection title="Coming soon..."></TitleSection>
    </>
  );

  // return (
  //   <ConvertionPage
  //     title={title}
  //     inputType={inputType}
  //     outputType={outputType}
  //   />
  // );
});

export const config: RouteConfig = {
  csp: true,
};
