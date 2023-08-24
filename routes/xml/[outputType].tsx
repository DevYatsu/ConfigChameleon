import { PageProps } from "$fresh/server.ts";
import ConvertionPage from "../../components/ConvertionPage.tsx";

export default function Page(props: PageProps) {
  const inputType = props.route.split("/")[1];
  return (
    <ConvertionPage
      title={`${inputType} to ${props.params.outputType}`}
      inputType={inputType}
      {...props}
    />
  );
}