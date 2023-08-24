import { PageProps } from "$fresh/server.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";

export default function Page(props: PageProps) {
  const inputType = props.route.split("/")[1];
  const title = `${inputType} to ${props.params.outputType}`.split(" ").map((
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
      {...props}
    />
  );
}
