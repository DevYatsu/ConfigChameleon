import { tw } from "twind";
const navLinks = [
  { link: "/", name: "Home" },
  { link: "/password", name: "Random Passwords" },
  { link: "/json", name: "Random Json" },
  { link: "https://github.com/DevYatsu", name: "My Github", target: "_blank" },
];

export default function NavBar(
  { route, cls }: { route: string; cls?: string },
) {
  return (
    <nav
      class={tw`w-full text-white bg-gray-900 h-24 flex justify-center ${cls}`}
    >
      <ul class="space-x-8 py-7">
        {navLinks.map((el) => {
          if (route != el.link) {
            return (
              <li class="inline">
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
              <li class="inline">
                <a
                  href={el.link}
                  target={el.target ? el.target : ""}
                  aria-current="page"
                  class="text-blue-500"
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
