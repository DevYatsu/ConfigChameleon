import { asset, Head } from "$modules/fresh@1.4.2/runtime.ts";

export default function TitleSection(
  { title, subtitle }: { title: string; subtitle?: string },
) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href={asset(
            "https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap",
          )}
        />
        <link
          rel="stylesheet"
          href={asset(
            "https://fonts.googleapis.com/css2?family=Sedgwick+Ave+Display:wght@400&display=swap",
          )}
        />
      </Head>
      <div class="relative w-full z-20 pb-5 flex flex-col">
        <h1 class="text-slate-900 dark:text-slate-50 font-extrabold font-pacifico text-4xl sm:text-4xl lg:text-5xl tracking-widest z-10 text-center xl:text-left relative px-5 pt-12 xl:pl-32">
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
    </>
  );
}
