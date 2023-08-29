import { AppProps } from "$fresh/server.ts";
import NavBar from "../islands/Navbar.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body class="h-full min-h-screen bg-white dark:bg-gray-900 dark:text-white ">
        <Component />
      </body>
    </html>
  );
}
