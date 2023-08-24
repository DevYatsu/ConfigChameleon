import { tw } from "twind";
const navLinks = [
  { link: "/", name: "Home" },
  { link: "/password", name: "Random Passwords" },
  { link: "/json", name: "Random Json" },
  { link: "https://github.com/DevYatsu", name: "My Github", target: "_blank" },
];

export default function NavBar(
  { route, cls }: { route?: string; cls?: string },
) {
  return (
    <nav
      class={tw`w-full text-white bg-indigo-900 flex sm:justify-center ${cls}`}
    >
      <ul class="sm:space-x-8 space-y-2 sm:space-y-0 py-3 sm:py-5 px-7">
        {navLinks.map((el) => {
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
      </ul>
    </nav>
  );
}
