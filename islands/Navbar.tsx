import { twMerge } from "npm:tailwind-merge";
import NavButton from "../components/NavButton.tsx";
import { useEffect } from "preact/hooks";
import NavLink from "../components/NavLink.tsx";
import { signal } from "@preact/signals";
import { batch, computed, effect } from "@preact/signals-core";

const navLinks = [
  { link: "/", name: "Home" },
  { link: "/password", name: "Random Passwords" },
  { link: "/json", name: "Random Json" },
  { link: "https://github.com/DevYatsu", name: "My Github", target: "_blank" },
];

const isOpen = signal(false);
const windowWidth = signal(window.innerWidth);
const isBigScreen = computed(() => windowWidth.value > 640);

export default function NavBar(
  { route, cls }: { route?: string; cls?: string },
) {
  function onClick() {
    isOpen.value = !isOpen.value;
  }

  useEffect(() => {
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
    };

    globalThis.addEventListener("resize", handleResize);

    return () => {
      globalThis.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      class={twMerge(
        "w-full min-h-12 dark:text-white bg-[#e5fcf5] dark:bg-indigo-900 flex sm:justify-center",
        ` ${cls ? cls : ""}`,
      )}
    >
      <ul
        class={`sm:space-x-8 sm:space-y-0 py-3 sm:py-5 px-7 relative w-full sm:flex justify-center `}
      >
        {navLinks.map((el) => {
          return (
            <NavLink
              {...el}
              cls={`pb-1 ${
                !isBigScreen.value && !isOpen.value ? "hidden" : ""
              }`}
              currentPage={route === el.link}
            />
          );
        })}
        {[navLinks[0]].map((el) => {
          return (
            <NavLink
              {...el}
              cls={`sm:hidden ${
                (!isBigScreen.value && isOpen.value) ? "hidden" : ""
              }`}
              currentPage={route === el.link}
            />
          );
        })}
        <li class="sm:hidden absolute right-4 top-2">
          <NavButton onClick={onClick} isOpen={isOpen.value} />
        </li>
      </ul>
    </nav>
  );
}
