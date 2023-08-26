import { AppProps } from "$fresh/server.ts";
import NavBar from "../islands/Navbar.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <main class="h-full min-h-screen bg-indigo-300 dark:bg-gray-900 text-white ">
          <Component />
        </main>
      </body>
    </html>
  );
}
