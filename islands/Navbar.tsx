import { tw } from "twind";
import NavButton from "../components/NavButton.tsx";
import { useEffect, useState } from "preact/hooks";

const navLinks = [
  { link: "/", name: "Home" },
  { link: "/password", name: "Random Passwords" },
  { link: "/json", name: "Random Json" },
  { link: "https://github.com/DevYatsu", name: "My Github", target: "_blank" },
];

export default function NavBar(
  { route, cls }: { route?: string; cls?: string },
) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 640 ? true : false);
  const [isBigScreen, setIsBigScreen] = useState(
    window.innerWidth > 640 ? true : false,
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
      class={tw`w-full min-h-12 text-white bg-indigo-900 flex sm:justify-center ${
        cls ? cls : ""
      }`}
    >
      <ul
        class={`sm:space-x-8 sm:space-y-0 py-3 sm:py-5 px-7 relative w-full sm:flex justify-center ${
          !isBigScreen && isOpen ? "space-y-2" : ""
        }`}
      >
        {navLinks.map((el) => {
          if (route != el.link) {
            return (
              <li class={`sm:inline ${isOpen ? "" : "hidden"}`}>
                <a
                  href={el.link}
                  target={el.target ? el.target : ""}
                >
                  {el.name}
                </a>
              </li>
            );
          } else {
            return (
              <li class={`sm:inline ${isOpen ? "" : "hidden"}`}>
                <a
                  href={el.link}
                  target={el.target ? el.target : ""}
                  aria-current="page"
                  class="text-blue-400"
                >
                  {el.name}
                </a>
              </li>
            );
          }
        })}
        {[navLinks[0]].map((el) => {
          const isPage = route != el.link;
          if (isPage) {
            return (
              <li class={`sm:hidden ${isOpen ? "hidden" : "block"}`}>
                <a
                  href={el.link}
                  target={el.target ? el.target : ""}
                >
                  {el.name}
                </a>
              </li>
            );
          } else {
            return (
              <li class={`sm:hidden ${isOpen ? "hidden" : "block"}`}>
                <a
                  href={el.link}
                  target={el.target ? el.target : ""}
                  aria-current="page"
                  class="text-blue-400"
                >
                  {el.name}
                </a>
              </li>
            );
          }
        })}
        <div class="sm:hidden absolute right-4 top-2">
          <NavButton onClick={onClick} isOpen={isOpen} />
        </div>
      </ul>
    </nav>
  );
}
