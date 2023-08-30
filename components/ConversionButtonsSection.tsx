import { PropsWithOptionalChildren } from "../routes/index.tsx";
import FormatButton from "./FormatButton.tsx";
import { twMerge } from "npm:tailwind-merge";

export type FormatVariants =
  | "XML"
  | "JSON"
  | "YAML"
  | "JSONL"
  | "CSV"
  | "TOML"
  | "BEAUTIFIER"; // not a format but it's ok

type ButtonsSection = PropsWithOptionalChildren<{
  title: string;
  cls?: string;
  outputs?: FormatVariants[];
}>;

export default function ConversionButtonsSection(
  { title, children, cls, outputs }: ButtonsSection,
) {
  return (
    <div
      class={twMerge(
        "w-full flex justify-center px-16 pt-8 pb-12 lg:hover:(bg-gradient-to-b from-indigo-400 to-[#e5fcf5]) rounded transition",
        cls,
      )}
    >
      <div class="flex flex-col w-60">
        <h2 class="text(5xl red-500 lg:6xl) tracking-wide font-extrabold bg(clip-text gradient-to-r) to-emerald-600 from-sky-400 pb-5 -top-3 lg:-left-5 -left-8 xl:-left-8 relative">
          {title}
          <span class="text(indigo-500 4xl lg:5xl) tracking-smallest font-extrabold absolute z-50 lg:top-10 top-6 left-5">
            To
          </span>
        </h2>
        <div class="flex items-center justify-center flex-col gap-y-8">
          {outputs !== undefined
            ? outputs.map((v: FormatVariants) => (
              <FormatButton
                href={`/${title.toLocaleLowerCase()}/${v.toLowerCase()}`}
                variant={v}
              />
            ))
            : ""}
          {children}
        </div>
      </div>
    </div>
  );
}
