import { AppProps, RouteConfig } from "$fresh/server.ts";
import { asset, useCSP } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  useCSP((csp) => {
    if (!csp.directives.imgSrc) {
      csp.directives.imgSrc = [];
    }
    if (!csp.directives.fontSrc) {
      csp.directives.fontSrc = [];
    }
    if (!csp.directives.manifestSrc) {
      csp.directives.manifestSrc = [];
    }
    if (!csp.directives.scriptSrc) {
      csp.directives.scriptSrc = [];
    }
    csp.directives.imgSrc.push("http://localhost:8000/images/");
    csp.directives.fontSrc.push("https://fonts.gstatic.com/");
    csp.directives.manifestSrc.push("http://localhost:8000/manifest.json");
    csp.directives.scriptSrc.push(
      "http://localhost:8000/service-worker.js",
    );
  });

  return (
    <html lang="en-EN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3730A3" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="preconnect"
          href={asset("http://localhost:8000/")}
          crossOrigin="anonymous"
        />
        <link
          rel="icon"
          href={asset("http://localhost:8000/images/favicon.ico")}
          type="image/x-icon"
        />
        <link rel="preconnect" href={asset("https://fonts.gstatic.com/")} />
        <link rel="preconnect" href={asset("http://localhost:8000/fonts/")} />
        <link rel="preconnect" href={asset("http://localhost:8000/css/")} />

        <script
          defer
          src={asset("http://localhost:8000/service-worker.js")}
        />

        <meta http-equiv="Content-Security-Policy" content="base-uri 'self'" />
      </head>
      <body class="h-full min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white ">
        <Component />
      </body>
    </html>
  );
}

export const config: RouteConfig = {
  csp: true,
};
