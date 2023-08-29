import { twMerge } from "npm:tailwind-merge";

type NavLinkProps = {
  link: string;
  target?: string;
  name: string;
  currentPage?: boolean;
  cls?: string;
};

export default function NavLink(
  { link, target, name, currentPage, cls }: NavLinkProps,
) {
  return (
    <>
      {currentPage
        ? (
          <li class={twMerge("sm:inline", `${cls}`)}>
            <a
              href={link}
              target={target ? target : ""}
              aria-current="page"
              class="text-indigo-400"
            >
              {name}
            </a>
          </li>
        )
        : (
          <li class={twMerge("sm:inline", `${cls}`)}>
            <a
              href={link}
              target={target ? target : ""}
              class=" hover:text-indigo-700 dark:hover:text-indigo-200 transition duration-300"
            >
              {name}
            </a>
          </li>
        )}
    </>
  );
}
