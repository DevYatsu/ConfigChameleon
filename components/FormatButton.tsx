import { FormatVariants } from "./ConversionButtonsSection.tsx";

export type FormatButton = {
  text?: string;
  variant: FormatVariants;
  href: string;
};

export default function FormatButton({ text, variant, href }: FormatButton) {
  const accentColor = variant == "JSON"
    ? "green-500"
    : variant == "TOML"
    ? "red-500"
    : variant == "XML"
    ? "blue-500"
    : variant == "JSONL"
    ? "indigo-500"
    : variant == "BEAUTIFIER"
    ? "yellow-500"
    : variant == "YAML"
    ? "gray-500"
    : "black";
  return (
    <button
      aria-label={`${variant.toLowerCase()}-conversion`}
      class="min-w-[200px] w-50 select-none relative inline-flex items-center justify-center px-18 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 dark:bg-slate-800 rounded-lg group"
    >
      <span
        class={`absolute w-0 h-0 transition-all duration-500 ease-out bg-${accentColor} rounded-full group-hover:w-56 group-hover:h-56`}
      >
      </span>
      <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700">
      </span>
      <a
        href={href}
        aria-label={`redirect to ${
          href.split("/")[0]
        } to ${variant.toLowerCase()} conversion page`}
        accessKey={href.toUpperCase()}
        class="w-full h-full relative overflow-hidden group"
      >
        <span class="relative text-lg">{text ? text : variant}</span>
      </a>
    </button>
  );
}
