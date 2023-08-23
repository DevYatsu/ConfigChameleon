import { PropsWithChildren } from "../routes/index.tsx";

type ButtonsSection = PropsWithChildren<{
  title: string;
}>;

export default function ButtonsSection({ title, children }: ButtonsSection) {
  return (
    <div className="w-full flex justify-center px-16 py-3">
      <div class="flex flex-col max-w-[290px]">
        <h2 class="text(5xl red-500 lg:6xl) tracking-wide font-extrabold bg(clip-text gradient-to-r) to-emerald-600 from-sky-400 pb-5 relative -top-3 -left-8 relative">
          {title}
          <span class="text(indigo-500 4xl lg:5xl) tracking-smallest font-extrabold absolute z-50 lg:top-10 top-6 left-5">
            To
            <span class="w-12 h-12 rounded-3xl bg-white white"></span>
          </span>
        </h2>
        <div class="flex items-center justify-center flex-col md:gap-y-5 gap-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
