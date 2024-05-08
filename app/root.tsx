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
import {
  GetUserProfileHandler,
  LogInUserHandler,
  LogOutUserProfile,
  RegisterUserHandler,
} from "./handlers/root.server";
import ApplicationHeader from "./containers/ApplicationHeader";
import PodcastOverview from "./containers/PodcastOverview";
// STYLES
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());

  switch (formData.requestType) {
    case "registration-request":
      return await RegisterUserHandler(formData);

    case "login-request":
      return await LogInUserHandler(formData);
    case "logout-request":
      return await LogOutUserProfile(request.headers);
    default:
      return json({
        success: false,
        message: "Request type handler does not exist",
      });
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await GetUserProfileHandler(request.headers);
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
