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
  const [isHidden, setIsHidden] = useState(false);

  function onClick() {
    setIsHidden((old) => !old);
  }

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth > 640) {
        setIsHidden(false);
      } 
    };

    globalThis.addEventListener("resize", handleResize);

    return () => {
      globalThis.removeEventListener("resize", handleResize);
    };
  }, []);

  const arr = isHidden ? [navLinks[0]] : navLinks;

  return (
    <nav
      class={tw`w-full min-h-12 text-white bg-indigo-900 flex sm:justify-center ${
        cls ? cls : ""
      }`}
    >
      <ul class="sm:space-x-8 space-y-2 sm:space-y-0 py-3 sm:py-5 px-7 relative w-full sm:flex justify-center">
        {arr.map((el) => {
          if (route != el.link) {
            return (
              <li class="sm:inline">
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
              <li class="sm:inline">
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
        <div
          class={`sm:hidden absolute right-4 ${isHidden ? "top-0" : "top-2"}`}
        >
          <NavButton onClick={onClick} isHidden={isHidden} />
        </div>
      </ul>
    </nav>
  );
}
