import Button from "../components/FormatButton.tsx";
import { ComponentChildren } from "preact";
import ButtonsSection from "../components/ButtonsSection.tsx";
import NavBar from "../islands/Navbar.tsx";
import { PageProps } from "$fresh/server.ts";
export type PropsWithChildren<T> = { children: ComponentChildren } & T;

export default function Home({ route }: PageProps) {
  return (
    <>
      <NavBar route={route} />
      <h1 class="text-slate-900 font-extrabold text-4xl sm:text-4xl lg:text-5xl tracking-widest text-center xl:text-left px-5 pt-12 xl:pl-40">
        Convert files
      </h1>
      <div class="flex items-center justify-center pb-0 pt-0 sm:pt-6 lg:pt-8">
        <div class="h-full w-full grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 container">
          <ButtonsSection title="CSV">
            <Button href="/csv/json" variant="JSON" />
            <Button href="/csv/excel" variant="XLSX" />
            <Button href="/csv/xml" variant="XML" />
            <Button href="/csv/html" variant="HTML" />
          </ButtonsSection>
          <ButtonsSection title="JSON">
            <Button href="/json/yaml" variant="YAML" />
            <Button href="/json/xml" variant="XML" />
            <Button href="/json/jsonl" variant="JSONL" />
            <Button href="/json/csv" variant="CSV" />
          </ButtonsSection>
          <ButtonsSection title="YAML">
            <Button href="/yaml/csv" variant="CSV" />
            <Button href="/yaml/json" variant="YAML" />
            <Button href="/yaml/xml" variant="XML" />
            <Button href="/yaml/html" variant="HTML" />
          </ButtonsSection>
          <ButtonsSection title="XML">
            <Button href="/json/csv" text="Csv" variant="CSV" />
            <Button href="/json/yaml" variant="YAML" />
            <Button href="/json/json" variant="JSON" />
            <Button href="/json/html" variant="HTML" />
          </ButtonsSection>
        </div>
      </div>
      <h1 class="text-slate-900 font-extrabold text-4xl sm:text-4xl lg:text-5xl tracking-widest text-center xl:text-left px-5 pt-8 xl:pl-40 pb-5">
        Minify files
      </h1>
      <div class="text-red-500 font-extrabold text-left pl-48 text-xl">
        coming soon !
      </div>
    </>
  );
}
