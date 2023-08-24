import { PageProps } from "$fresh/server.ts";
import FileInput from "./FileInput.tsx";

type ConvertionPageProps = {
  title: string;
  inputType: string;
} & PageProps;

export default function ConvertionPage(
  { title, inputType }: ConvertionPageProps,
) {
  return (
    <div class="h-full text-white container text-center py-8 px-3">
      <h2 class="font-bold text-3xl tracking-tight sm:text-4xl">
        {title}
      </h2>
      <FileInput filetype={inputType} />
    </div>
  );
}
