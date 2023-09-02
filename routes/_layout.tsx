import { LayoutProps } from "$fresh/server.ts";
import NavBar from "../islands/Navbar.tsx";

export default function Layout({ Component, state, url }: LayoutProps) {
  return (
    <div class="h-full min-h-screen flex flex-col">
      <NavBar route={url.pathname} />
      <Component />
    </div>
  );
}
