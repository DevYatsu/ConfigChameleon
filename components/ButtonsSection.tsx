import { tw } from "twind";
import { PropsWithChildren } from "../routes/index.tsx";

type ButtonsSection = PropsWithChildren<{
  title: string;
  cls?: string;
}>;

export default function ButtonsSection(
  { title, children, cls }: ButtonsSection,
) {
  return (
    <div
      class={tw`w-full flex justify-center px-16 pt-8 pb-12 ${
        cls ? cls : ""
      } lg:hover:bg-indigo-300 rounded transition`}
    >
      <div class="flex flex-col w-60">
        <h2 class="text(5xl red-500 lg:6xl) tracking-wide font-extrabold bg(clip-text gradient-to-r) to-emerald-600 from-sky-400 pb-5 relative -top-3 -left-8 relative">
          {title}
          <span class="text(indigo-500 4xl lg:5xl) tracking-smallest font-extrabold absolute z-50 lg:top-10 top-6 left-5">
            To
          </span>
        </h2>
        <div class="flex items-center justify-center flex-col gap-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
