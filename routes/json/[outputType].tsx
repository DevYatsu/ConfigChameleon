import { Handlers, PageProps } from "$fresh/server.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";
import { retrieveRequestFile } from "../../utils/retrieveRequestFile.ts";

export const handler: Handlers<File> = {
  async POST(req, _ctx) {
    const fileType = "json";
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

export default function Page(props: PageProps) {
  const inputType = props.route.split("/")[1];
  const outputType = props.params.outputType;
  const title = `${inputType} to ${outputType}`.split(" ").map((
    w,
  ) =>
    w.split("").map((letter, i) => i == 0 ? letter.toUpperCase() : letter).join(
      "",
    )
  ).join(" ");

  return (
    <ConvertionPage
      title={title}
      inputType={inputType}
      outputType={outputType}
      {...props}
    />
  );
}
