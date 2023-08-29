import { twMerge } from "npm:tailwind-merge";
import NavButton from "../components/NavButton.tsx";
import { useEffect, useState } from "preact/hooks";
import NavLink from "../components/NavLink.tsx";

const navLinks = [
  { link: "/", name: "Home" },
  { link: "/password", name: "Random Passwords" },
  { link: "/json", name: "Random Json" },
  { link: "https://github.com/DevYatsu", name: "My Github", target: "_blank" },
];

export default function NavBar(
  { route, cls }: { route?: string; cls?: string },
) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBigScreen, setIsBigScreen] = useState(
    window.innerWidth > 640,
  );

  function onClick() {
    setIsOpen((old) => !old);
  }

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 640) {
        setIsOpen(true);
        setIsBigScreen(true);
      } else {
        setIsBigScreen(false);
        setIsOpen(false);
      }
    };

    globalThis.addEventListener("resize", handleResize);

    return () => {
      globalThis.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      class={twMerge(
        "w-full min-h-12 text-white bg-indigo-900 flex sm:justify-center",
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
              cls={`pb-1 ${!isBigScreen && !isOpen ? "hidden" : ""}`}
              currentPage={route === el.link}
            />
          );
        })}
        {[navLinks[0]].map((el) => {
          return (
            <NavLink
              {...el}
              cls={`sm:hidden ${(!isBigScreen && isOpen) ? "hidden" : ""}`}
              currentPage={route === el.link}
            />
          );
        })}
        <div class="sm:hidden absolute right-4 top-2">
          <NavButton onClick={onClick} isOpen={isOpen} />
        </div>
      </ul>
    </nav>
  );
}
