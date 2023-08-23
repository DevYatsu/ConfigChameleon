import Button from "../components/FormatButton.tsx";
import { ComponentChildren } from "preact";
import ButtonsSection from "../components/ButtonsSection.tsx";
export type PropsWithChildren<T> = { children: ComponentChildren } & T;

export default function Home() {
  return (
    <main class="h-full min-h-screen bg-gray-900 text-white">
      <h1 class="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center px-5 py-12">
        Convert files with ease !
      </h1>
      <div class="flex items-center pb-4">
        <div class="h-full w-full grid lg:grid-cols-8 sm:grid-cols-2 grid-cols-1 gap-y-6 sm:gap-y-0">
          <ButtonsSection title="CSV">
            <Button href="/csv/json" variant="JSON" />
            <Button href="/csv/excel" variant="XLSX" />
            <Button href="/csv/xml" variant="XML" />
            <Button href="/csv/html" variant="HTML" />
          </ButtonsSection>
          <ButtonsSection title="JSON">
            <Button href="/json/csv" variant="CSV" />
            <Button href="/json/yaml" text="Yaml" variant="YAML" />
            <Button href="/json/xml" variant="XML" />
            <Button href="/json/jsonl" variant="JSONL" />
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
    </main>
  );
}
