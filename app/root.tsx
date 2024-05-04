import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
  json,
} from "@remix-run/node";
// INTERNAL
import ApplicationHeader from "./containers/ApplicationHeader";
import PodcastOverview from "./containers/PodcastOverview";
// STYLES
import styles from "./tailwind.css?url";
import { getUserProfile } from "./graphql/queries.server";
import { registerUser } from "./graphql/mutations.server";
import { AuthResponse } from "./lib/types";
import { GraphQLClientResponse } from "../node_modules/graphql-request/build/esm/types";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());

  if (formData.requestType === "registration-request") {
    const { username, email, password } = formData;
    const { data, headers } = (await registerUser(
      username as string,
      email as string,
      password as string
    )) as GraphQLClientResponse<AuthResponse>;
    return json(
      { data: data.register },
      {
        headers: {
          "set-cookie": headers.get("set-cookie") || "",
        },
      }
    );
  }

  return json({
    success: false,
    message: "Request type handler does not exist",
  });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data } = await getUserProfile(request.headers);
  const res = data.getUserProfile;
  const profile = res.payload;
  return json({ profile });
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
      <body className="grid grid-cols-[400px_1fr] grid-rows-[60px_1fr] h-dvh w-dvw">
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
