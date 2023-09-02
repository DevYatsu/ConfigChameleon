import { AppProps, RouteConfig } from "$fresh/server.ts";
import { asset, useCSP } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  useCSP((csp) => {
    if (!csp.directives.imgSrc) csp.directives.imgSrc = [];
    if (!csp.directives.fontSrc) csp.directives.fontSrc = [];
    if (!csp.directives.manifestSrc) csp.directives.manifestSrc = [];
    if (!csp.directives.workerSrc) csp.directives.workerSrc = [];
    if (!csp.directives.scriptSrc) csp.directives.scriptSrc = [];
    if (!csp.directives.defaultSrc) csp.directives.defaultSrc = [];

    csp.directives.imgSrc.push("http://localhost:8000/images/");
    csp.directives.fontSrc.push("https://fonts.gstatic.com/");
    csp.directives.manifestSrc.push("http://localhost:8000/manifest.json");
    csp.directives.workerSrc.push(
      "http://localhost:8000/service-worker.js",
    );
    csp.directives.scriptSrc.push("http://localhost:8000/_frsh/refresh.js");
    csp.directives.scriptSrc.push("http://localhost:8000/_frsh/js/");
    csp.directives.scriptSrc.push(
      "http://localhost:8000/service-worker.js",
    );

    if (!csp.directives.styleSrc) csp.directives.styleSrc = [];
    csp.directives.styleSrc.push("https://fonts.googleapis.com/");
    csp.directives.styleSrc.push(
      "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css",
    );
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ConfigChameleon" />
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <meta http-equiv="Content-Security-Policy" content="base-uri 'self'" />

        <meta name="theme-color" content="#3730A3" />
        <link rel="manifest" href={asset("/manifest.json")} />
        <link rel="canonical" href="http://localhost:8000/" />
        <link rel="preconnect" href={asset("/")} />

        <link
          rel="preconnect"
          href={asset("/")}
          crossOrigin="anonymous"
        />

        <link rel="preconnect" href={asset("https://fonts.gstatic.com/")} />
        <script
          defer
          src={asset("/service-worker.js")}
        />
      </head>
      <body class="h-full min-h-screen w-full bg-white dark:bg-gray-900 text-black dark:text-white ">
        <Component />
      </body>
    </html>
  );
}

export const config: RouteConfig = {
  csp: true,
};
