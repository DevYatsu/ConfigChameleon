import { RouteConfig } from "$modules/fresh@1.4.2/server.ts";
import NavBar from "../../islands/Navbar.tsx";

export default function Minify() {
  return (
    <>
      <NavBar></NavBar>
      <main class="pt-8">coming soon!</main>
    </>
  );
}


export const config: RouteConfig = {
  csp: true,
};
