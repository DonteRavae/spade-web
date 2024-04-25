import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import styles from "./tailwind.css?url";
import UserAuthAccess from "./containers/UserAuthAcess";
import ApplicationHeader from "./containers/ApplicationHeader";
import PodcastOverview from "./containers/PodcastOverview";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="grid grid-cols-[450px_1fr] grid-rows-[60px_1fr] h-dvh w-dvw">
        <ApplicationHeader />
        <PodcastOverview />
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
