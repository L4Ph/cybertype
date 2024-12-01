import { Links, LinksFunction, LoaderFunction, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router'
import style from "./styles/globals.css?url";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: style },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "icon", type: "image/svg+xml", href: "/icons/icon.svg" },
    { rel: "apple-touch-icon", href: "/icons/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/favicon-32x32.png" },
  ];
};

export const meta: MetaFunction = () => {
  return [
  { title: "cybertype" },
  { property:"og:url", content:"https://cybertype.app" },
  { property:"og:type", content: "website"},
  { property:"og:title", content:"cybertype"},
  { property: "og:description", content:"Fast and Minimal Typing App - Improve your typing speed."},
  { property:"og:image", content:"https://cybertype.app/og.png"},
  { property:"twitter:card", content:"summary_large_image"},
  { property:"twitter:domain", content:"cybertype.app"},
  { property:"twitter:url", content:"https://cybertype.app"},
  { property: "twitter:title", content:"cybertype"},
  { property: "twitter:description", content: "Fast and Minimal Typing App - Improve your typing speed."},
  { property: "twitter:image", content:"https://cybertype.app/og.png"},
]
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

