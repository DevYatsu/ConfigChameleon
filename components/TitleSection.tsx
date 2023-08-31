export default function TitleSection(
  { title, subtitle }: { title: string; subtitle?: string },
) {
  return (
    <div class="relative w-full z-20 pb-5 flex flex-col">
      <h1 class="text-slate-900 dark:text-slate-50 font-extrabold font-pacifico text-4xl sm:text-4xl lg:text-5xl tracking-widest z-10 text-center xl:text-left relative px-5 pt-12 xl:pl-40">
        {title}
      </h1>
      {subtitle
        ? (
          <span class="font-secondary text-2xl text-center block sm:absolute -bottom-4 left-1/2 xl:left-48 text-gray-600  dark:text-gray-400 select-none -z-10">
            {subtitle}
          </span>
        )
        : ""}
    </div>
  );
}
