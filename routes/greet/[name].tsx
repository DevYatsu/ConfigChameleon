import { PageProps, RouteConfig } from "$fresh/server.ts";
import NavBar from "../../islands/Navbar.tsx";

export default function Greet(props: PageProps) {
  return (
    <div class="h-screen grid items-center dark:text-white">
      <NavBar cls="absolute top-0" />
      <span class="text(center 3xl)">
        Hello{" "}
        <span
          class={`text([${
            "#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, "0")
          }] 5xl) relative ${
            Math.floor(Math.random() * 101) > 50 ? "-" : ""
          }top-${Math.floor(Math.random() * 15)} left-${
            Math.floor(Math.random() * 20)
          }`}
        >
          {props.params.name}
        </span>
      </span>
    </div>
  );
}
export const config: RouteConfig = {
  csp: true,
};
